// 控制台过滤器 - 过滤掉 autofocus 相关的警告
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;
const originalConsoleLog = console.log;

// 过滤规则列表
const filterRules = [
    // autofocus 相关警告
    (message) => {
        if (typeof message === "string") {
            return (
                !message.includes("Invalid DOM property `autofocus`") &&
                !message.includes("Did you mean `autoFocus`")
            );
        }
        return true;
    },
    // 其他可能的 React 开发警告
    (message) => {
        if (typeof message === "string") {
            return (
                !message.includes("Warning: Invalid DOM property") ||
                !message.includes("Did you mean")
            );
        }
        return true;
    },
    // React Router Future Flag Warning
    (message) => {
        if (typeof message === "string") {
            return (
                !message.includes("React Router Future Flag Warning") &&
                !message.includes("React Router will begin wrapping state updates") &&
                !message.includes("v7_startTransition")
            );
        }
        return true;
    },
    // findDOMNode 废弃警告
    (message) => {
        if (typeof message === "string") {
            return (
                !message.includes("findDOMNode is deprecated") &&
                !message.includes("Instead, add a ref directly to the element")
            );
        }
        return true;
    },
    // React 更新函数中的副作用警告
    (message) => {
        if (typeof message === "string") {
            return (
                !message.includes("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function") &&
                !message.includes("Update functions should be pure, with zero side-effects")
            );
        }
        return true;
    },
];

// 检查消息是否应该被过滤
const shouldFilterMessage = (...args) => {
    const message = args[0];
    return filterRules.every((rule) => rule(message));
};

// 重写 console.warn
console.warn = (...args) => {
    if (shouldFilterMessage(...args)) {
        originalConsoleWarn.apply(console, args);
    }
};

// 重写 console.error
console.error = (...args) => {
    if (shouldFilterMessage(...args)) {
        originalConsoleError.apply(console, args);
    }
};

// 重写 console.log（可选，用于调试）
// console.log = (...args) => {
//     if (shouldFilterMessage(...args)) {
//         originalConsoleLog.apply(console, args);
//     }
// };

// 导出过滤器函数，以便在其他地方使用
export const addConsoleFilter = (filterRule) => {
    filterRules.push(filterRule);
};

export default filterRules;
