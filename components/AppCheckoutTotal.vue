<template>
  <div
    class="
      border border-grey-40
      rounded-xl
      p-4
      w-80
      text-tangaroa text-base
      font-medium
      ff-roboto
      relative
    "
  >
    <div class="absolute w-32 -top-5 -left-px bg-white ff-poppins">Total</div>
    <p>
      Total
      <span class="float-right amount">GHS {{ totalCost }}</span>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    totalCost: {
      type: Number,
      default: null,
    },
  },
}
</script>
