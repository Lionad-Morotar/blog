<template>
  <div class="css-variable-transition">
    <div class="content">
      <div class="title">This Demo Requires Chrome 85+</div>
      <p>
        Browsers which support CSS Houdini will see a gradient with a gradient stop transition on hover. Unsupported
        browsers will see a gradient background with a hue rotation on hover.
      </p>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
@supports (background: paint(houdini)) {
  // 只有自定义属性才支持渐变
  @property --stop {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 62%;
  }
}

.css-variable-transition {
    --stop: 62%;
    box-sizing: border-box;
    margin: 0 auto;
    padding: 1.4em;
    width: 400px;
    max-width: 100%;
    background: linear-gradient(pink var(--stop), orange calc(var(--stop) + 20%));
    transition: --stop 2s, filter .5s;
    cursor: pointer;

    @supports (background: paint(houdini)) {
      &:hover,
      &:target,
      &:focus {
        --stop: -20%;
        transition: --stop .5s, filter .5s;
      }
    }
    /* fallback */
    @supports not (background: paint(houdini)) {
      &:hover,
      &:target,
      &:focus {
        filter: hue-rotate(-90deg);
      }
    }

    .content {
      padding: 2em;
      background: var(--color-background);
    }

    .title {
      font-size: 1em;
      font-weight: bold;
    }
    p {
      font-size: .85em;
    }
}
</style>
