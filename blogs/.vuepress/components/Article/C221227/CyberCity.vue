<template>
  <WHRatio h="500px">
    <div id="css-cyber-city" class="fullscreen">
      <div class="ground">
        <div class="building is-type-longstar" style="--floors: 50">
          <div class="floor" v-for="i in 50" :key="i" />
          <div class="roof with-air-condition" />
        </div>
      </div>
    </div>
  </WHRatio>
</template>

<script>
export default {
  data() {
    return {
    }
  },
}
</script>

<style lang="stylus">
// 网格大小
$em = 4px;
$bg = #151342;

/********************************************************************************* Util Functions */

// 获取随机数
random($min, $max)
  return floor(math(0, 'random') * ($max - $min + 1) + $min)

// 将一个值重复一定次数
repeat($times, $args)
  $loop = $times - 1
  $s = ''
  for $i in (0..$loop)
    $arg = $args[random(0, length($args)) - 1]
    $s += $i ? (', ' + $arg) : $arg 
  return unquote($s)

repeatFromRandItem($times, $args)
  $loop = $times - 1
  $s = ''
  $rands = split(' ', '' + $args)
  for $i in (0..$loop)
    $arg = $rands[random(0, length($rands)) - 1]
    $s += $i ? (', ' + $arg) : $arg 
  return unquote($s)

repeatNoCommon($times, $args)
  $loop = $times - 1
  $s = ''
  for $i in (0..$loop)
    $arg = $args[random(0, length($args)) - 1]
    $s += $i ? (' ' + $arg) : $arg 
  return unquote($s)

repeatFromRandNum($times, $min, $max, $unit)
  $loop = $times - 1
  $s = ''
  for $i in (0..$loop)
    $n = random($min, $max)
    $s += $i ? (' ' + $n + $unit):('' + $n + $unit)
  return unquote($s)

repeatPosition($times, $pos, $step, $offsetx)
  $loop = $times - 1
  $s = ''
  $x = $pos[0]
  $y = $pos[1]
  $stepx = $step[0]
  $stepy = $step[1]
  for $i in (0..$loop)
    $offset = 0
    $s += $i ? (', ' + ($x + $stepx * $i + $offset) + ' ' + ($y + $stepy * $i)) : ('' + ($x + $stepx * $i + $offset) + ' ' + ($y + $stepy * $i))
  return unquote($s)

drawWindow($color)
  $s = 'linear-gradient(90deg, ' + $color + ', ' + $color + ')'
  return unquote($s)

concatWindows($colors)
  $loop = length($colors) - 1
  // $s = drawWindow('red')
  $s = ''
  return $s
  // for $i in (0..$loop)
  //   $color = $colors[$i]
  //   // $val = 'linear-gradient(90deg, ' + $color + ', ' + $color + ')'
  //   $val = drawWindow('red')
  //   $s += $val
  // return $s

/********************************************************************************* Cyber City */

#css-cyber-city {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 500px;
  // height: 100%;
  background-color: #414141;
  overflow: hidden;
  background: linear-gradient(15deg, #0f112b, #10172e 40%, #2b212d);

  * {
    box-sizing: border-box;
  }

  .ground {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }
  .building {
    position: relative;
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: flex-end;
    border: solid 4px $bg;
    background: $bg;

    .floor {
      width: 100%;
    }
    .roof {
      width: 100%;

      &.with-air-condition {
        position: absolute;
        top: -60px;
        left: 0;
        width: 100%;
        height: 60px;
        background: linear-gradient(90deg, $bg, $bg), linear-gradient(90deg, $bg, $bg), linear-gradient(90deg, $bg, $bg);
        background-size: ($em * 36) ($em * 3), ($em * 21) ($em * 6), ($em * 7) ($em * 6);
        background-position: 0% 100%, ($em * 5) 100%, calc(100% - 4px * 2) 100%;
        background-repeat: no-repeat;
      }
    }

    &.is-type-longstar {
      width: $em * 50;

      $windows = 50
      .floor {
        height: $em * 3;
      }
      for $i in (1..50) {
        .floor:nth-child({$i}) {
          $colors = lighten(#60b0db, -50) lighten(#60b0db, -32) lighten(#60b0db, -27) lighten(#60b0db, -13) lighten(#60b0db, -2) lighten(#60b0db, 5) lighten(#60b0db, 12) lighten(#60b0db, 23) lighten(#60b0db, 32) lighten(#60b0db, 40)
          $rands = 3 3 3 3 6 30 27 16 6 3
          background: repeatFromRandItem($windows, concatWindows($colors));
          background-position: repeatPosition($windows, ($em / 2)px ($em / 2)px, $em * 3 0, repeatFromRandNum($windows, -50, 0, '%'));
          background-size: ($em * 2 $em * 2);
          background-repeat: no-repeat;
        }
      }
    }
  }
}
</style>