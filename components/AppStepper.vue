<template>
  <div class="flex justify-center">
    <div v-for="(item, index) in steps" :key="index" class="flex">
      <div
        class="w-6 h-6 rounded-full step-node"
        :class="{
          'bg-tangaroa': index === currentStep - 1,
          'bg-grey-70 border border-tangaroa': index > currentStep - 1,
        }"
        @click="$emit('change-step', index + 1)"
      >
        <img
          v-if="index < currentStep - 1"
          src="~/assets/icons/svg/group-successful-transaction.svg"
          alt="done"
          class="done"
        />
      </div>
      <div
        v-if="index < steps - 1"
        class="w-4 h-0 border-b border-tangaroa self-center step-link"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppStepper',
  props: {
    // total number of steps involved in the process
    steps: { type: Number, required: true },

    // current step in the process
    currentStep: { type: Number, required: true },
  },
}
</script>
