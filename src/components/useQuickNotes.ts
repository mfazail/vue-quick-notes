import { ref } from "vue";

let text = ref("");
let open = ref(false);

export default function useQuickNotes() {
    return { text, open };
}
