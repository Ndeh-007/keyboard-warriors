import React, { ReactNode } from "react";

export interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export type ChallengeCardView = "browse" | "personal" | "delete"

export type AppColors = "primary" | "secondary" | "tertiary" | "danger" | "success" | "dark" | "medium" | "white" | "warning"

export type ChallengeResultsState = "processing" | "failed" | "passed"

export interface FromToFilterGroup {
    title?: string;
    callback?: Function;
    pid?: string;
}

export interface FromToFilterData {
    pid: string;
    from: number | undefined;
    to: number | undefined;
}

export interface TabEntry {
    title: string,
    // index: number,
    component: ReactNode,
}

export interface DialogProps {
    open: boolean,
    onClose: Function,
    onConfirm: Function,
    children?: ReactNode,
    title?: string,
    message?: string,
    showHeader?: boolean,
    showFooter?: boolean,
    color?: AppColors,
    buttons?: {
        cancel: string,
        confirm: string,
    },
}