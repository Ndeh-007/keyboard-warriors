import { FromToFilterGroup } from "../interfaces/components";
import { Challenge, ChallengeOption, OperationSettings, User } from "../interfaces/data";
import UsersJSON from "../data/mock_users.json"
import ChallengesJSON from "../data/challenges.json"

// process the mock data

export const SAMPLE_USERS: User[] = UsersJSON.map((item)=>item.User)
export const SAMPLE_CHALLENGES: Challenge[] = ChallengesJSON.map((item)=>item.Challenge)

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

