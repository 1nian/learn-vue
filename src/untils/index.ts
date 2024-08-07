export const setLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key: string) => {
    return JSON.parse(localStorage.getItem(key) as string);
};

export const removeLocalStorage = (key: string) => {
    localStorage.removeItem(key);
};

// 动态获取对象的属性值 key-value
export const deepEntries = (obj: object): any => {
    return Object.entries(obj).flatMap(([k, v]) =>
        typeof v === "object" && v !== null
            ? [[k, v], ...deepEntries(v)]
            : [[k, v]]
    );
};
