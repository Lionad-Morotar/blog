<template>
  <div class="commend notion-body">
    <div
      class="notion-page-content"
      style="flex-shrink:0;flex-grow:1;;display:flex;align-items:center;flex-direction:column;color:#37352f;"
    >
      <div class="layout" style="display:flex">
        <div class="left-con">
          <div style="display:flex;flex-direction:column">
            <div
              style="width:100%;;align-self:flex-start;margin-top:2px;margin-bottom:.5em"
            >
              <div>
                <div style="display:flex">
                  <div
                    class="notion-cursor-default"
                    style="position:relative;overflow:hidden;flex-grow:1"
                  >
                    <div style="position:relative;cursor:pointer">
                      <div style="height:100%;width:100%">
                        <img
                          :src="src"
                          style="display:block;object-fit:cover;border-radius:1px;width:100%;pointer-events:auto"
                        />
                      </div>
                    </div>
                    <div
                      class="notion-block-resizer"
                      style="display:block;height:100%"
                    >
                      <div
                        style="position:absolute;pointer-events:none;display:flex;align-items:center;justify-content:center;right:0px;top:0px;z-index:1;height:100%;width:15px;cursor:col-resize"
                      >
                        <div
                          style="opacity:0;transition:opacity 300ms ease-in 0s;border-radius:20px;background:rgba(15,15,15,0.6);border:1px solid rgba(255,255,255,0.9);width:6px;max-height:50%"
                        ></div>
                      </div>
                    </div>
                    <div
                      style='position:absolute;top:4px;right:4px;border-radius:3px;color:white;fill:white;background:rgba(0,0,0,0.6);display:flex;white-space:nowrap;;overflow:hidden;pointer-events:none;opacity:0;transition:opacity 300ms ease-in 0s;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";z-index:2'
                    >
                      <div
                        role="button"
                        style="user-select:none;transition:background 120ms ease-in 0s;cursor:pointer;display:flex;align-items:center;padding:4px 6px;border-right:1px solid rgba(255,255,255,0.2)"
                      >
                        <svg
                          viewBox="0 0 14 14"
                          class="speechBubble"
                          style="width:12px;display:block;fill:white;flex-shrink:0;backface-visibility:hidden;margin-right:0px"
                        >
                          <path
                            d="M0.913134,0.920639 C1.49851,0.331726 2.29348,0 3.12342,0 L10.8766,0 C11.7065,0 12.5015,0.331725 13.0869,0.920639 C13.6721,1.50939 14,2.30689 14,3.13746 L14,7.62943 C13.9962,8.01443 13.9059,8.47125 13.7629,8.82852 C13.6128,9.183 13.3552,9.57088 13.0869,9.84625 C12.813,10.1163 12.4265,10.3761 12.0734,10.5274 C11.7172,10.6716 11.2607,10.763 10.8766,10.7669 L10.1234,10.7669 L10.1234,12.5676 L10.1209,12.5676 C10.1204,12.793 10.0633,13.0792 9.97807,13.262 C9.8627,13.466 9.61158,13.7198 9.40818,13.8382 L9.40662,13.8391 L9.40539,13.8398 C9.22962,13.9255 8.94505,13.9951 8.75059,14 L8.74789,14 C8.35724,13.9963 7.98473,13.8383 7.71035,13.5617 L5.39553,10.7669 L3.12342,10.7669 C2.29348,10.7669 1.49851,10.4352 0.913134,9.84625 C0.644826,9.57089 0.387187,9.183 0.23711,8.82852 C0.0941235,8.47125 0.00379528,8.01443 0,7.62943 L0,3.13746 C0,2.30689 0.327915,1.50939 0.913134,0.920639 Z M3.12342,1.59494 C2.71959,1.59494 2.33133,1.75628 2.04431,2.04503 C1.75713,2.33395 1.59494,2.72681 1.59494,3.13746 L1.59494,7.62943 C1.59114,7.85901 1.62114,8.01076 1.71193,8.22129 C1.79563,8.4346 1.88065,8.56264 2.04431,8.72185 C2.33133,9.01061 2.71959,9.17195 3.12342,9.17195 L5.72383,9.17195 C5.93413,9.17195 6.13592,9.25502 6.28527,9.40308 L8.52848,12.1269 L8.52848,9.96942 C8.52848,9.52899 8.88552,9.17195 9.32595,9.17195 L10.8766,9.17195 C11.1034,9.17583 11.2517,9.14614 11.4599,9.05518 C11.6712,8.97132 11.7976,8.88635 11.9557,8.72185 C12.1193,8.56264 12.2044,8.4346 12.2881,8.22129 C12.3789,8.01076 12.4089,7.85901 12.4051,7.62943 L12.4051,3.13746 C12.4051,2.72681 12.2429,2.33394 11.9557,2.04503 C11.6687,1.75628 11.2804,1.59494 10.8766,1.59494 L3.12342,1.59494 Z"
                          ></path>
                        </svg>
                      </div>

                      <div
                        role="button"
                        style="user-select:none;transition:background 120ms ease-in 0s;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;width:24px;border-radius:3px;fill:rgba(55,53,47,0.4)"
                      >
                        <svg
                          viewBox="0 0 13 3"
                          class="dots"
                          style="width:14px;display:block;fill:white;flex-shrink:0;backface-visibility:hidden"
                        >
                          <g>
                            <path
                              d="M3,1.5A1.5,1.5,0,1,1,1.5,0,1.5,1.5,0,0,1,3,1.5Z"
                            ></path>
                            <path
                              d="M8,1.5A1.5,1.5,0,1,1,6.5,0,1.5,1.5,0,0,1,8,1.5Z"
                            ></path>
                            <path
                              d="M13,1.5A1.5,1.5,0,1,1,11.5,0,1.5,1.5,0,0,1,13,1.5Z"
                            ></path>
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style=";width:100%;word-break:break-word;caret-color:#37352f;color:rgba(55,53,47,0.6);padding-top:6px;padding-bottom:6px;padding-left:2px"
                >
                  {{ caption }}
                </div>
              </div>
            </div>
            <div style="width:100%;;margin-top:1px;margin-bottom:0px">
              <div
                style="display:flex;align-items:flex-start;width:100%;padding-left:2px;color:inherit;fill:inherit"
              >
                <div
                  style="margin-right:4px;width:24px;display:flex;align-items:center;justify-content:center;flex-grow:0;flex-shrink:0;min-height:calc((1.5em + 3px) + 3px);padding-right:2px"
                >
                  <div
                    role="button"
                    style="user-select:none;transition:background 120ms ease-in 0s;cursor:pointer;display:flex;align-items:center;justify-content:center;width:24px;border-radius:3px"
                  >
                    <svg
                      viewBox="0 0 100 100"
                      class="triangle"
                      style="width:.6875em;height:.6875em;display:block;fill:inherit;flex-shrink:0;backface-visibility:hidden;transition:transform 200ms ease-out 0s;transform:rotateZ(180deg)"
                    >
                      <polygon points="5.9,88.2 50,11.8 94.1,88.2 "></polygon>
                    </svg>
                  </div>
                </div>
                <div style="flex:1 1 0px;min-width:1px">
                  <div style="display:flex">
                    <div
                      style=";width:100%;word-break:break-word;caret-color:#37352f;padding-top:3px;padding-bottom:3px;text-align:left"
                    >
                      标签
                    </div>
                  </div>
                  <div>
                    <div style="display:flex;flex-direction:column">
                      <div
                        v-for="tag in tags"
                        :key="tag"
                        style="width:100%;;margin-top:2px;margin-bottom:1px"
                      >
                        <div>
                          <div style="display:flex">
                            <div
                              style=";width:100%;word-break:break-word;caret-color:#37352f;padding:3px 2px"
                            >
                              {{ tag }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style="position:relative;width:46px;flex-grow:0;flex-shrink:0;transition:opacity 200ms ease-out 0s;opacity:0"
        ></div>
        <div class="right-con">
          <div style="display:flex;flex-direction:column">
            <div
              v-for="callout in callouts"
              :key="callout"
              style="width:100%;;margin-top:2px;margin-bottom:4px"
            >
              <div style="display:flex">
                <div
                  style="padding:16px 16px 16px 12px;display:flex;width:100%;border-radius:3px;border-width:1px;border-style:solid;border-color:transparent;background:rgba(235,236,237,0.3)"
                >
                  <div>
                    <div
                      class="notion-record-icon"
                      role="button"
                      aria-disabled="false"
                      style="user-select:none;transition:background 120ms ease-in 0s;cursor:pointer;display:flex;align-items:center;justify-content:center;width:24px;border-radius:3px;flex-shrink:0"
                    >
                      <div
                        style="display:flex;align-items:center;justify-content:center;width:24px"
                      >
                        <div style="width:16.8px;margin-left:0px;color:black">
                          💡
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    style="line-height: 1.75;width:100%;word-break:break-word;caret-color:#37352f;margin-left:8px"
                  >
                    <div v-for="line in callout.split('\n')" class="callout">
                      {{ line }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'commend-cmpt',
  props: {
    src: String,
    caption: String,
    tags: Array,
    callouts: Array
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="stylus">
@import './styles/config.styl';

.notion-cursor-default {
  cursor: default;
}
@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
html.notion-html,
.notion-body,
#notion-app {
  position: relative;
}
.notion-app-inner {
  height: 100%;
}
[contenteditable]:empty:before {
  content: attr(placeholder);
  display: block;
}
@-webkit-keyframes rotate {
  0% {
    -webkit-transform: rotate(0deg) translateZ(0);
    transform: rotate(0deg) translateZ(0);
  }
  100% {
    -webkit-transform: rotate(360deg) translateZ(0);
    transform: rotate(360deg) translateZ(0);
  }
}
@keyframes rotate {
  0% {
    -webkit-transform: rotate(0deg) translateZ(0);
    transform: rotate(0deg) translateZ(0);
  }
  100% {
    -webkit-transform: rotate(360deg) translateZ(0);
    transform: rotate(360deg) translateZ(0);
  }
}
html {
  font-family: sans-serif;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}
img {
  border: 0;
}
svg:not(:root) {
  overflow: hidden;
}
*,
*:focus {
  outline: 0;
}
* {
  box-sizing: border-box;
}
::-webkit-input-placeholder {
  color: inherit;
  opacity: 0.375;
}
::-webkit-contacts-auto-fill-button {
  visibility: hidden;
  display: none !important;
  pointer-events: none;
  position: absolute;
  right: 0;
}
*::selection {
  background: rgba(45, 170, 219, 0.3);
}
[contenteditable] {
  -webkit-tap-highlight-color: transparent;
}
@keyframes pulse-ring {
  0% {
    transform: scale(0.33);
  }
  80%,
  100% {
    opacity: 0;
  }
}
@keyframes pulse-dot {
  0% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.8);
  }
}
@keyframes bounce-left {
  0% {
    transform: translateX(-200%);
  }
  25% {
    transform: translateX(-199%);
  }
  100% {
    transform: translateX(0%);
  }
}
@keyframes pulsing-button-border {
  0% {
    border-color: rgba(46, 170, 220, 1);
  }
  50% {
    border-color: rgba(46, 170, 220, 0);
  }
  100% {
    border-color: rgba(46, 170, 220, 1);
  }
}
@keyframes pulsing-button {
  0% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.15);
  }
  100% {
    filter: brightness(1);
  }
}

/** CSS */

.left-con {
  padding-top:12px;
  padding-bottom:12px;
  flex-grow:0;
  flex-shrink:0;
  width:calc((100% - 46px) * 0.3125);
}
.right-con {
  padding-top:12px;
  padding-bottom:12px;
  flex-grow:0;
  flex-shrink:0;
  width:calc((100% - 46px) * 0.6875);
}
.callout {
  min-height: .5em;
}

@media (max-width: $MQMobileNarrow) {
  .layout {
    display flex
    flex-direction column
  }
  .left-con, .right-con {
    width: unset;
  }
}
</style>
