<template>
    <div class="commend">
        <p v-if="type === 'title'">{{ caption || callouts[0] }}</p>
        <template v-else>
            <div class="left-con">
                <div class="commend-image-con">
                    <img class="commend-image" :title="caption" :alt="caption" :src="src" style="" />
                    <div class="commend-image-name">{{ caption }}</div>
                </div>
                <details v-if="tags" class="tag-con" open>
                    <summary>标签</summary>
                    <template v-for="tag in tags">
                        <div class="tag">{{ tag }}</div>
                    </template>
                </details>
            </div>
            <div class="gap" />
            <div class="right-con">
                <div v-for="callout in callouts" :key="callout" class="callout-con">
                    <div v-if="type !== 'min'" class="callout-icon">💡</div>
                    <div class="callout-line">
                        <div v-for="line in callout.split('\n')" class="callout">
                            {{ line }}
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    name: 'commend-cmpt',
    props: {
        type: String,
        src: String,
        caption: String,
        tags: Array,
        callouts: Array
    },
    mounted() {},
    methods: {}
}
</script>

<style lang="stylus" scoped>
.commend {
  position: relative;
  display:flex;
  color:#37352f;
}
.left-con {
  padding-top:12px;
  padding-bottom:12px;
  flex-grow:0;
  flex-shrink:0;
  width:calc((100% - 46px) * 0.3125);

  .commend-image-con {
    margin-bottom: 1em

    .commend-image {
      border: solid 1px #4a1227;
      display:block;
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
.gap {
  width:46px;
}
.right-con {
  padding-top:12px;
  padding-bottom:12px;
  flex-grow:0;
  flex-shrink:0;
  width:calc((100% - 46px) * 0.6875);

  .callout-con {
    display: flex;
    margin-bottom: .8em;
    padding: .8em 1em;
    background: rgba(235,236,237,0.3);

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


@media (max-width: $MQMobileNarrow) {
  .commend {
    flex-direction:column;
  }
  .left-con, .right-con {
    width: unset;
  }
}
</style>
