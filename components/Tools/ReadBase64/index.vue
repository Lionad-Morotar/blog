<template>
  <div ref="reader" class="fullscreen flex-center" :style="{ boxShadow: active ? 'inset 0 0 15px 3px #8a8a8a' : '' }">
    <div v-if="contents" class="fullscreen breakall scrollable">
      {{ contents }}
    </div>
    <svg v-else t="1632406200683" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2070" width="200" height="200"><path d="M682.666667 554.666667l297.130666 173.312-126.848 36.266666 90.666667 157.056-73.898667 42.666667-90.666666-157.013333-94.848 91.733333L682.666667 554.666667z m-85.333334-298.666667h85.333334v85.333333h213.333333a42.666667 42.666667 0 0 1 42.666667 42.666667v170.666667h-85.333334v-128H426.666667v426.666666h170.666666v85.333334H384a42.666667 42.666667 0 0 1-42.666667-42.666667v-213.333333H256v-85.333334h85.333333V384a42.666667 42.666667 0 0 1 42.666667-42.666667h213.333333V256zM170.666667 597.333333v85.333334H85.333333v-85.333334h85.333334z m0-170.666666v85.333333H85.333333v-85.333333h85.333334z m0-170.666667v85.333333H85.333333V256h85.333334z m0-170.666667v85.333334H85.333333V85.333333h85.333334z m170.666666 0v85.333334H256V85.333333h85.333333z m170.666667 0v85.333334h-85.333333V85.333333h85.333333z m170.666667 0v85.333334h-85.333334V85.333333h85.333334z" p-id="2071" fill="#8a8a8a" /></svg>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const reader = ref(null)
const active = ref(false)
const contents = ref('')

const preventDefaults = (evt) => {
  evt.preventDefault()
}

const updateActive = (newActive) => {
  active.value = newActive
}

const handleDrop = (dropEvt) => {
  if (!contents.value) {
    const files = dropEvt.dataTransfer.files
    const reader = new FileReader()
    reader.onload = evt => {
      contents.value = evt.target.result
    }
    if (files.length === 1) {
      reader.readAsDataURL(files[0])
    } else {
      alert('不支持多个文件')
    }
    dropEvt.preventDefault()
  }
}

onMounted(() => {
  reader.value.addEventListener('dragenter', preventDefaults)
  reader.value.addEventListener('dragenter', () => updateActive(true))
  reader.value.addEventListener('dragover', preventDefaults)
  reader.value.addEventListener('dragleave', preventDefaults)
  reader.value.addEventListener('dragleave', () => updateActive(false))
  reader.value.addEventListener('drop', handleDrop)
})

onBeforeUnmount(() => {
  reader.value.removeEventListener('dragenter', preventDefaults)
  reader.value.removeEventListener('dragenter', () => updateActive(true))
  reader.value.removeEventListener('dragover', preventDefaults)
  reader.value.removeEventListener('dragleave', preventDefaults)
  reader.value.removeEventListener('dragleave', () => updateActive(false))
  reader.value.removeEventListener('drop', handleDrop)
})
</script>
