<template>
    <a
        class="friend-list-cmpt"
        target="__blank"
        style="text-decoration: none;"
        :class="[hoverTrigger ? 'hover-trigger' : '']"
        :rel="nofollow ? 'nofollow' : ''"
        :href="src"
        :key="`${name}-${src}`"
    >
        <div class="list-content-con">
            <div class="friend-list-label">
                <img loading="lazy" :src="img" />
            </div>
            <div class="friend-list-content">
                <span class="name">{{ name }}</span>
                <span class="achieve">{{ achieve }}</span>
            </div>
        </div>
    </a>
</template>
<script>
export default {
    props: {
        img: String,
        src: String,
        name: String,
        achieve: String,
        hoverTrigger: true,
        nofollow: {
            default: false
        }
    }
}
</script>

<style lang="stylus" scoped>
.friend-list-cmpt {
  --offset: 5px;
  --line-width: 10px;
  display: block;
  position: relative;
  top: calc(-1 * var(--offset));
  left: var(--offset);
  box-sizing: border-box;
  margin-top: 2em;
  width: 100%;
  z-index: 1;
  transition .2s;

  .list-content-con {
    box-sizing border-box;
    padding: 8px 12px;
    display: flex;
    width: 100%;
    height: 100%;
    border: solid 1px #888;
    background: var(--color-background);
    transition .2s;
    opacity: 1;
    will-change: auto;

    &:hover {
      opacity: .95;
      animation: blink ease 1.3s infinite both;

      @keyframes blink {
        from {
          opacity: 1;
          filter: saturate(1);
        }
        50% {
          opacity: .9;
          filter: saturate(1.2);
        }
        to {
          opacity: 1;
          filter: saturate(1);
        }
      }
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: var(--offset);
    left: calc(-1 * var(--offset));
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, var(--color-background) 0%, var(--color-background) 20%, #be7b68 20%, #be7b68 45%, var(--color-background) 45%, var(--color-background) 70%, #be7b68 70%, #be7b68 95%, var(--color-background) 95%, var(--color-background) 100%);
    background-size: var(--line-width) var(--line-width);
    z-index: -1;
    transition .2s;
  }

  &.hover-trigger:hover {
    animation: delay-offset linear .1s both;
    animation-delay: .5s;
    @keyframes delay-offset {
      from {
        top: calc(-1 * var(--offset));
        left: var(--offset);
      }
      to {
        top: 0;
        left: 0;
      }
    }

    &::before {
      top: 0;
      left: 0;
      animation: background-move linear .7s infinite;
    }
    @keyframes background-move {
      from {
        backgroud-position: 0 0;
      }
      to {
        background-position: 0 var(--line-width);
      }
    }
  }

  .friend-list-label {
    display flex
    flex-shrink 0
    align-items center
  }

  img {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    vertical-align center;
  }

  .friend-list-content {
    flex-grow 1;
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .name {
    font-weight: bold;
  }
  .achieve {
    text-decoration: none;
  }
}

@media screen and (max-width: 888px) {
    .name {
      display: none;
    }
}
</style>
