<template>
  <div>
    <label v-if="hasLabel" class="pl-2 font-medium text-xs text-grey">{{
      label
    }}</label>
    <div
      class="flex w-full rounded-lg text-tangaroa"
      :class="[containerClass, scannedInputStyle]"
    >
      <input
        :value="value"
        :type="[showPassword ? 'text' : 'password']"
        :name="name"
        class="
          px-4
          h-12
          w-full
          font-medium
          text-sm
          bg-transparent
          border-none
          focus:outline-none
        "
        :class="inputClass"
        :placeholder="placeholder"
        :readonly="disable"
        @input="$emit('input', $event.target.value)"
      />
      <div v-if="type === 'password'" class="px-4 flex">
        <img
          :src="[
            showPassword
              ? require('../assets/icons/eye_open.png')
              : require('../assets/icons/eye_closed.png'),
          ]"
          class="self-center w-5 h-3 eye"
          alt="show password icon"
          @click="toggleShow()"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
      default: '',
    },
    regular: {
      type: Boolean,
      default: false,
    },
    login: {
      type: Boolean,
      default: false,
    },
    hasLabel: {
      type: Boolean,
      default: false,
    },
    disable: {
      type: Boolean,
      default: false,
    },
    scannedInputStyle: {
      type: String,
      default: '',
    },
    checkoutForm: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showPassword: true,
      containerClass: {
        'bg-whisper': this.regular,
        'border border-grey bg-whisper35': this.login,
        'bg-white': this.checkoutForm,
      },
      inputClass: {
        'placeholder-white text-white': this.login,
        'placeholder-grey': this.checkoutForm || this.regular,
      },
    }
  },
  computed: {
    placeholder() {
      if (!this.hasLabel) {
        return this.label
      }
      return ''
    },
  },
  mounted() {
    if (this.type === 'password') {
      this.showPassword = false
    } else {
      this.showPassword = true
    }
  },
  methods: {
    toggleShow() {
      this.showPassword = !this.showPassword
      return this.showPassword
    },
  },
}
</script>
