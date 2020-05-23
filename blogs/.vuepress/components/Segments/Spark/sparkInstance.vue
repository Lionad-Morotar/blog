<template>
    <i class="grow-wrapper" :style="styles">
        <svg :width="size" :height="size" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
                :fill="color"
            />
        </svg>
    </i>
</template>

<script>
export default {
    props: {
        color: String,
        size: Number,
        styles: Object
    }
}
</script>

<style lang="stylus" scoped>
.grow-wrapper {
    position: absolute;
    pointer-events: none;
    user-select: none;
    z-index: 2;
    animation: grow 600ms ease-in-out forwards;

    svg {
        position: absolute;
        transform: translateX(-50%) translateY(-50%);
        animation: spin 600ms linear forwards;
    }
}

@keyframes grow {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}

@keyframes spin {
  from {
    transform: translateX(-50%) translateY(-50%) rotate(0deg);
  }
  to {
    transform: translateX(-50%) translateY(-50%) rotate(180deg);
  }
}
</style>
