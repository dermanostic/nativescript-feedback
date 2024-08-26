import { FeedbackCommon, FeedbackShowOptions, FeedbackHideOptions, FeedbackPosition, FeedbackType } from "./feedback.common";
export { FeedbackType };
export { FeedbackPosition };
export declare class Feedback extends FeedbackCommon {
    show(options: FeedbackShowOptions): Promise<void>;
    hide(options?: FeedbackHideOptions): Promise<void>;
    private static getType;
    private static getPosition;
}
