"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackCommon = exports.FeedbackType = exports.FeedbackPosition = void 0;
var FeedbackPosition;
(function (FeedbackPosition) {
    FeedbackPosition[FeedbackPosition["Top"] = 0] = "Top";
    FeedbackPosition[FeedbackPosition["Bottom"] = 1] = "Bottom";
})(FeedbackPosition = exports.FeedbackPosition || (exports.FeedbackPosition = {}));
var FeedbackType;
(function (FeedbackType) {
    FeedbackType[FeedbackType["Success"] = 0] = "Success";
    FeedbackType[FeedbackType["Error"] = 1] = "Error";
    FeedbackType[FeedbackType["Warning"] = 2] = "Warning";
    FeedbackType[FeedbackType["Info"] = 3] = "Info";
    FeedbackType[FeedbackType["Custom"] = 4] = "Custom";
})(FeedbackType = exports.FeedbackType || (exports.FeedbackType = {}));
class FeedbackCommon {
    success(options) {
        options.type = FeedbackType.Success;
        return this.show(options);
    }
    warning(options) {
        options.type = FeedbackType.Warning;
        return this.show(options);
    }
    error(options) {
        options.type = FeedbackType.Error;
        return this.show(options);
    }
    info(options) {
        options.type = FeedbackType.Info;
        return this.show(options);
    }
}
exports.FeedbackCommon = FeedbackCommon;
