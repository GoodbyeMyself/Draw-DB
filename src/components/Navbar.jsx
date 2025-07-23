import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo_light_160.png";
import { SideSheet } from "@douyinfe/semi-ui";
import { IconMenu } from "@douyinfe/semi-icons";

export default function Navbar() {
    
    const [openMenu, setOpenMenu] = useState(false);

    return (
        <>
            <div className="py-2 px-8 sm:px-4 flex justify-between items-center">
                <div className="flex items-center justify-start">
                    <Link to="/">
                        <img
                            src={logo}
                            alt="logo"
                            className="me-2 h-[24px] sm:h-[32px]"
                        />
                    </Link>
                    <div className="md:hidden">
                        <Link
                            className="ms-10 text-lg font-semibold"
                            onClick={() =>
                                document
                                    .getElementById("features")
                                    .scrollIntoView({ behavior: "smooth" })
                            }
                        >
                            特性
                        </Link>
                        <Link
                            to="/editor"
                            className="ms-10 text-lg font-semibold"
                        >
                            编辑器
                        </Link>
                        <Link
                            to="/templates"
                            className="ms-10 text-lg font-semibold"
                        >
                            模板
                        </Link>
                    </div>
                </div>
                <button
                    onClick={() => setOpenMenu((prev) => !prev)}
                    className="hidden md:inline-block h-[24px]"
                >
                    <IconMenu size="extra-large" />
                </button>
            </div>
            <hr />
            <SideSheet
                title={
                    <img
                        src={logo}
                        alt="logo"
                        className="sm:h-[32px] md:h-[42px]"
                    />
                }
                visible={openMenu}
                onCancel={() => setOpenMenu(false)}
                width={window.innerWidth}
            >
                <Link
                    className="hover:bg-zinc-100 block p-3 text-base font-semibold"
                    onClick={() => {
                        document
                            .getElementById("features")
                            .scrollIntoView({ behavior: "smooth" });
                        setOpenMenu(false);
                    }}
                >
                    特性
                </Link>
                <hr />
                <Link
                    to="/editor"
                    className="hover:bg-zinc-100 block p-3 text-base font-semibold"
                >
                    编辑器
                </Link>
                <hr />
                <Link
                    to="/templates"
                    className="hover:bg-zinc-100 block p-3 text-base font-semibold"
                >
                    模板
                </Link>
                <hr />
            </SideSheet>
        </>
    );
}
