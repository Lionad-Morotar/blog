<template>
    <div class="cmpt">
        <span
            class="jaffee poster"
            style="--bg: url('https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200612/foldin.jpg');"
        >
            <span class="a"></span>
            <span class="bc">
                <span class="b"></span>
                <span class="c"></span>
            </span>
            <img src="https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200612/foldin.jpg" />
        </span>
        <br />
    </div>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
.cmpt {
  margin: 2em 0 4em;
  max-height: 56vh;
  perspective: 60em;
  text-align: center;
}

.jaffee {
  position: relative;
  display: inline-flex;
//   transform: rotateX(10deg);
//   transform-style: preserve-3d;
  cursor: grab;
}

.jaffee img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 56vh;
  opacity: 0;
}

.jaffee .a, .jaffee .b, .jaffee .c {
  top: 0;
  display: inline-block;
  height: 100%;
  background-image: var(--bg);
  background-size: cover;
  background-repeat: no-repeat;
  filter: saturate(70%) contrast(85%);

  &::after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    background-repeat: no-repeat;
    background-image: 
     linear-gradient(to right, alpha(white, .1) 0.5%, alpha(black, 0.15) 1.2%, transparent 1.2%),
     linear-gradient(to bottom, alpha(white, .1) 0.5%, alpha(black, 0.15) 1.2%, transparent 1.2%),
     linear-gradient(to bottom, alpha(white, .1) 0.5%, alpha(black, 0.15) 1.2%, transparent 1.2%),
     linear-gradient(265deg, alpha(black, 0.2), transparent 10%),
     linear-gradient(5deg, alpha(black, 0.2), transparent 15%),
     linear-gradient(-5deg, alpha(black, 0.1 0.6), transparent 10%),
     linear-gradient(5deg, alpha(black, 0.1 0.6), transparent 10%),
     linear-gradient(-265deg, alpha(black, 0.2), transparent 10%),
     linear-gradient(-5deg, alpha(black, 0.2), transparent 15%),
     linear-gradient(266deg, alpha(black, 0.2), transparent 10%);
    background-size: 
        50% 100%, 
        100% 33.3333%, 
        100% 33.3333%, 
        50% 33.3333%, 
        50% 33.3333%, 
        50% 33.3333%, 
        50% 33.3333%, 
        50% 33.3333%, 
        50% 33.3333%, 
        50% 33.3333%;
    background-position: right top, left center, left bottom, left top, left top, right top, left center, right center, right center, left bottom;
  }
}

.jaffee .a {
  position: absolute;
  left: 0;
  width: 50%;
  background-position: 0 0;
}

.jaffee .bc {
  position: absolute;
  display: inline-flex;
  width: 50%;
  height: 100%;
  left: 50%;
  transform-origin: left;
  transition: transform 2s;
  transform-style: preserve-3d;
}

.jaffee .b, .jaffee .c {
  position: relative;
  width: 50%;
}

.jaffee .b {
  background-position: 66.666667% 0;
}

.jaffee .c {
  background-position: 100% 0;
  transform-origin: left;
  transition: transform 1s;
}

.jaffee:hover .bc, .jaffee:active .bc {
  transform: rotateY(-180deg) translateZ(-1px);
  transition: transform 1s;
}

.jaffee:hover .c, .jaffee:active .c {
  transform: rotateY(180deg) translateZ(1px);
  transition: transform 2s;
}
</style>