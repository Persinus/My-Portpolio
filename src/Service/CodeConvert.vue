<template>
  <div class="relative bg-[#282a36] rounded-lg my-4 shadow overflow-x-auto border border-[#44475a]">
    <button
      class="absolute top-2 right-2 bg-[#44475a] hover:bg-[#ffb86c] hover:text-[#282a36] text-[#f8f8f2] px-3 py-1 rounded text-xs transition"
      @click="copyCode"
    >
      {{ copied ? 'Đã copy!' : 'Copy' }}
    </button>
    <pre class="m-0 p-4 text-sm leading-normal font-mono bg-transparent">
      <code ref="codeBlock" :class="`language-${lang}`"></code>
    </pre>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import xml from 'highlight.js/lib/languages/xml'
import 'highlight.js/styles/atom-one-dark.css'
// hoặc thử các theme khác như 'github-dark.css', 'monokai-sublime.css'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('xml', xml)

const props = defineProps({
  code: { type: String, required: true },
  lang: { type: String, default: 'javascript' } // hoặc 'xml', 'html', 'csharp', ...
})

const copied = ref(false)
const codeBlock = ref(null)

function copyCode() {
  navigator.clipboard.writeText(props.code)
  copied.value = true
  setTimeout(() => (copied.value = false), 1200)
}

function highlight() {
  if (codeBlock.value) {
    codeBlock.value.textContent = props.code
    hljs.highlightElement(codeBlock.value)
  }
}

onMounted(highlight)
watch(() => props.code, highlight)
watch(() => props.lang, highlight)
</script>

<style scoped>
/* Có thể custom thêm nếu muốn */
</style>