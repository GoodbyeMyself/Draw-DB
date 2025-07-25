import { useMemo, useState } from "react";
import {
    Tab,
    ObjectType,
    tableFieldHeight,
    tableHeaderHeight,
    tableColorStripHeight,
} from "../../data/constants";
import {
    IconEdit,
    IconMore,
    IconMinus,
    IconDeleteStroked,
    IconKeyStroked,
    IconLock,
    IconUnlock,
} from "@douyinfe/semi-icons";
import { Popover, Tag, Button, SideSheet } from "@douyinfe/semi-ui";
import { useLayout, useSettings, useDiagram, useSelect } from "../../hooks";
import TableInfo from "../EditorSidePanel/TablesTab/TableInfo";
import { useTranslation } from "react-i18next";
import { dbToTypes } from "../../data/datatypes";
import { isRtl } from "../../i18n/utils/rtl";
import i18n from "../../i18n/i18n";
import { getTableHeight } from "../../utils/utils";

export default function Table(props) {
    const [hoveredField, setHoveredField] = useState(null);
    const { database } = useDiagram();
    const {
        tableData,
        onPointerDown,
        setHoveredTable,
        handleGripField,
        setLinkingLine,
    } = props;
    const { layout } = useLayout();
    const { deleteTable, deleteField, updateTable } = useDiagram();
    const { settings } = useSettings();
    const { t } = useTranslation();
    const {
        selectedElement,
        setSelectedElement,
        bulkSelectedElements,
        setBulkSelectedElements,
    } = useSelect();

    const borderColor = useMemo(
        () =>
            settings.mode === "light" ? "border-zinc-300" : "border-zinc-600",
        [settings.mode],
    );

    const height = getTableHeight(tableData);

    const isSelected = useMemo(() => {
        return (
            (selectedElement.id == tableData.id &&
                selectedElement.element === ObjectType.TABLE) ||
            bulkSelectedElements.some(
                (e) => e.type === ObjectType.TABLE && e.id === tableData.id,
            )
        );
    }, [selectedElement, tableData, bulkSelectedElements]);

    const lockUnlockTable = () => {
        setBulkSelectedElements((prev) =>
            prev.filter(
                (el) => el.id !== tableData.id || el.type !== ObjectType.TABLE,
            ),
        );
        updateTable(tableData.id, { locked: !tableData.locked });
    };

    const openEditor = () => {
        if (!layout.sidebar) {
            setSelectedElement((prev) => ({
                ...prev,
                element: ObjectType.TABLE,
                id: tableData.id,
                open: true,
            }));
        } else {
            setSelectedElement((prev) => ({
                ...prev,
                currentTab: Tab.TABLES,
                element: ObjectType.TABLE,
                id: tableData.id,
                open: true,
            }));
            if (selectedElement.currentTab !== Tab.TABLES) return;
            document
                .getElementById(`scroll_table_${tableData.id}`)
                .scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <foreignObject
                key={tableData.id}
                x={tableData.x}
                y={tableData.y}
                width={settings.tableWidth}
                height={height}
                className="group drop-shadow-lg rounded-md cursor-move"
                onPointerDown={onPointerDown}
                data-element-type="table"
            >
                <div
                    onDoubleClick={openEditor}
                    className={`border-2 hover:border-dashed hover:border-blue-500
               select-none rounded-lg w-full ${
                   settings.mode === "light"
                       ? "bg-zinc-100 text-zinc-800"
                       : "bg-zinc-800 text-zinc-200"
               } ${isSelected ? "border-solid border-blue-500" : borderColor}`}
                    style={{ direction: "ltr" }}
                >
                    <div
                        className="h-[10px] w-full rounded-t-md"
                        style={{ backgroundColor: tableData.color }}
                    />
                    <div
                        className={`overflow-hidden font-bold h-[40px] flex justify-between items-center border-b border-gray-400 ${
                            settings.mode === "light"
                                ? "bg-zinc-200"
                                : "bg-zinc-900"
                        }`}
                    >
                        <div className="px-3 overflow-hidden text-ellipsis whitespace-nowrap">
                            {tableData.name}
                        </div>
                        <div className="hidden group-hover:block">
                            <div className="flex justify-end items-center mx-2 space-x-1.5">
                                <Button
                                    icon={
                                        tableData.locked ? (
                                            <IconLock />
                                        ) : (
                                            <IconUnlock />
                                        )
                                    }
                                    size="small"
                                    theme="solid"
                                    style={{
                                        backgroundColor: "#2f68adb3",
                                    }}
                                    onClick={lockUnlockTable}
                                />
                                <Button
                                    icon={<IconEdit />}
                                    size="small"
                                    theme="solid"
                                    style={{
                                        backgroundColor: "#2f68adb3",
                                    }}
                                    onClick={openEditor}
                                />
                                <Popover
                                    key={tableData.id}
                                    content={
                                        <div className="popover-theme">
                                            <div className="mb-2">
                                                <strong>{t("comment")}:</strong>{" "}
                                                {tableData.comment === "" ? (
                                                    t("not_set")
                                                ) : (
                                                    <div>
                                                        {tableData.comment}
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <strong
                                                    className={`${
                                                        tableData.indices
                                                            .length === 0
                                                            ? ""
                                                            : "block"
                                                    }`}
                                                >
                                                    {t("indices")}:
                                                </strong>{" "}
                                                {tableData.indices.length ===
                                                0 ? (
                                                    t("not_set")
                                                ) : (
                                                    <div>
                                                        {tableData.indices.map(
                                                            (index, k) => (
                                                                <div
                                                                    key={k}
                                                                    className={`flex items-center my-1 px-2 py-1 rounded ${
                                                                        settings.mode ===
                                                                        "light"
                                                                            ? "bg-gray-100"
                                                                            : "bg-zinc-800"
                                                                    }`}
                                                                >
                                                                    <i className="fa-solid fa-thumbtack me-2 mt-1 text-slate-500"></i>
                                                                    <div>
                                                                        {index.fields.map(
                                                                            (
                                                                                f,
                                                                            ) => (
                                                                                <Tag
                                                                                    color="blue"
                                                                                    key={
                                                                                        f
                                                                                    }
                                                                                    className="me-1"
                                                                                >
                                                                                    {
                                                                                        f
                                                                                    }
                                                                                </Tag>
                                                                            ),
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            ),
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                            <Button
                                                icon={<IconDeleteStroked />}
                                                type="danger"
                                                block
                                                style={{ marginTop: "8px" }}
                                                onClick={() =>
                                                    deleteTable(tableData.id)
                                                }
                                            >
                                                {t("delete")}
                                            </Button>
                                        </div>
                                    }
                                    position="rightTop"
                                    showArrow
                                    trigger="click"
                                    style={{
                                        width: "200px",
                                        wordBreak: "break-word",
                                    }}
                                >
                                    <Button
                                        icon={<IconMore />}
                                        type="tertiary"
                                        size="small"
                                        style={{
                                            backgroundColor: "#808080b3",
                                            color: "white",
                                        }}
                                    />
                                </Popover>
                            </div>
                        </div>
                    </div>
                    {tableData.fields.map((e, i) => {
                        return settings.showFieldSummary ? (
                            <Popover
                                key={i}
                                content={
                                    <div className="popover-theme">
                                        <div
                                            className="flex justify-between items-center pb-2"
                                            style={{ direction: "ltr" }}
                                        >
                                            <p className="me-4 font-bold">
                                                {e.name}
                                            </p>
                                            <p
                                                className={
                                                    "ms-4 font-mono " +
                                                    dbToTypes[database][e.type]
                                                        .color
                                                }
                                            >
                                                {e.type +
                                                    ((dbToTypes[database][
                                                        e.type
                                                    ].isSized ||
                                                        dbToTypes[database][
                                                            e.type
                                                        ].hasPrecision) &&
                                                    e.size &&
                                                    e.size !== ""
                                                        ? "(" + e.size + ")"
                                                        : "")}
                                            </p>
                                        </div>
                                        <hr />
                                        {e.primary && (
                                            <Tag
                                                color="blue"
                                                className="me-2 my-2"
                                            >
                                                {t("primary")}
                                            </Tag>
                                        )}
                                        {e.unique && (
                                            <Tag
                                                color="amber"
                                                className="me-2 my-2"
                                            >
                                                {t("unique")}
                                            </Tag>
                                        )}
                                        {e.notNull && (
                                            <Tag
                                                color="purple"
                                                className="me-2 my-2"
                                            >
                                                {t("not_null")}
                                            </Tag>
                                        )}
                                        {e.increment && (
                                            <Tag
                                                color="green"
                                                className="me-2 my-2"
                                            >
                                                {t("autoincrement")}
                                            </Tag>
                                        )}
                                        <p>
                                            <strong>
                                                {t("default_value")}:{" "}
                                            </strong>
                                            {e.default === ""
                                                ? t("not_set")
                                                : e.default}
                                        </p>
                                        <p>
                                            <strong>{t("comment")}: </strong>
                                            {e.comment === ""
                                                ? t("not_set")
                                                : e.comment}
                                        </p>
                                    </div>
                                }
                                position="right"
                                showArrow
                                style={
                                    isRtl(i18n.language)
                                        ? { direction: "rtl" }
                                        : { direction: "ltr" }
                                }
                            >
                                {field(e, i)}
                            </Popover>
                        ) : (
                            <div key={i}>
                                {field(e, i)}
                            </div>
                        );
                    })}
                </div>
            </foreignObject>
            <SideSheet
                title={t("edit")}
                size="small"
                visible={
                    selectedElement.element === ObjectType.TABLE &&
                    selectedElement.id === tableData.id &&
                    selectedElement.open &&
                    !layout.sidebar
                }
                onCancel={() =>
                    setSelectedElement((prev) => ({
                        ...prev,
                        open: !prev.open,
                    }))
                }
                style={{ paddingBottom: "16px" }}
            >
                <div className="sidesheet-theme">
                    <TableInfo data={tableData} />
                </div>
            </SideSheet>
        </>
    );

    function field(fieldData, index) {
        return (
            <div
                className={`${
                    index === tableData.fields.length - 1
                        ? ""
                        : "border-b border-gray-400"
                } group h-[36px] px-2 py-1 flex justify-between items-center gap-1 w-full overflow-hidden`}
                onPointerEnter={(e) => {
                    if (!e.isPrimary) return;

                    setHoveredField(index);
                    setHoveredTable({
                        tableId: tableData.id,
                        fieldId: fieldData.id,
                    });
                }}
                onPointerLeave={(e) => {
                    if (!e.isPrimary) return;

                    setHoveredField(null);
                    setHoveredTable({
                        tableId: null,
                        fieldId: null,
                    });
                }}
                onPointerDown={(e) => {
                    // Required for onPointerLeave to trigger when a touch pointer leaves
                    // https://stackoverflow.com/a/70976017/1137077
                    e.target.releasePointerCapture(e.pointerId);
                }}
            >
                <div
                    className={`${
                        hoveredField === index ? "text-zinc-400" : ""
                    } flex items-center gap-2 overflow-hidden`}
                >
                    <button
                        className="shrink-0 w-[10px] h-[10px] bg-[#2f68adcc] rounded-full"
                        onPointerDown={(e) => {
                            if (!e.isPrimary) return;

                            handleGripField();
                            setLinkingLine((prev) => ({
                                ...prev,
                                startFieldId: fieldData.id,
                                startTableId: tableData.id,
                                startX: tableData.x + 15,
                                startY:
                                    tableData.y +
                                    index * tableFieldHeight +
                                    tableHeaderHeight +
                                    tableColorStripHeight +
                                    12,
                                endX: tableData.x + 15,
                                endY:
                                    tableData.y +
                                    index * tableFieldHeight +
                                    tableHeaderHeight +
                                    tableColorStripHeight +
                                    12,
                            }));
                        }}
                    />
                    <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                        {fieldData.name}
                    </span>
                </div>
                <div className="text-zinc-400">
                    {hoveredField === index ? (
                        <Button
                            theme="solid"
                            size="small"
                            style={{
                                backgroundColor: "#d42020b3",
                            }}
                            icon={<IconMinus />}
                            onClick={() => deleteField(fieldData, tableData.id)}
                        />
                    ) : settings.showDataTypes ? (
                        <div className="flex gap-1 items-center">
                            {fieldData.primary && <IconKeyStroked />}
                            {!fieldData.notNull && (
                                <span className="font-mono">?</span>
                            )}
                            <span
                                className={
                                    "font-mono " +
                                    dbToTypes[database][fieldData.type].color
                                }
                            >
                                {fieldData.type +
                                    ((dbToTypes[database][fieldData.type]
                                        .isSized ||
                                        dbToTypes[database][fieldData.type]
                                            .hasPrecision) &&
                                    fieldData.size &&
                                    fieldData.size !== ""
                                        ? `(${fieldData.size})`
                                        : "")}
                            </span>
                        </div>
                    ) : null}
                </div>
            </div>
        );
    }
}
