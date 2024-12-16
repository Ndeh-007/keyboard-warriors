import { FromToFilterGroup, InlineAlertOptions } from "../interfaces/components";
import { Challenge, ChallengeOption, OperationSettings, User } from "../interfaces/data";
import UsersJSON from "../data/mock_users.json"
import ChallengesJSON from "../data/challenges.json"

// process the mock data
export const SAMPLE_USERS: User[] = UsersJSON.map((item) => item.User)
export const SAMPLE_CHALLENGES: Challenge[] = ChallengesJSON.map((item) => {
    let c = { ...item.Challenge, language: "english", characters: "text" }
    c.accuracy = Math.round((c.accuracy / 10e11)) / 100
    c.consistency = Math.round((c.consistency / 10e11)) / 100
    c.wpm = Math.round((c.wpm / 10e11)) / 100
    c.earnings = 2 * Math.round((c.cost / 10e11)) / 100
    c.cost = Math.round((c.cost / 10e11)) / 100
    c.date = Math.round((c.date / 10e3)) / 1
    c.duration = Math.round((c.duration / 10e13)) / 1
    c.errorcount = Math.round((c.errorcount / 10e13)) / 1
    return c
})

export const DEFAULT_OPERATION_SETTINGS: OperationSettings = {
    minChallengeCost: 10,
    maxChallengeCost: 10,
    currency: "CAD",
    refundPercent: 50,
    earningsMultiplier: 2
}

export const SAMPLE_USER: User = {
    email: "user@email.com",
    id: "user_id",
    paylink: "https://paylink.com",
    username: "John Doe",
    paypalEmail: "user@email.com"
}

export const DEFAULT_CHALLENGE: Challenge = {
    date: Date.now(),
    cost: 0.01,
    duration: 0.01,
    wpm: 0.01,
    earnings: 0.01,
    accuracy: 0.01,
    consistency: 0.01,
    errorcount: 0.01,
    challenger_id: "default",
    issuedBy_id: "default",
    id: "default",
    state: "live",
    isVisibile: true,
    language: "english",
    characters: "text"
};


export const FROM_TO_GROUPS: FromToFilterGroup[] = [
    {
        title: "Cost",
        pid: "cost",
        onEntryChanged: (opt: FromToFilterGroup) => opt
    },
    {
        title: "Earnings",
        pid: "earnings",
        onEntryChanged: (opt: FromToFilterGroup) => opt
    },
    {
        title: "WPM",
        pid: "wpm",
        onEntryChanged: (opt: FromToFilterGroup) => opt
    },
    {
        title: "Accuracy",
        pid: "accuracy",
        onEntryChanged: (opt: FromToFilterGroup) => opt
    },
    {
        title: "Time",
        pid: "time",
        onEntryChanged: (opt: FromToFilterGroup) => opt
    },
    {
        title: "Word Count",
        pid: "wordCount",
        onEntryChanged: (opt: FromToFilterGroup) => opt
    },
]

export const TIME_CHALLENGE_OPTIONS: ChallengeOption[] = [
    {
        tag: 15,
        title: 15,
        description: "seconds",
        index: 0,
    },
    {
        tag: 30,
        title: 30,
        description: "seconds",
        index: 1,
    },
    {
        tag: 60,
        title: 60,
        description: "seconds",
        index: 2,
    }
]

export const LANGUAUGE_CHALLENGE_OPTIONS: ChallengeOption[] = [
    {
        tag: "english",
        title: "English",
        description: "Text is appears in English",
        index: 0
    },
]

export const TEXT_TYPE_CHALLENGE_OPTIONS: ChallengeOption[] = [
    {
        tag: "text",
        title: "Text",
        description: "Raw text in choosen language",
        index: 0,
    },
    {
        tag: "numbers",
        title: "Numbers",
        description: "Text include numbers",
        index: 1
    },
    {
        tag: "symbols",
        title: "Symbols",
        description: "Text contains punctuation and symbols",
        index: 2
    },
]

export const DEFAULT_INLINE_ALERT: InlineAlertOptions = {
    text: "",
    color: "primary",
    open: false
}