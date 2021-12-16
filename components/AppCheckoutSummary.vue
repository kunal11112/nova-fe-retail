<template>
  <div
    class="
      border border-grey-40
      rounded-xl
      w-96
      relative
      ff-poppins
      font-medium
      text-base
      p-6
    "
  >
    <div
      class="
        absolute
        w-32
        h-10
        -top-5
        -left-px
        bg-white
        text-tangaroa
        leading-10
        title
      "
    >
      Summary
    </div>

    <!-- Customer's initial deposit
    @options cash, cylinders -->
    <slot name="deposit"></slot>

    <hr class="border-t border-grey-70 mt-4" />

    <!-- List of filled cylinders purchased -->
    <div class="py-4 mb-4 border-b border-grey-70">
      <p
        v-for="(item, index) in bill"
        :key="index"
        class="text-sm text-ferra font-normal product item-description mb-1"
      >
        {{ item.weight }} {{ item.name }} Cylinder Refill
        <span v-if="item.quantity > 1">(x{{ item.quantity }})</span>
        <span
          class="text-xs text-tangaroa font-medium leading-6 float-right value"
          >GHS {{ item.totalPrice }}
        </span>
      </p>
    </div>

    <!-- Purchase total -->
    <p class="text-tangaroa ff-roboto">
      Total
      <span class="float-right amount">GHS {{ totalCost }}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'AppCheckoutSummary',
  props: {
    bill: {
      type: Array,
      default: null,
    },
    totalCost: {
      type: Number,
      default: null,
    },
  },
}
</script>
