<template>
    <div class="css-pan" :class="{ 'active-pan': isActivePan }" @click="setActivePan('css')" :style="style">
        <div class="pan-head">
            {{ code.name }}
        </div>
        <textarea ref="editor" :value="code.code"></textarea>
        <PanResizer pan="css" :enable="enableResizer" />
    </div>
</template>

<script>
import createPan from './utils/create-pan'

export default createPan({
    name: 'css',
    editor: {
        mode: 'css'
    }
})
</script>
