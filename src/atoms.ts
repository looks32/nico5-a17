import { atom } from "recoil";

export const time = atom({
    key: "time",
    default: 1500, // 1500
});

export const round = atom({
    key: "round",
    default: 0,
});

export const goal = atom({
    key: "goal",
    default: 0,
});