import { FromToFilterGroup } from "../interfaces/components";
import { Challenge, ChallengeOption, OperationSettings, User } from "../interfaces/data";
import UsersJSON from "../data/mock_users.json"
import ChallengesJSON from "../data/challenges.json"

// process the mock data
export const SAMPLE_USERS: User[] = UsersJSON.map((item) => item.User)
export const SAMPLE_CHALLENGES: Challenge[] = ChallengesJSON.map((item) => {
    let c = item.Challenge
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

export const SAMPLE_OPERATION_SETTINGS: OperationSettings = {
    minChallengeCost: 10,
    maxChallengeCost: 10,
    currency: "CAD"
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
};


export const FROM_TO_GROUPS: FromToFilterGroup[] = [
    {
        title: "Cost",
        pid: "cost",
        onEntryChanged: (opt: FromToFilterGroup) => { }
    },
    {
        title: "Earnings",
        pid: "earnings",
        onEntryChanged: (opt: FromToFilterGroup) => { }
    },
    {
        title: "WPM",
        pid: "wpm",
        onEntryChanged: (opt: FromToFilterGroup) => { }
    },
    {
        title: "Accuracy",
        pid: "accuracy",
        onEntryChanged: (opt: FromToFilterGroup) => { }
    },
    {
        title: "Time",
        pid: "time",
        onEntryChanged: (opt: FromToFilterGroup) => { }
    },
    {
        title: "Word Count",
        pid: "wordCount",
        onEntryChanged: (opt: FromToFilterGroup) => { }
    },
]

export const TIME_CHALLENGE_OPTIONS: ChallengeOption[] = [
    {
        tag: "thiry",
        title: 30,
        description: "seconds"
    },
    {
        tag: "fifteen",
        title: 15,
        description: "seconds"
    },
    {
        tag: "thiry",
        title: 60,
        description: "seconds"
    }
]

export const LANGUAUGE_CHALLENGE_OPTIONS: ChallengeOption[] = [
    {
        tag: "english",
        title: "English",
        description: "Text is appears in English"
    },
]

export const TEXT_TYPE_CHALLENGE_OPTIONS: ChallengeOption[] = [
    {
        tag: "plaintext",
        title: "Text",
        description: "Raw text in choosen language"
    },
    {
        tag: "numbers",
        title: "Numbers",
        description: "Text include numbers"
    },
    {
        tag: "symbols",
        title: "Symbols",
        description: "Text contains punctuation and symbols"
    },
]

