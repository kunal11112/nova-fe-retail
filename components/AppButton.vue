<template>
  <div>
    <button
      class="
        h-12
        rounded-lg
        flex
        justify-center
        items-center
        w-full
        text-base text-white
        leading-7
        font-normal
        p-3.5
        focus:outline-none
      "
      :type="type"
      :class="[buttonClass, buttonColor]"
      @click="$emit('click')"
    >
      {{ label }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    type: {
      type: String,
      default: 'button',
    },
    label: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '',
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    loginOutlined: {
      type: Boolean,
      default: false,
    },
    isScanned: {
      type: Boolean,
      default: false,
    },
    useScanColor: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      buttonClass: {
        'bg-grey-gradient text-tangaroa': this.color === 'grey',
        'bg-blue-gradient': this.color === 'blue',
        'bg-green-gradient': this.color === 'green',
        'bg-faded-blue-gradient': this.color === 'faded-blue',
        'bg-white-gradient text-tangaroa': this.color === 'white',
        'border border-tangaroa text-tangaroa': this.outlined,
        'border border-white text-white': this.loginOutlined,
      },
    }
  },
  computed: {
    // this method toggles the color of the verify button in the scan id page
    buttonColor() {
      let style
      if (this.useScanColor) {
        if (this.isScanned) {
          style = 'bg-green-gradient text-white'
        } else style = 'border border-tangaroa text-tangaroa'
      }
      return style
    },
  },
}
</script>
