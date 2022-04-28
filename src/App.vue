<script setup lang="ts">
import { onMounted, ref } from "vue";
import { VueQuickNotes } from "vue-quick-notes";
import "vue-quick-notes/dist/style.css";

let mode = ref(false);
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
    <div class="h-screen w-full flex justify-center items-center">
        <button
            @click="toggleMode"
            class="bg-blue-500 text-white px-3 py-1 rounded-md transition-all duration-300 focus:outline-none active:outline-none"
        >
            {{ mode ? "Dark" : "Light" }}
        </button>
    </div>
    <VueQuickNotes
        label="Quick notes"
        parent-class="bg-white dark:bg-gray-800 dark:text-white"
        class="dark:bg-gray-900 dark:border-gray-900"
    />
</template>
