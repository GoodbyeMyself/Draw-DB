import {
    tableFieldHeight,
    tableHeaderHeight,
    noteWidth,
    noteRadius,
    noteFold,
    gridSize,
    gridCircleRadius,
} from "../data/constants";

import { calcPath } from "../utils/calcPath";

export default function Thumbnail({ diagram, i, theme }) {
    // 计算所有元素的边界框
    const calculateBounds = () => {
        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;

        // 计算表格的边界
        diagram.tables?.forEach((table) => {
            const height = table.fields.length * tableFieldHeight + tableHeaderHeight + 7;
            minX = Math.min(minX, table.x);
            minY = Math.min(minY, table.y);
            maxX = Math.max(maxX, table.x + 200); // 表格宽度固定为200
            maxY = Math.max(maxY, table.y + height);
        });

        // 计算区域的边界
        diagram.subjectAreas?.forEach((area) => {
            minX = Math.min(minX, area.x);
            minY = Math.min(minY, area.y);
            maxX = Math.max(maxX, area.x + area.width);
            maxY = Math.max(maxY, area.y + area.height);
        });

        // 计算笔记的边界
        diagram.notes?.forEach((note) => {
            minX = Math.min(minX, note.x);
            minY = Math.min(minY, note.y);
            maxX = Math.max(maxX, note.x + noteWidth);
            maxY = Math.max(maxY, note.y + note.height);
        });

        // 如果没有元素，使用默认值
        if (minX === Infinity) {
            minX = 0;
            minY = 0;
            maxX = 800;
            maxY = 600;
        }

        return {
            x: minX,
            y: minY,
            width: maxX - minX,
            height: maxY - minY,
        };
    };

    const bounds = calculateBounds();
    
    // 添加一些边距
    const padding = 50;
    const viewBox = {
        x: bounds.x - padding,
        y: bounds.y - padding,
        width: bounds.width + padding * 2,
        height: bounds.height + padding * 2,
    };

    return (
        <svg
            className={`${
                theme === "dark" ? "bg-[#222229]" : "bg-white"
            } w-full h-full rounded-md text-color`}
            viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
        >
            <defs>
                <pattern
                    id={"pattern-grid-" + i}
                    x={-gridCircleRadius}
                    y={-gridCircleRadius}
                    width={gridSize}
                    height={gridSize}
                    patternUnits="userSpaceOnUse"
                    patternContentUnits="userSpaceOnUse"
                >
                    <circle
                        cx={gridCircleRadius}
                        cy={gridCircleRadius}
                        r={gridCircleRadius}
                        fill="rgb(99, 152, 191)"
                        opacity="1"
                    />
                </pattern>
            </defs>
            <rect
                x={viewBox.x}
                y={viewBox.y}
                width={viewBox.width}
                height={viewBox.height}
                fill={"url(#pattern-grid-" + i + ")"}
            />
            
            {/* 渲染关系线 */}
            {diagram.relationships?.map((relationship, index) => {
                const startTable = diagram.tables?.find(t => t.id === relationship.startTableId);
                const endTable = diagram.tables?.find(t => t.id === relationship.endTableId);
                
                if (!startTable || !endTable) return null;
                
                const pathData = calcPath({
                    startFieldIndex: startTable.fields.findIndex(f => f.id === relationship.startFieldId),
                    endFieldIndex: endTable.fields.findIndex(f => f.id === relationship.endFieldId),
                    startTable: { x: startTable.x, y: startTable.y },
                    endTable: { x: endTable.x, y: endTable.y },
                }, 200, 1);
                
                // 计算基数标记
                let cardinalityStart = "1";
                let cardinalityEnd = "1";
                
                switch (relationship.cardinality) {
                    case "many_to_one":
                        cardinalityStart = "n";
                        cardinalityEnd = "1";
                        break;
                    case "one_to_many":
                        cardinalityStart = "1";
                        cardinalityEnd = "n";
                        break;
                    case "one_to_one":
                    default:
                        cardinalityStart = "1";
                        cardinalityEnd = "1";
                        break;
                }
                
                return (
                    <g key={`relationship-${index}`}>
                        <path
                            d={pathData}
                            stroke="#666666"
                            fill="none"
                            strokeWidth="1.5"
                            opacity="0.9"
                        />
                        {/* 基数标记 - 简化版本 */}
                        <circle
                            cx={startTable.x + 200}
                            cy={startTable.y + tableHeaderHeight + startTable.fields.findIndex(f => f.id === relationship.startFieldId) * tableFieldHeight + tableFieldHeight / 2}
                            r="6"
                            fill="#666666"
                            opacity="0.9"
                        />
                        <text
                            x={startTable.x + 200}
                            y={startTable.y + tableHeaderHeight + startTable.fields.findIndex(f => f.id === relationship.startFieldId) * tableFieldHeight + tableFieldHeight / 2}
                            fill="white"
                            strokeWidth="0.5"
                            textAnchor="middle"
                            alignmentBaseline="middle"
                            fontSize="8"
                        >
                            {cardinalityStart}
                        </text>
                        <circle
                            cx={endTable.x}
                            cy={endTable.y + tableHeaderHeight + endTable.fields.findIndex(f => f.id === relationship.endFieldId) * tableFieldHeight + tableFieldHeight / 2}
                            r="6"
                            fill="#666666"
                            opacity="0.9"
                        />
                        <text
                            x={endTable.x}
                            y={endTable.y + tableHeaderHeight + endTable.fields.findIndex(f => f.id === relationship.endFieldId) * tableFieldHeight + tableFieldHeight / 2}
                            fill="white"
                            strokeWidth="0.5"
                            textAnchor="middle"
                            alignmentBaseline="middle"
                            fontSize="8"
                        >
                            {cardinalityEnd}
                        </text>
                    </g>
                );
            })}
            
            {diagram.subjectAreas?.map((a) => (
                <foreignObject
                    key={a.id}
                    x={a.x}
                    y={a.y}
                    width={a.width > 0 ? a.width : 0}
                    height={a.height > 0 ? a.height : 0}
                >
                    <div className="border border-slate-400 w-full h-full rounded-xs relative">
                        <div
                            className="opacity-40 w-fill h-full"
                            style={{ backgroundColor: a.color }}
                        />
                    </div>
                    <div className="text-color absolute top-1 left-2 select-none">
                        {a.name}
                    </div>
                </foreignObject>
            ))}
            {diagram.tables?.map((table, i) => {
                const height =
                    table.fields.length * tableFieldHeight +
                    tableHeaderHeight +
                    7;
                return (
                    <foreignObject
                        x={table.x}
                        y={table.y}
                        width={200}
                        height={height}
                        key={i}
                    >
                        <div
                            className={`border rounded-md ${
                                theme === "dark"
                                    ? "bg-zinc-800"
                                    : "border-zinc-300 bg-zinc-100"
                            }`}
                        >
                            <div
                                className="h-2 w-full rounded-t-sm"
                                style={{ backgroundColor: table.color }}
                            />
                            <div className="rounded-b-[3px]">
                                <div
                                    className={`font-bold py-1 px-2 border-b ${
                                        theme === "dark"
                                            ? "bg-zinc-900"
                                            : "bg-zinc-200"
                                    } border-gray-300`}
                                >
                                    {table.name}
                                </div>
                                {table.fields.map((f, j) => (
                                    <div
                                        className={`flex justify-between items-center py-1 px-2 ${
                                            j < table.fields.length - 1
                                                ? "border-b"
                                                : ""
                                        }`}
                                        key={j}
                                    >
                                        <div className="flex items-center justify-start">
                                            <div
                                                className={`w-[6px] h-[6px] bg-[#2f68adcc] rounded-full me-2`}
                                            ></div>
                                            <div>{f.name}</div>
                                        </div>
                                        <div className="text-zinc-500">
                                            {f.type}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </foreignObject>
                );
            })}
            {diagram.notes?.map((n) => {
                const x = n.x;
                const y = n.y;
                const h = n.height;
                return (
                    <g key={n.id}>
                        <path
                            d={`M${x + noteFold} ${y} L${x + noteWidth - noteRadius} ${y} A${noteRadius} ${noteRadius} 0 0 1 ${
                                x + noteWidth
                            } ${y + noteRadius} L${x + noteWidth} ${y + h - noteRadius} A${noteRadius} ${noteRadius} 0 0 1 ${
                                x + noteWidth - noteRadius
                            } ${y + h} L${x + noteRadius} ${y + h} A${noteRadius} ${noteRadius} 0 0 1 ${x} ${
                                y + h - noteRadius
                            } L${x} ${y + noteFold}`}
                            fill={n.color}
                            stroke="rgb(168 162 158)"
                            strokeLinejoin="round"
                            strokeWidth="0.5"
                        />
                        <path
                            d={`M${x} ${y + noteFold} L${x + noteFold - noteRadius} ${
                                y + noteFold
                            } A${noteRadius} ${noteRadius} 0 0 0 ${x + noteFold} ${y + noteFold - noteRadius} L${
                                x + noteFold
                            } ${y} L${x} ${y + noteFold} Z`}
                            fill={n.color}
                            stroke={"rgb(168 162 158)"}
                            strokeLinejoin="round"
                            strokeWidth="0.5"
                        />
                        <foreignObject
                            x={x}
                            y={y}
                            width={noteWidth}
                            height={h}
                        >
                            <div className="text-gray-900 w-full h-full px-4 py-2">
                                <label
                                    htmlFor={`note_${n.id}`}
                                    className="ms-4"
                                >
                                    {n.title}
                                </label>
                                <div className="mt-[2px]">{n.content}</div>
                            </div>
                        </foreignObject>
                    </g>
                );
            })}
        </svg>
    );
}
