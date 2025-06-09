"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFromLocalStorage = getFromLocalStorage;
exports.setToLocalStorage = setToLocalStorage;
exports.mergeUserData = mergeUserData;
function getFromLocalStorage(key) {
    try {
        if (typeof window !== "undefined" &&
            typeof window.localStorage !== "undefined") {
            const value = localStorage.getItem(key);
            return value !== null ? value : null;
        }
    }
    catch (err) {
        console.warn("Error accessing localStorage:", err);
    }
    return null;
}
function setToLocalStorage(key, value) {
    try {
        if (typeof window !== "undefined" &&
            typeof window.localStorage !== "undefined") {
            localStorage.setItem(key, value);
        }
    }
    catch (err) {
        console.warn("Error setting localStorage:", err);
    }
}
function mergeUserData(currentData, newData) {
    return {
        ...currentData,
        ...Object.fromEntries(Object.entries(newData).filter(([_, value]) => value !== null && value !== undefined)),
    };
}
//# sourceMappingURL=utils.js.map