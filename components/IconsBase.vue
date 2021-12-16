<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="viewBox"
    :aria-labelledby="iconName"
    fill="none"
    class="w-5 h-5 icon stroke-current group-hover:text-tangaroa"
  >
    <slot />
  </svg>
</template>
<script>
export default {
  name: 'IconsBase',
  props: {
    viewBox: { type: String, default: '0 0 24 24' },
    iconName: { type: String, default: '' },
    hasFocus: { type: Boolean, default: false },
  },
}
</script>
