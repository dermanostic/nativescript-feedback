import { Color } from "@nativescript/core";
export declare enum FeedbackPosition {
    Top = 0,
    Bottom = 1
}
export declare enum FeedbackType {
    Success = 0,
    Error = 1,
    Warning = 2,
    Info = 3,
    Custom = 4
}
export interface FeedbackShowOptions {
    title?: string;
    titleSize?: number;
    titleColor?: Color;
    message?: string;
    messageSize?: number;
    messageColor?: Color;
    duration?: number;
    type?: FeedbackType;
    position?: FeedbackPosition;
    backgroundColor?: Color;
    icon?: string;
    onTap?: () => void;
    onHide?: () => void;
    onShow?: (animating?: boolean) => void;
    titleFont?: string;
    messageFont?: string;
    android?: {
        iconColor?: Color;
        iconPulseEnabled?: boolean;
    };
}
export interface FeedbackHideOptions {
}
export interface FeedbackApi {
    show(options: FeedbackShowOptions): Promise<void>;
    hide(options?: FeedbackHideOptions): Promise<void>;
    success(options: FeedbackShowOptions): Promise<void>;
    warning(options: FeedbackShowOptions): Promise<void>;
    error(options: FeedbackShowOptions): Promise<void>;
    info(options: FeedbackShowOptions): Promise<void>;
}
export declare abstract class FeedbackCommon implements FeedbackApi {
    abstract show(options: FeedbackShowOptions): Promise<void>;
    abstract hide(options?: FeedbackHideOptions): Promise<void>;
    success(options: FeedbackShowOptions): Promise<void>;
    warning(options: FeedbackShowOptions): Promise<void>;
    error(options: FeedbackShowOptions): Promise<void>;
    info(options: FeedbackShowOptions): Promise<void>;
}
