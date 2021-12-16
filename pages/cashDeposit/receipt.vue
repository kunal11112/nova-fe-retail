<template>
  <div>
    <receipt
      :order-total="totalPrice"
      :filled-cylinders="filledCylinders"
      :is-cash-deposit="true"
      :cash-deposit="deposit"
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
import { mapGetters, mapState } from 'vuex'
import AppButton from '~/components/AppButton.vue'
import Receipt from '~/components/Receipt.vue'
export default {
  components: { Receipt, AppButton },
  layout: 'deposit-pages-layout',
  computed: {
    ...mapState({
      filledCylinders: (state) => state.scannedFilledCylinders.filled_cylinders,
      deposit: (state) => state.cashDeposit.initial_cashDeposit,
    }),
    ...mapGetters({
      totalPrice:
        'scannedFilledCylinders/getTotalPriceOfcashDepositFilledCylinders',
    }),
  },
}
</script>
