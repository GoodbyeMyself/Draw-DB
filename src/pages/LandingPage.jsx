import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IconCrossStroked } from "@douyinfe/semi-icons";
import SimpleCanvas from "../components/SimpleCanvas";
import Navbar from "../components/Navbar";
import { diagram } from "../data/heroDiagram";
import { Steps } from "@douyinfe/semi-ui";
import mysql_icon from "../assets/mysql.png";
import postgres_icon from "../assets/postgres.png";
import sqlite_icon from "../assets/sqlite.png";
import mariadb_icon from "../assets/mariadb.png";
import sql_server_icon from "../assets/sql-server.png";
import discord from "../assets/discord.png";
import github from "../assets/github.png";
import FadeIn from "../animations/FadeIn";
import SlideIn from "../animations/SlideIn";

export default function LandingPage() {
    useEffect(() => {
        document.body.setAttribute("theme-mode", "light");
        document.title =
            "drawDB | Online database diagram editor and SQL generator";
    });

    return (
        <div>
            <div className="flex flex-col h-screen">
                <Navbar />
                <div className="flex-1 flex-col relative">
                    <div className="h-full md:hidden">
                        <SimpleCanvas diagram={diagram} zoom={0.85} />
                    </div>
                    <div className="hidden md:block h-full bg-dots"></div>
                    <div className="absolute left-12 top-[50%] translate-y-[-50%] md:left-[50%] md:translate-x-[-50%] p-8 md:p-3 md:w-full text-zinc-800 text-center">
                        <FadeIn duration={0.75}>
                            <div className="text-4xl font-bold tracking-wide">
                                <h1 className="py-1 bg-gradient-to-r from-slate-700 from-10% via-slate-500 to-slate-700 inline-block text-transparent bg-clip-text">
                                    绘制，复制和粘贴
                                </h1>
                            </div>
                            <div className="text-lg font-semibold mt-5">
                                简单，直观的数据库设计工具和SQL生成器.
                            </div>
                        </FadeIn>
                        <div className="mt-8 flex gap-4 justify-center font-semibold">
                            <button
                                className="bg-white shadow-lg px-9 py-2 rounded border border-zinc-200 hover:bg-zinc-100 transition-all duration-300"
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
                                className="bg-slate-700 text-white px-4 py-2 rounded shadow-lg hover:bg-slate-600 transition-all duration-200"
                            >
                                进入编辑器
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div id="learn-more">
                <div className="bg-zinc-100 py-10 px-24 md:px-8 rounded-b-[40px]">
                    <FadeIn duration={1}>
                        <div className="text-2xl text-slate-900 font-bold text-center mb-5 md:hidden">
                            简化的实体关系图
                        </div>
                        <div className="md:hidden">
                            <Steps type="basic" current={3}>
                                <Steps.Step
                                    title="创建表"
                                    description="定义带有必要字段和索引的表."
                                />
                                <Steps.Step
                                    title="新建关系"
                                    description="通过简单的拖动来建立关系"
                                />
                                <Steps.Step
                                    title="导出"
                                    description="导出为您喜欢的 SQL 风格"
                                />
                            </Steps>
                        </div>
                    </FadeIn>
                    <div className="mt-16 text-center w-[75%] sm:w-full mx-auto shadow-sm rounded-lg border px-12 py-8 bg-white">
                        <div className="text-2xl font-bold text-slate-900 mb-8">
                            drawDB 是什么 ?
                        </div>
                        <div className="grid grid-cols-3 gap-4 md:grid-cols-1 h-full">
                            <SlideIn
                                delay={0}
                                duration={0.4}
                                className="h-full"
                            >
                                <div className="h-full border rounded-lg p-6 hover:bg-slate-100 transition-all duration-300">
                                    <span className="text-white bg-green-400 rounded-full py-2.5 px-3">
                                        <i className="fa-solid fa-credit-card"></i>
                                    </span>
                                    <div className="mt-6 text-lg font-semibold text-slate-700">
                                    免费的
                                    </div>
                                    <div className="text-sm mt-3">
                                        drawDB 是完全免费的.
                                    </div>
                                </div>
                            </SlideIn>
                            <SlideIn
                                delay={1 * 0.4}
                                duration={0.4}
                                className="h-full"
                            >
                                <div className="h-full border rounded-lg p-6 hover:bg-slate-100 transition-all duration-300">
                                    <span className="text-white bg-blue-400 rounded-full py-2.5 px-3">
                                        <i className="fa-solid fa-user-xmark"></i>
                                    </span>
                                    <div className="mt-6 text-lg font-semibold text-slate-700">
                                        无需注册
                                    </div>
                                    <div className="text-sm mt-3">
                                        无需注册或登录. 直接进入开发.
                                    </div>
                                </div>
                            </SlideIn>
                            <SlideIn
                                delay={2 * 0.4}
                                duration={0.4}
                                className="h-full"
                            >
                                <div className="h-full border rounded-lg p-6 hover:bg-slate-100 transition-all duration-300">
                                    <span className="text-white bg-emerald-400 rounded-full py-2.5 px-3">
                                        <i className="fa-regular fa-star "></i>
                                    </span>
                                    <div className="mt-6 text-lg font-semibold text-slate-700">
                                        简单易用
                                    </div>
                                    <div className="text-sm mt-3">
                                        直观的设计，易于导航.
                                    </div>
                                </div>
                            </SlideIn>
                        </div>
                    </div>
                </div>
            </div>
            <div id="features" className="py-10 px-36 md:px-8">
                <FadeIn duration={1}>
                    <div className="text-2xl font-bold text-center">
                        这里有什么?
                    </div>
                    <div className="text-sm opacity-75 text-center">
                        更多功能即将推出... 
                    </div>
                    <div className="grid grid-cols-3 gap-8 mt-6 md:grid-cols-2 sm:grid-cols-1">
                        {features.map((f, i) => (
                            <div
                                key={i}
                                className="rounded-xl hover:bg-zinc-100 border shadow-sm hover:-translate-y-2 transition-all duration-300"
                            >
                                <div className="bg-sky-700 py-1 rounded-t-xl" />
                                <div className="px-8 py-4 ">
                                    <div className="text-lg font-semibold mb-3">
                                        {f.title}
                                    </div>
                                    <div className="text-sm opacity-80">
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
            <div className="bg-red-700 py-1 text-center text-white text-xs font-semibold px-3 mt-8 mb-8">
                注意! 图数据保存在浏览器中, 在清空浏览器之前，请务必备份您的数据.
            </div>
            <hr className="border-zinc-300" />
            <div className="text-center text-sm py-3">
                &copy; <strong>drawDB</strong> - All right reserved.
            </div>
        </div>
    );
}

const features = [
    {
        title: "导出",
        content: (
            <div>
                导出 DDL脚本 在您的数据库上运行, 或导出为 JSON 或 图像.
            </div>
        ),
        footer: "",
    },
    {
        title: "导入",
        content: (
            <div>
                已经有一个图表 ? 导入 DDL 脚本 *, 或 JSON 文件生成 或 导入图表.
            </div>
        ),
        footer: "*仅支持 MySQL, 更多支持即将推出 ...",
    },
    {
        title: "可定制的工作区",
        content: (  
            <div>
                自定义 UI 以适应您的偏好. 选择您想要在视图中显示的组件.
            </div>
        ),
        footer: "",
    },
    {
        title: "快捷键",
        content: (
            <div>
                使用快捷键加速开发. 
                <Link
                    to="/shortcuts"
                    className="ms-1.5 text-blue-500 hover:underline"
                >
                    查看所有可用的快捷键.
                </Link>
            </div>
        ),
        footer: "",
    },
    {
        title: "模板",
        content: (
            <div>
                从预构建的模板开始. 获取快速开始或获取设计灵感.
            </div>
        ),
        footer: "",
    },
    {
        title: "自定义模板",
        content: (
            <div>
                有样板结构 ? 保存它们作为模板, 并在需要时加载它们.
            </div>
        ),
        footer: "",
    },
    {
        title: "强大的编辑器",
        content: (
            <div>
                撤销, 重做, 复制, 粘贴, 复制和更多. 添加表, 主题区域和注释.
            </div>
        ),
        footer: "",
    },
    {
        title: "错误检测",
        content: (
            <div>
                检测和解决图表中的错误, 确保脚本正确.
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
                添加自定义类型用于对象关系型数据库, 或创建自定义JSON方案和别名类型.
            </div>
        ),
        footer: "",
    },
    {
        title: "演示模式",
        content: (
            <div>
                在团队会议和讨论中展示您的图表.
            </div>
        ),
        footer: "",
    },
    {
        title: "跟踪待办事项",
        content: (
            <div>跟踪任务并标记完成.</div>
        ),
        footer: "",
    },
];
