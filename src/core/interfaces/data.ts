import { FromToFilterData } from "./components";

export interface User {
    id: string;
    username: string;
    email: string;
    paylink: string;
    paypalEmail?: string;
}

export type ChallengeState = "live" | "neutral" | "completed" | "flagged"

export type ChallengeType = "number" | "text" | "punctuation"

export interface Challenge {
    date: number;
    cost: number;
    duration: number;
    wpm: number;
    earnings: number;
    accuracy: number;
    consistency: number;
    errorcount: number;
    challenger_id: string;
    issuedBy_id: string;
    id: string;
    state: string;
    isVisibile: boolean;
    language: string;
    characters: string
}

export interface ChallengeOption {
    tag: number | string;
    title: string | number;
    description?: string;
    index: number;
}


export interface OperationSettings {
    minChallengeCost: number;
    maxChallengeCost: number;
    currency: string;
    refundPercent: number;
    earningsMultiplier: number
}

export interface FetchChallengeOptions{
    quantity: number,
    filters: FromToFilterData[],
    pool: "user" | "active"
}