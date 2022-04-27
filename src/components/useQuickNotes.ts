import { ref } from "vue"

let text = ref('')

export default function useQuickNotes() {
	return text
}