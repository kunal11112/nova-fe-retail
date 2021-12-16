<template>
  <div
    class="bg-white p-5 filter drop-shadow rounded-lg"
    @click="$emit('click')"
  >
    <div class="bg-grey-90 rounded-lg p-5">
      <img
        src="~/assets/icons/nova-cylinder-icon-sm.png"
        alt="cylinder"
        class="w-44"
      />
    </div>
    <p class="ff-roboto font-medium text-base pt-4">
      {{ product.weight }} Cylinder
    </p>
  </div>
</template>

<script>
export default {
  name: 'DepositCylinderProductImage',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
}
</script>
