<script lang="ts">
export default {
    inheritAttrs: false,
};
</script>
<script lang="ts" setup>
import { computed, onMounted, ref, watch } from "vue";
import useQuickNotes from "./useQuickNotes";
import {
    useDraggable,
    useClipboard,
    useSpeechRecognition,
    useWindowSize,
    useMagicKeys,
} from "@vueuse/core";

let props = defineProps({
    x: Number,
    y: Number,
    modelValue: {
        type: String,
        default: "",
    },
    label: String,
    zIndex: {
        type: String,
        default: '20',
    },
    lang: {
        type: String,
        default: "en-US",
    },
    parentClass: String,
    buttonClass: String,
	rows:{
		type:String,
		default:'5'
	}
});

let text = useQuickNotes()

onMounted(() => {
    text.value = props.modelValue;
});

let emit = defineEmits(["update:modelValue"]);

const dragger = ref<HTMLElement | null>(null);

const _position = computed(() => {
    let _x = width.value - 350;
    let _y = height.value - 250;
    return {
        x: props.x ? props.x : _x,
        y: props.y ? props.y : _y,
    };
});

const _source = ref(props.modelValue);

const { width, height } = useWindowSize();

const { style } = useDraggable(dragger, {
    initialValue: { x: _position.value.x, y: _position.value.y },
    stopPropagation: true,
});

const { ctrl_alt_k } = useMagicKeys();

const {
    copy,
    copied,
    isSupported: cIsSupported,
} = useClipboard({
    source: _source,
});

const { isListening, start, stop, result, isSupported, error } =
    useSpeechRecognition({
        lang: props.lang,
        interimResults: false,
        continuous: false,
    });

let open = ref<boolean>(true);

let _style = computed<string>(() => {
    return `${style.value}  z-index:${props.zIndex};`;
});

let _id = computed<string>(() => {
    return Math.random().toString(36).substring(7);
});

const handleInput = (e: Event) => {
    const v = (e.target as HTMLInputElement).value;
    _source.value = v;
    emitInput(v);
};

const emitInput = (v: string) => {
    text.value = v;
    emit("update:modelValue", v);
};

if (isSupported)
    watch(result, (v) => {
        _source.value += (_source.value == "" ? "" : " ") + v;
        emitInput(_source.value);
    });

watch(ctrl_alt_k, (v) => {
    if (v) open.value = true;
});
</script>

<template>
    <div
        ref="parent"
        :style="_style"
        v-show="open"
        :class="parentClass"
        style="min-height: 40px; min-width: 300px"
        class="fixed rounded-md shadow-md p-3 space-y-2"
    >
        <div
            ref="dragger"
            class="flex items-center justify-between cursor-pointer"
        >
            <label :for="_id" class="font-medium">{{ label }}</label>
            <div class="flex space-x-2">
                <svg
                    @click="copy()"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    />
                </svg>
                <svg
                    @click.stop="open = !open"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 cursor-pointer"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                    />
                </svg>
            </div>
        </div>

        <textarea
            :id="_id"
            v-bind="$attrs"
            type="text"
            :value="_source"
            @input="handleInput"
			:rows="rows"
            class="form-textarea w-full h-full rounded-md focus:outline-none border border-blue-200"
        />
        <button
            @click="isListening ? stop() : start()"
            :class="[
                isListening ? 'animate-bounce' : '',
                !cIsSupported || !isSupported || copied || error
                    ? 'bottom-14'
                    : '',
                buttonClass,
            ]"
            class="absolute bottom-7 right-6 rounded-full p-2 cursor-pointer bg-blue-500 text-white"
        >
            <svg
                v-show="!isListening"
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
            </svg>
            <svg
                v-show="isListening"
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
                    clip-rule="evenodd"
                />
            </svg>
        </button>

        <div v-if="!cIsSupported" class="text-red-500 text-sm">
            Clipboard Coping not supported or permission denid
        </div>
        <div v-if="!isSupported" class="text-red-500 text-sm">
            Speech Recognition is not supported or permission denid
        </div>
        <div v-if="copied" class="text-green-500 text-sm">
            Copied Successfully
        </div>
        <div v-if="error" class="text-red-500 text-sm">
            {{ error.error +': '+ error.message }}
        </div>
    </div>
</template>
