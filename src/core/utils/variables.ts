import { FromToFilterGroup } from "../interfaces/components";
import { Challenge, User } from "../interfaces/data";


export const SAMPLE_USER: User = {
    email: "user@email.com",
    id: "user_id",
    paylink: "https://paylink.com",
    username: "John Doe",
    paypalEmail: "user@email.com"
}

export const SAMPLE_CHALLENGE: Challenge = {
    date: Date.now(),
    cost: 200.21,
    duration: 35,
    wpm: 251,
    earnings: 480.31,
    accuracy: 98,
    consistency: 98,
    errorcount: 60,
    challenger_id: "johndoe",
    issuedBy_id: "janedoe",
    id: "c-1125",
    state: "live",
    isVisibile: true,
};


export const FROM_TO_GROUPS: FromToFilterGroup[] = [
    {
        title: "Cost",
        pid: "cost",
    },
    {
        title: "Earnings",
        pid: "earnings",
    },
    {
        title: "WPM",
        pid: "wpm",
    },
    {
        title: "Accuracy",
        pid: "accuracy",
    },
    {
        title: "Time",
        pid: "time",
    },
    {
        title: "Word Count",
        pid: "wordCount",
    },
]