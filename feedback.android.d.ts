import { FeedbackCommon, FeedbackShowOptions, FeedbackHideOptions, FeedbackType, FeedbackPosition } from "./feedback.common";
export { FeedbackType };
export { FeedbackPosition };
export declare class Feedback extends FeedbackCommon {
    private lastAlert;
    show(options: FeedbackShowOptions): Promise<void>;
    private static getBackgroundColor;
    private static getIconResourceId;
    private static getIconName;
    private static getPosition;
    hide(options?: FeedbackHideOptions): Promise<void>;
}
