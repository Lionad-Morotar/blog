<template>
  <div class="css-variable-transition">Hover to checkout：</div>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
@property --num {
  syntax: "<integer>";
  initial-value: 2541;
  inherits: false;
}
.css-variable-transition {
  padding: 2em;
  counter-set: num var(--num);
  border: solid 1px;
  font-size: 2em;
  font-weight: bold;
  transition: --num .3s;
  cursor: pointer;

  &:hover {
    --num: 17049;

    &::after {
      content: counter(num, lower-alpha) "!";
    }
  }
  &::after {
    content: counter(num, lower-alpha);
  }
}
</style>
