declare const _default: import("vue").DefineComponent<{
    x: NumberConstructor;
    y: NumberConstructor;
    modelValue: {
        type: StringConstructor;
        default: string;
    };
    label: StringConstructor;
    zIndex: {
        type: StringConstructor;
        default: string;
    };
    lang: {
        type: StringConstructor;
        default: string;
    };
    parentClass: StringConstructor;
    buttonClass: StringConstructor;
    rows: {
        type: StringConstructor;
        default: string;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    x: NumberConstructor;
    y: NumberConstructor;
    modelValue: {
        type: StringConstructor;
        default: string;
    };
    label: StringConstructor;
    zIndex: {
        type: StringConstructor;
        default: string;
    };
    lang: {
        type: StringConstructor;
        default: string;
    };
    parentClass: StringConstructor;
    buttonClass: StringConstructor;
    rows: {
        type: StringConstructor;
        default: string;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    modelValue: string;
    zIndex: string;
    lang: string;
    rows: string;
}>;
export default _default;
