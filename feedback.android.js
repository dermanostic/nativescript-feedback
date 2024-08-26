"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feedback = exports.FeedbackPosition = exports.FeedbackType = void 0;
const feedback_common_1 = require("./feedback.common");
Object.defineProperty(exports, "FeedbackType", { enumerable: true, get: function () { return feedback_common_1.FeedbackType; } });
Object.defineProperty(exports, "FeedbackPosition", { enumerable: true, get: function () { return feedback_common_1.FeedbackPosition; } });
const core_1 = require("@nativescript/core");
class Feedback extends feedback_common_1.FeedbackCommon {
    constructor() {
        super(...arguments);
        this.lastAlert = null;
    }
    show(options) {
        return new Promise((resolve, reject) => {
            this.lastAlert = null;
            let alerter = com.tapadoo.alerter.Alerter.create(core_1.Application.android.foregroundActivity)
                .setLayoutGravity(Feedback.getPosition(options.position))
                .setIconColorFilter(0)
                .setDuration(options.duration ? options.duration : 4000);
            if (options.title) {
                alerter.setTitle(options.title);
            }
            if (options.message) {
                alerter.setText(options.message);
            }
            if (options.icon) {
                let resourceId = Feedback.getIconResourceId(options.icon);
                if (resourceId === 0) {
                    console.log(`icon '${options.icon}' resource not found`);
                }
                else {
                    alerter.setIcon(resourceId);
                }
            }
            else {
                let resourcename = Feedback.getIconName(options.type);
                if (resourcename !== null) {
                    alerter.setIcon(Feedback.getIconResourceId(resourcename));
                }
                else {
                    alerter.showIcon(false);
                }
            }
            if (options.android && options.android.iconPulseEnabled !== undefined) {
                alerter.enableIconPulse(options.android.iconPulseEnabled);
            }
            if (options.titleFont) {
                const assetManger = core_1.Utils.ad.getApplicationContext().getAssets();
                const fontPath = `app/fonts/${options.titleFont}`;
                const typeface = android.graphics.Typeface.createFromAsset(assetManger, fontPath);
                alerter.setTitleTypeface(typeface);
            }
            if (options.messageFont) {
                const assetManger = core_1.Utils.ad.getApplicationContext().getAssets();
                const fontPath = `app/fonts/${options.messageFont}`;
                const typeface = android.graphics.Typeface.createFromAsset(assetManger, fontPath);
                alerter.setTextTypeface(typeface);
            }
            alerter.setOnClickListener(new android.view.View.OnClickListener({
                onClick: (view => {
                    com.tapadoo.alerter.Alerter.hide();
                    if (options.onTap) {
                        options.onTap();
                    }
                })
            }));
            if (options.onShow) {
                alerter.setOnShowListener(new com.tapadoo.alerter.OnShowAlertListener({
                    onShow: () => options.onShow(),
                }));
            }
            if (options.onHide) {
                alerter.setOnHideListener(new com.tapadoo.alerter.OnHideAlertListener({
                    onHide: () => options.onHide(),
                }));
            }
            this.lastAlert = alerter.show();
            if (options.backgroundColor) {
                this.lastAlert.setAlertBackgroundColor(options.backgroundColor.android);
            }
            else {
                this.lastAlert.setAlertBackgroundColor(Feedback.getBackgroundColor(options.type).android);
            }
            if (options.titleColor) {
                let titleView = this.lastAlert.getTitle();
                titleView.setTextColor(options.titleColor.android);
            }
            if (options.messageColor) {
                let messageView = this.lastAlert.getText();
                messageView.setTextColor(options.messageColor.android);
            }
            const titleSize = options.titleSize || 16;
            const messageSize = options.messageSize || 13;
            this.lastAlert.getTitle().setTextSize(titleSize);
            this.lastAlert.getText().setTextSize(messageSize);
            if (options.android && options.android.iconColor) {
                alerter.setIconColorFilter(options.android.iconColor.android);
            }
            resolve();
        });
    }
    static getBackgroundColor(type) {
        if (type === undefined || type === null || type === feedback_common_1.FeedbackType.Custom) {
            return new core_1.Color("#73b7e8");
        }
        else if (type === feedback_common_1.FeedbackType.Warning) {
            return new core_1.Color("#f18b34");
        }
        else if (type === feedback_common_1.FeedbackType.Error) {
            return new core_1.Color("#ee664c");
        }
        else if (type === feedback_common_1.FeedbackType.Info) {
            return new core_1.Color("#516a78");
        }
        else {
            return new core_1.Color("#51ae8c");
        }
    }
    static getIconResourceId(resourcename) {
        let res = core_1.Utils.ad.getApplicationContext().getResources();
        return res.getIdentifier(resourcename, "drawable", core_1.Utils.ad.getApplication().getPackageName());
    }
    static getIconName(type) {
        if (type === undefined || type === null || type === feedback_common_1.FeedbackType.Custom) {
            return null;
        }
        else if (type === feedback_common_1.FeedbackType.Warning) {
            return "warningicon";
        }
        else if (type === feedback_common_1.FeedbackType.Error) {
            return "erroricon";
        }
        else if (type === feedback_common_1.FeedbackType.Info) {
            return "infoicon";
        }
        else {
            return "successicon";
        }
    }
    static getPosition(position) {
        if (!position || position === feedback_common_1.FeedbackPosition.Top) {
            return android.view.Gravity.TOP;
        }
        else {
            return android.view.Gravity.BOTTOM;
        }
    }
    hide(options) {
        return new Promise((resolve) => {
            if (com.tapadoo.alerter.Alerter.isShowing()) {
                com.tapadoo.alerter.Alerter.hide();
                this.lastAlert = null;
            }
            resolve();
        });
    }
}
exports.Feedback = Feedback;
