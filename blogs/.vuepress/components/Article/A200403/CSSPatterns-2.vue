<template>
  <div class="container">
    <div class="card 1">
      <div class="node" v-for="item in 10"></div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  .card {
    margin: 0 10px 20px 0;
    flex-shrink: 0;
    width: 200px;
    height: 200px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    .node {
      position: relative;
      box-sizing: border-box;
      display: inline-block;
      width: 20px;
      height: 20px;
      flex-basis: 20px;

      &::before,
      &::after {
        content: ' ';
        position: absolute;
        z-index: 1;
      }
    }
  }
}
@media screen and (max-width: 760px) {
  .container {
    flex-direction: column;

    .card {
      margin-right: 0;
    }
  }
}
/** Segment: CSS Pattern Start */
.card {
  transform: translate3d(0, 0, 0);
}
.card:nth-child(1) {
  position: relative;

  // 计算背景颜色
  @function conic($nothing) {
    $part: 16;
    $part-degree: 360 / $part;
    $background: null;
    @for $i from 0 through ($part - 1) {
      $color: nth(('white', 'black'), ($i % 2) + 1);
      $dot: if($i != ($part - 1), ',', '');
      $background: append($background, $color + ' ' + (($i * $part-degree) + unquote('deg')) + ' ' + ((($i + 1) * $part-degree) + unquote('deg')) + $dot);
    }
    @return conic-gradient(#{$background});
  }

  .node {
    position: absolute;
    left: 50%;
    top: 50%;
    flex-basis: unset;
    background-image: conic(0);
  }

  $size: 200;
  $idx: 1;
  @while $size > 2 {
    .node:nth-child(#{$idx}) {
      width: $size + unquote('px');
      height: $size + unquote('px');
      z-index: $idx;
      transform: if(($idx % 2 == 1), translateX(-50%) translateY(-50%), translateX(-50%) translateY(-50%) rotate(45deg));
      filter: if(($idx % 2 == 0), invert(100%), unset);
    }

    $idx: $idx + 1;
    $size: $size / 2 * 1.4142;
  }
}
</style>
