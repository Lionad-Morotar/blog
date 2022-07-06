<template>
  <span class="keyboard-cmpt">
    <span class="raw-keys">{{ rawKeys }}</span>
    <div class="keyboard">
      <div class="line">
        <div class="key" data-content="Esc-`" :class="has('Esc-`')">
          <span>Esc</span>
          <span>`</span>
        </div>
        <template v-if="fnMode">
          <div class="key" data-content="F1" :class="has('F1')">F1</div>
          <div class="key" data-content="F2" :class="has('F2')">F2</div>
          <div class="key" data-content="F3" :class="has('F3')">F3</div>
          <div class="key" data-content="F4" :class="has('F4')">F4</div>
          <div class="key" data-content="F5" :class="has('F5')">F5</div>
          <div class="key" data-content="F6" :class="has('F6')">F6</div>
          <div class="key" data-content="F7" :class="has('F7')">F7</div>
          <div class="key" data-content="F8" :class="has('F8')">F8</div>
          <div class="key" data-content="F9" :class="has('F9')">F9</div>
          <div class="key" data-content="F10" :class="has('F10')">F10</div>
          <div class="key" data-content="F11" :class="has('F11')">F11</div>
          <div class="key" data-content="F12" :class="has('F12')">F12</div>
        </template>
        <template v-else>
          <div class="key" data-content="!-1" :class="has('!-1')">
            <span>!</span>
            <span>1</span>
          </div>
          <div class="key" data-content="@-2" :class="has('@-2')">
            <span>@</span>
            <span>2</span>
          </div>
          <div class="key" data-content="#-3" :class="has('#-3')">
            <span>#</span>
            <span>3</span>
          </div>
          <div class="key" data-content="$-4" :class="has('$-4')">
            <span>$</span>
            <span>4</span>
          </div>
          <div class="key" data-content="%-5" :class="has('%-5')">
            <span>%</span>
            <span>5</span>
          </div>
          <div class="key" data-content="^-6" :class="has('^-6')">
            <span>^</span>
            <span>6</span>
          </div>
          <div class="key" data-content="&-7" :class="has('&-7')">
            <span>&</span>
            <span>7</span>
          </div>
          <div class="key" data-content="*-8" :class="has('*-8')">
            <span>*</span>
            <span>8</span>
          </div>
          <div class="key" data-content="(-9" :class="has('(-9')">
            <span>(</span>
            <span>9</span>
          </div>
          <div class="key" data-content=")-0" :class="has(')-0')">
            <span>)</span>
            <span>0</span>
          </div>
          <div class="key" data-content="_--" :class="has('_--')">
            <span>_</span>
            <span>-</span>
          </div>
          <div class="key" data-content="+-=" :class="has('+-=')">
            <span>+</span>
            <span>=</span>
          </div>
        </template>
        <div class="key" data-content="Backspace" :class="has('Backspace')">Backspace</div>
      </div>

      <div class="line">
        <div class="key" data-content="Tab" :class="has('Tab')">Tab</div>
        <div class="key" data-content="Q" :class="has('Q')">Q</div>
        <div class="key" data-content="W" :class="has('W')">W</div>
        <div class="key" data-content="E" :class="has('E')">E</div>
        <div class="key" data-content="R" :class="has('R')">R</div>
        <div class="key" data-content="T" :class="has('T')">T</div>
        <div class="key" data-content="Y" :class="has('Y')">Y</div>
        <div class="key" data-content="U" :class="has('U')">U</div>
        <div class="key" data-content="I" :class="has('I')">I</div>
        <div class="key" data-content="O" :class="has('O')">O</div>
        <div class="key" data-content="P" :class="has('P')">P</div>
        <div class="key" data-content="{-[" :class="has('{-[')">
          <span>{</span>
          <span>[</span>
        </div>
        <div class="key" data-content="}-]" :class="has('}-]')">
          <span>}</span>
          <span>]</span>
        </div>
        <div class="key" data-content="|-\" :class="has('|-\\')">
          <span>|</span>
          <span>\</span>
        </div>
      </div>

      <div class="line">
        <div class="key" data-content="CapsLock" :class="has('CapsLock')">CapsLock</div>
        <div class="key" data-content="A" :class="has('A')">A</div>
        <div class="key" data-content="S" :class="has('S')">S</div>
        <div class="key" data-content="D" :class="has('D')">D</div>
        <div class="key" data-content="F" :class="has('F')">F</div>
        <div class="key" data-content="G" :class="has('G')">G</div>
        <div class="key" data-content="H" :class="has('H')">H</div>
        <div class="key" data-content="J" :class="has('J')">J</div>
        <div class="key" data-content="K" :class="has('K')">K</div>
        <div class="key" data-content="L" :class="has('L')">L</div>
        <div class="key" data-content=":-;" :class="has(':-;')">
          <span>:</span>
          <span>;</span>
        </div>
        <div class="key" data-content="&quot;-'" :class="has(`&quot;-'`)">
          <span>"</span>
          <span>'</span>
        </div>
        <div class="key" data-content="Enter" :class="has('Enter')">Enter</div>
      </div>

      <div class="line">
        <div class="key" data-content="Shift" :class="has('Shift')">Shift</div>
        <div class="key" data-content="Z" :class="has('Z')">Z</div>
        <div class="key" data-content="X" :class="has('X')">X</div>
        <div class="key" data-content="C" :class="has('C')">C</div>
        <div class="key" data-content="V" :class="has('V')">V</div>
        <div class="key" data-content="B" :class="has('B')">B</div>
        <div class="key" data-content="N" :class="has('N')">N</div>
        <div class="key" data-content="M" :class="has('M')">M</div>
        <div class="key" data-content=";-," :class="has(';-,')">
          <span>&lt;</span>
          <span>,</span>
        </div>
        <div class="key" data-content=";-." :class="has(';-.')">
          <span>&gt;</span>
          <span>.</span>
        </div>
        <div class="key" data-content="?-/" :class="has('?-/')">
          <span>?</span>
          <span>/</span>
        </div>
        <div class="key" data-content="Shift" :class="has('Shift')">Shift</div>
      </div>

      <div class="line">
        <div class="key" data-content="Ctrl" :class="has('Ctrl')">Ctrl</div>
        <div class="key" data-content="Home" :class="has('Home')">Home</div>
        <div class="key" data-content="Alt" :class="has('Alt')">Alt</div>
        <div class="key" data-content="Space" :class="has('Space')">Space</div>
        <div class="key" data-content="Alt" :class="has('Alt')">Alt</div>
        <div class="key" data-content="Home" :class="has('Home')">Home</div>
        <div class="key" data-content="Fn" :class="has('Fn')">Fn</div>
        <div class="key" data-content="Ctrl" :class="has('Ctrl')">Ctrl</div>
      </div>
    </div>
  </span>
</template>

<script>
export default {
  name: 'keyboard-cmpt',
  props: {
    active: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      fnMode: false
    }
  },
  computed: {
    // no wrong input validator
    rawKeys() {
      return (this.$slots.default && this.$slots.default[0].text) || this.active
    },
    delim() {
      return this.rawKeys.includes(' + ') ? ' + ' : this.rawKeys.includes('+') ? '+' : ' '
    },
    filtered() {
      const delim = this.delim
      const fnMaps = Array(12).fill('').map((_,i) => [`F${i+1}`, `Fn${delim}F${i+1}`])
      let find = null
      let ret = this.rawKeys
      if (find = fnMaps.find(fn => ret.includes(fn[0]))) {
        this.fnMode = true
        ret = ret.replace(find[0], find[1])
      }
      return ret
    },
    activeKeys() {
      return this.filtered.split(this.delim)
    }
  },
  methods: {
    has(key = '') {
      const keys = key.split('-')
      return keys.find(x => this.activeKeys.includes(x)) ? 'active' : ''
    }
  }
}
</script>

<style lang="stylus">
.keyboard-cmpt {
  position: relative;

  .raw-keys {
    cursor: pointer;
    text-decoration: underline;
    text-decoration-color: rgba(0,0,0,.0);
    transition: var(--timing-quick);

    &:hover {
      text-decoration-color: rgba(0,0,0,0.6);

      &+.keyboard {
        display: flex;
      }
    }
  }

  @media screen and (max-width: 888px) {
    .raw-keys:hover {
      &+.keyboard {
        display: none;
      }
    }
  }

  .keyboard {
    position: absolute;
    bottom: 1em;
    left: 50%;
    transform: translateX(-50%) scale(.8);
    display: none;
    flex-wrap: wrap;
    flex-direction: column;
    gap: 3px;
    width: 640px;
    height: 220px;
    padding: 5px;
    background: white;
    border: solid 1px #f3f3f3;
    border-radius: 3px;
    box-shadow: 0 0 16px rgba(0,0,0,0.15), 0 0 12px rgba(0,0,0,0.5);
    z-index: 999;

    .line {
      flex: 1;
      display: flex;
      gap: 3px;
      width: 100%;
      height: 40px;
    }

    .key {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      background-color: #e3e3e3;
      border: solid 1px #cacaca;
      border-radius: 2px;
      text-align: center;

      &.active {
        background-color: #aaa;
      }

      span + span {
        margin-left: .25em;
      }

      &[data-content="Backspace"] {
        flex: 2;
      }
      &[data-content="Tab"] {
        flex: 1.35;
      }
      &[data-content="\|-\\"] {
        flex: 1.35;
      }
      &[data-content="CapsLock"] {
        flex: 1.75;
      }
      &[data-content="Enter"] {
        flex: 2.15;
      }
      &[data-content="Shift"] {
        flex: 2.5;
      }
      &[data-content="Ctrl"] {
        flex: 1.15;
      }
      &[data-content="Alt"] {
        flex: 1.15;
      }
      &[data-content="Fn"] {
        flex: 1.15;
      }
      &[data-content="Home"] {
        flex: 1.15;
      }
      &[data-content="Space"] {
        flex: 6.5;
      }
    }
  }
}
</style>
