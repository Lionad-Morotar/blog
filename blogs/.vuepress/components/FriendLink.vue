<template>
    <a
        :rel="nofollow ? 'nofollow' : ''"
        :href="src"
        target="__blank"
        style="text-decoration: none;"
    >
        <div class="simple-list-cmpt">
            <div class="simple-list-label">
                <img :src="img" />
            </div>
            <div class="simple-list-content">
                <span class="name">
                    <a
                        :rel="nofollow ? 'nofollow' : ''"
                        :href="src"
                        target="__blank"
                        >{{ name }}</a
                    >
                </span>
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
        nofollow: {
            default: false
        }
    }
}
</script>
<style lang="stylus">
.simple-list-cmpt {
  box-sizing: border-box;
  display: flex;
  margin-top: 2em;
  padding: 8px 12px;
  width: 100%;
  border: solid 1px #888;
  border-radius: 3px;
  transition .35s;

  &:hover {
    background: #fcfcfc;
  }

  .simple-list-label {
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

  .simple-list-content {
    flex-grow 1;
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: 760px) {
      .name {
        display: none;
      }
    }
    .name a {
      font-weight: bold;
    }
    .achieve {
      text-decoration: none;
    }
  }
}
</style>
