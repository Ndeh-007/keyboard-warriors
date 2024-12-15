import { FromToFilterData } from "./components";

export interface User {
    id: string;
    username: string;
    email: string;
    paylink: string;
    paypalEmail?: string;
}

export type ChallengeState = "live" | "neutral" | "completed" | "flagged"

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
}

export interface ChallengeOption {
    tag: string;
    title: string | number;
    description?: string;
}


export interface OperationSettings {
    minChallengeCost: number;
    maxChallengeCost: number;
    currency: string;
}

export interface FetchChallengeOptions{
    quantity: number,
    filters: FromToFilterData[],
}