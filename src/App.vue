<script setup lang="ts">
import { onMounted, ref } from "vue";
import { VueQuickNotes, useQuickNotes } from "vue-quick-notes";
import "vue-quick-notes/dist/style.css";

let { open } = useQuickNotes();
let mode = ref(false);
let outputText = ref("");
onMounted(() => {
    if (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
        mode.value = false;
        document.documentElement.classList.add("dark");
    } else {
        mode.value = true;
        document.documentElement.classList.remove("dark");
    }
});

const toggleMode = () => {
    if (mode.value) {
        mode.value = false;
        localStorage.theme = "dark";
        document.documentElement.classList.add("dark");
    } else {
        localStorage.theme = "light";
        document.documentElement.classList.remove("dark");
        mode.value = true;
    }
};
</script>

<template>
    <div class="h-screen w-full flex flex-col justify-center items-center space-y-3">
        <div class="flex items-center space-x-2">
            <button
                @click="toggleMode"
                class="bg-blue-500 text-white px-3 py-1 rounded-md transition-all duration-300 focus:outline-none active:outline-none"
            >
                {{ mode ? "Dark" : "Light" }}
            </button>
            <button
                @click="open = !open"
                class="bg-blue-500 text-white px-3 py-1 rounded-md transition-all duration-300 focus:outline-none active:outline-none"
            >
                {{ open ? "Close" : "Open" }}
            </button>
        </div>
		<p class="dark:text-white">hint: use <span class="px-2 py-1 font-medium text-gray-600 dark:text-white dark:bg-gray-600 bg-slate-300 rounded-md">ctrl+alt+k</span> to show quick note</p>
        <p class="dark:text-white">{{ outputText }}</p>
    </div>
    <VueQuickNotes
        label="Quick notes"
        v-model="outputText"
        parent-class="bg-white dark:bg-gray-800 dark:text-white"
        class="dark:bg-gray-900 dark:border-gray-900"
    />
</template>
