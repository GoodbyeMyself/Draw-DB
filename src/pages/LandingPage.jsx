import { useEffect } from "react";
import { Link } from "react-router-dom";
import SimpleCanvas from "../components/SimpleCanvas";
import Navbar from "../components/Navbar";
import { diagram } from "../data/heroDiagram";
import mysql_icon from "../assets/mysql.png";
import postgres_icon from "../assets/postgres.png";
import sqlite_icon from "../assets/sqlite.png";
import mariadb_icon from "../assets/mariadb.png";
import oraclesql_icon from "../assets/oraclesql.png";
import sql_server_icon from "../assets/sql-server.png";
import screenshot from "../assets/screenshot.png";
import FadeIn from "../animations/FadeIn";

export default function LandingPage() {

    useEffect(() => {
        document.body.setAttribute("theme-mode", "light");
    }, []);

    return (
        <div>
            <div className="flex flex-col h-screen bg-zinc-100">
                <div className="text-white font-semibold py-1 text-sm text-center bg-linear-to-r from-[#12495e] from-10% via-slate-500 to-[#12495e]" />

                <FadeIn duration={0.6}>
                    <Navbar />
                </FadeIn>

                {/* Hero section */}
                <div className="flex-1 flex-col relative mx-4 md:mx-0 mb-4 rounded-3xl bg-white">
                    <div className="h-full md:hidden">
                        <SimpleCanvas diagram={diagram} zoom={0.85} />
                    </div>
                    <div className="hidden md:block h-full bg-dots" />
                    <div className="absolute left-12 w-[45%] top-[50%] translate-y-[-54%] md:left-[50%] md:translate-x-[-50%] p-8 md:p-3 md:w-full text-zinc-800">
                        <FadeIn duration={0.75}>
                            <div className="md:px-3">
                                <h1 className="text-[42px] md:text-3xl font-bold tracking-wide bg-linear-to-r from-sky-900 from-10% via-slate-500 to-[#12495e] inline-block text-transparent bg-clip-text">
                                    Draw, Copy, and Paste
                                </h1>
                                <div className="text-lg font-medium mt-2 sliding-vertical">
                                    简单，直观的数据库设计编辑器，数据建模器 和 SQL 生成器. {" "}
                                    <span className="ms-2 sm:block sm:ms-0 text-slate-500 bg-white font-bold whitespace-nowrap">
                                        No sign up
                                    </span>
                                    <span className="ms-2 sm:block sm:ms-0 text-slate-500 bg-white font-bold whitespace-nowrap">
                                        Free of charge
                                    </span>
                                    <span className="ms-2 sm:block sm:ms-0 text-slate-500 bg-white font-bold whitespace-nowrap">
                                        Quick and easy
                                    </span>
                                </div>
                            </div>
                        </FadeIn>
                        <div className="mt-12 font-semibold md:mt-12">
                            <button
                                className="py-2 mb-4 xl:mb-0 mr-4 transition-all duration-300 bg-white border rounded-full shadow-lg px-6 border-zinc-200 hover:bg-zinc-100 text-sm"
                                onClick={() =>
                                    document
                                        .getElementById("learn-more")
                                        .scrollIntoView({ behavior: "smooth" })
                                }
                            >
                                了解更多
                            </button>
                            <Link
                                to="/editor"
                                className="inline-block py-2 text-white transition-all duration-300 rounded-full shadow-lg bg-sky-900 ps-5 pe-4 hover:bg-sky-800 text-sm"
                            >
                                进入编辑器 {" "}
                                <i className="bi bi-arrow-right ms-1"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Learn more */}
            <div id="learn-more">
                <div className="bg-zinc-100 py-10 px-28 md:px-8">
                    <div className="text-center">
                        <div className="font-semibold text-lg md:text-base">
                            全平台新一代 AI 智能终端
                        </div>
                    </div>
                    <div className="mt-16 w-[75%] text-center sm:w-full mx-auto shadow-xs rounded-2xl border p-6 bg-white space-y-3 mb-12">
                        <div className="text-lg font-medium mb-8 mt-4">
                            只需单击几下即可构建图表、查看全图、导出 SQL 脚本、自定义编辑器等 .
                        </div>
                        <img src={screenshot} className="mx-auto" />
                    </div>
                </div>
                <svg
                    viewBox="0 0 1440 54"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    className="bg-transparent"
                >
                    <path
                        d="M0 54C0 54 320 0 720 0C1080 0 1440 54 1440 54V0H0V100Z"
                        fill="#f4f4f5"
                    />
                </svg>
            </div>

            {/* Features */}
            <div id="features" className="py-8 px-36 md:px-8">
                <FadeIn duration={1}>
                    <div className="text-base font-medium text-center text-sky-900">
                            不仅仅是一个编辑器
                    </div>
                    <div className="text-2xl mt-1 font-medium text-center">
                        我们能提供什么
                    </div>
                    <div className="grid grid-cols-3 gap-8 mt-10 md:grid-cols-2 sm:grid-cols-1">
                        {features.map((f, i) => (
                            <div
                                key={"feature" + i}
                                className="flex rounded-xl hover:bg-zinc-100 border border-zinc-100 shadow-xs hover:-translate-y-2 transition-all duration-300"
                            >
                                <div className="bg-sky-700 px-0.5 rounded-l-xl" />
                                <div className="px-8 py-4 ">
                                    <div className="text-lg font-semibold mb-3">
                                        {f.title}
                                    </div>
                                    <div className="text-sm">
                                        {f.content}
                                    </div>
                                    <div className="mt-2 text-xs opacity-60">
                                        {f.footer}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </FadeIn>
            </div>

            {/* Contact us */}
            <svg
                viewBox="0 0 1440 54"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                className="bg-transparent -scale-100"
            >
                <path
                    d="M0 48 C0 48 320 0 720 0C1080 0 1440 48 1440 48V0H0V100Z"
                    fill="#f4f4f5"
                />
            </svg>
            <div className="bg-zinc-100 py-8 px-32 md:px-8">
                <div className="text-lg font-medium text-center mt-12 mb-6">
                    为您的数据库精心设计
                </div>
                <div className="grid grid-cols-3 place-items-center sm:grid-cols-1 sm:gap-10">
                    {dbs.map((s, i) => (
                        <img
                            key={"icon-" + i}
                            src={s.icon}
                            style={{ height: s.height }}
                            className="opacity-70 hover:opacity-100 transition-opacity duration-300 md:scale-[0.7] md:mx-auto"
                        />
                    ))}
                </div>
            </div>

            <div className="bg-red-700 py-1 text-center text-white text-xs font-semibold px-3">
                注意！图表保存在您的浏览器中。在清除浏览器数据之前，请确保备份您的数据.
            </div>
            <hr className="border-zinc-300" />
            <div className="text-center text-sm py-3">
                &copy; <strong>drawDB</strong> - All right reserved.
            </div>
        </div>
    );
}

const dbs = [
    { icon: mysql_icon, height: 80 },
    { icon: postgres_icon, height: 48 },
    { icon: sqlite_icon, height: 64 },
    { icon: mariadb_icon, height: 64 },
    { icon: sql_server_icon, height: 64 },
    { icon: oraclesql_icon, height: 172 },
];

const features = [
    {
        title: "导出",
        content: (
            <div>
                导出 DDL 脚本在您的数据库上运行或导出为 JSON 或图像。
            </div>
        ),
        footer: "",
    },
    {
        title: "逆向工程",
        content: (
            <div>
                已经有一个模式 ？导入 DDL 脚本生成图表。
            </div>
        ),
        footer: "",
    },
    {
        title: "可定制的工作区",
        content: (
            <div>
                自定义 UI 以适应您的偏好。选择您想要在视图中显示的组件。
            </div>
        ),
        footer: "",
    },
    {
        title: "快捷键",
        content: (
            <div>
                使用快捷键加速开发, 
                <Link
                    to={`/shortcuts`}
                    className="ms-1.5 text-blue-500 hover:underline"
                >
                    查看所有可用的快捷键
                </Link>
                .
            </div>
        ),
        footer: "",
    },
    {
        title: "模板",
        content: (
            <div>
                从预构建的模板开始。获取快速入门或获取设计灵感。
            </div>
        ),
        footer: "",
    },
    {
        title: "自定义模板",
        content: (
            <div>
                保存画布内容作为模板并在需要时加载它们。
            </div>
        ),
        footer: "",
    },
    {
        title: "健壮的编辑器",
        content: (
            <div>
                撤销、重做、复制、粘贴、复制和更多 ；添加表、主题区域和注释。
            </div>
        ),
        footer: "",
    },
    {
        title: "错误检测",
        content: (
            <div>
                检测并解决图表中的错误，以确保脚本是正确的。
            </div>
        ),
        footer: "",
    },
    {
        title: "关系型数据库",
        content: (
            <div>
                我们支持 5 种关系型数据库 - MySQL, PostgreSQL, SQLite, MariaDB, SQL Server.
            </div>
        ),
        footer: "",
    },
    {
        title: "对象关系型数据库",
        content: (
            <div>
                添加自定义类型用于对象关系型数据库，或创建自定义 JSON 方案。
            </div>
        ),
        footer: "",
    },
    {
        title: "演示模式",
        content: (
            <div>
                在团队会议和讨论中展示您的图表。
            </div>
        ),
        footer: "",
    },
    {
        title: "跟踪待办事项",
        content: (
            <div>跟踪任务并标记完成。</div>
        ),
        footer: "",
    },
];
