<template>
  <div class="commend">
    <p v-if="type === 'title'">
      {{ caption || callouts[0] }}
    </p>
    <template v-else>
      <div class="left-con">
        <div class="commend-image-con">
          <img class="commend-image" :title="caption" :alt="caption" :src="src">
          <div class="commend-image-name">
            {{ caption }}
          </div>
        </div>
        <details v-if="tags" class="tag-con" open>
          <summary>标签</summary>
          <div v-for="tag in tags" :key="tag" class="tag">
            {{ tag }}
          </div>
        </details>
      </div>
      <div class="right-con">
        <div v-for="callout in callouts" :key="callout" class="callout-con">
          <div v-if="type !== 'min'" class="callout-icon">
            💡
          </div>
          <div class="callout-line">
            <div v-for="line in splitCallout(callout)" :key="line" class="callout">
              {{ line }}
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

defineProps({
  type: String,
  src: String,
  caption: String,
  tags: Array,
  callouts: Array
})

const splitCallout = (callout) => callout.split('\n')

onMounted(() => {
  // Lifecycle hooks or any other composition API related code can be added here.
})
</script>

<style lang="scss" scoped>
.commend {
  display: grid;
  grid-template: auto / 32fr minmax(0, 68fr);
  gap: 1em;
  color: #37352f;
}
.left-con {
  padding-top:12px;
  padding-bottom:12px;
  flex-grow:0;
  flex-shrink:0;

  .commend-image-con {
    margin-bottom: 1em;

    .commend-image {
      margin-top: 0.1em;
      border: solid 1px #4a1227;
      display:block;
      min-height: 10em;
    }
    .commend-image-name {
      margin: .5em 0;
      word-break:break-word;
      color:rgba(55,53,47,0.6);
    }
  }
  .tag-con {
    font-size: 1rem;

    .tag {
      padding-left: 1em;
    }
  }
}
.right-con {
  padding-top:12px;
  padding-bottom:12px;
  flex-grow:0;
  flex-shrink:0;

  .callout-con {
    display: flex;
    margin-bottom: .8em;
    padding: .8em 1em;
    background: rgba(235,236,237,0.3);
    border-radius: 4px;

    .callout-icon {
      margin-top: .1em;
      margin-right: .7em;
    }
    .callout {
      margin-bottom: .1em;
      min-height: .5em;
      line-height: 1.75;
      word-break: break-word;
    }
  }
}

html.dark {
  .callout-con {
    background: rgba(0,0,0,0.24);
    color: var(--tw-prose-invert-counters);
  }
  details, .commend-image-con .commend-image-name {
    color: rgba(255,255,255,0.6);
  }
}

@media (max-width: 419px) {
  .commend {
    display: grid;
    // grid-template: auto auto / minmax(0, 1fr);
  }
  .left-con,
  .right-con {
    width: unset;
  }
}
</style>
