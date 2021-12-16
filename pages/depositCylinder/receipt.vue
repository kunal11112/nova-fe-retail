<template>
  <div>
    <receipt
      :order-total="totalPrice"
      :filled-cylinders="filledCylinders"
      :cylinder-deposit="depositCylinders"
      :is-cylinder-deposit="true"
      class="mx-auto w-80"
    />
    <hr class="h-1 bg-whisper" />
    <app-button
      label="Done"
      color="blue"
      class="w-80 mx-auto my-16"
      @click="$router.push('/dashboard')"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AppButton from '~/components/AppButton.vue'
import Receipt from '~/components/Receipt.vue'
export default {
  components: { Receipt, AppButton },
  layout: 'deposit-pages-layout',
  head: {
    title: 'NovaGas Retail Portal- Cylinder Deposit Receipt',
    meta: [
      {
        hid: 'cylinder deposit receipt',
        name: 'cylinder deposit receipt',
        content: 'NovaGas Retailer Customer Cylinder Deposit Receipt',
      },
    ],
  },
  computed: {
    ...mapGetters({
      totalPrice: 'cart/getTotalPriceOfFilledCylinders',
      filledCylinders: 'cart/getFilledCylinders',
      depositCylinders: 'cart/getDepositCylinders',
    }),
  },
}
</script>
