"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feedback = exports.FeedbackPosition = exports.FeedbackType = void 0;
const feedback_common_1 = require("./feedback.common");
Object.defineProperty(exports, "FeedbackPosition", { enumerable: true, get: function () { return feedback_common_1.FeedbackPosition; } });
Object.defineProperty(exports, "FeedbackType", { enumerable: true, get: function () { return feedback_common_1.FeedbackType; } });
class Feedback extends feedback_common_1.FeedbackCommon {
    show(options) {
        return new Promise((resolve) => {
            let icon = options.icon ? UIImage.imageNamed(options.icon) : null;
            let hideOnSwipe = true;
            let hideOnTap = true;
            let message = ISMessages.cardAlertWithTitleMessageIconImageDurationHideOnSwipeHideOnTapAlertTypeAlertPosition(options.title, options.message, icon, options.duration ? options.duration / 1000 : 4.0, hideOnSwipe, hideOnTap, Feedback.getType(options.type), Feedback.getPosition(options.position));
            if (options.backgroundColor) {
                message.alertViewBackgroundColor = options.backgroundColor.ios;
            }
            if (options.titleColor) {
                message.titleLabelTextColor = options.titleColor.ios;
            }
            const titleSize = options.titleSize || 16;
            const messageSize = options.messageSize || 13;
            if (options.titleFont) {
                message.titleLabelFont = UIFont.fontWithNameSize(options.titleFont, titleSize);
            }
            else {
                message.titleLabelFont = UIFont.boldSystemFontOfSize(titleSize);
            }
            if (options.messageFont) {
                message.messageLabelFont = UIFont.fontWithNameSize(options.messageFont, messageSize);
            }
            else {
                message.messageLabelFont = UIFont.systemFontOfSize(messageSize);
            }
            if (options.messageColor) {
                message.messageLabelTextColor = options.messageColor.ios;
            }
            message.showDidBeginDidHide(() => {
                if (options.onTap) {
                    options.onTap();
                }
            }, (animating) => {
                if (options.onShow) {
                    options.onShow(animating);
                }
            }, (hidden) => {
                if (options.onHide) {
                    options.onHide();
                }
            });
            resolve();
        });
    }
    hide(options) {
        return new Promise((resolve) => {
            ISMessages.hideAlertAnimated(true);
            resolve();
        });
    }
    static getType(type) {
        if (type === undefined || type === null || type === feedback_common_1.FeedbackType.Custom) {
            return ISAlertType.Custom;
        }
        else if (type === feedback_common_1.FeedbackType.Warning) {
            return ISAlertType.Warning;
        }
        else if (type === feedback_common_1.FeedbackType.Error) {
            return ISAlertType.Error;
        }
        else if (type === feedback_common_1.FeedbackType.Info) {
            return ISAlertType.Info;
        }
        else {
            return ISAlertType.Success;
        }
    }
    static getPosition(position) {
        if (!position || position === feedback_common_1.FeedbackPosition.Top) {
            return ISAlertPosition.Top;
        }
        else {
            return ISAlertPosition.Bottom;
        }
    }
}
exports.Feedback = Feedback;
