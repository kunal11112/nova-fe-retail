<template>
  <div class="w-full flex justify-center">
    <input
      v-for="(item, index) in refArray"
      :ref="item"
      :key="index"
      :name="item"
      type="text"
      class="
        border-tangaroa border-b
        inline-block
        w-7
        h-6
        md:h-12
        mx-2
        pl-2
        text-base text-tangaroa
        ff-poppins
        focus:outline-none
      "
      maxlength="1"
      @input.stop="handleChange"
      @keydown.delete="handleDelete"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: '',
      refArray: ['ref1', 'ref2', 'ref3', 'ref4', 'ref5', 'ref6'],
    }
  },
  methods: {
    handleChange(event) {
      if (this.data.length < 6) {
        const val = event.target.value
        if (!isNaN(val)) {
          let text = this.data
          text = text + val
          this.data = text
          this.$emit('sendOtp', this.data)
          this.resetInputs()
        } else {
          this.resetInputs()
        }
      }
    },
    handleDelete() {
      this.data = this.data.slice(0, -1)
      this.resetInputs()
    },
    resetInputs() {
      for (let index = 0; index < this.refArray.length; index++) {
        const ref = this.refArray[index]
        const refVal = this.$refs[ref][0].value
        if (isNaN(refVal)) {
          this.$refs[ref][0].value = ''
        }
        if (index === this.data.length) {
          this.$refs[ref][0].focus()
        }
      }
    },
  },
}
</script>
