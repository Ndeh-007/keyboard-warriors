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
    title: string;
    pid: string;
    onEntryChanged: (opt: any) => any;
}

export interface FromToFilterData {
    pid: string;
    from: number | undefined;
    to: number | undefined;
    text?: string
}

export interface FromToFilterBar{
    id: string,
    value: string
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

export interface InlineAlertOptions {
    color: "primary" | "success" | "danger" | "warning",
    text: string,
    open: boolean
}