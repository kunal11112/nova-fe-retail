<template>
  <div>
    <!-- list of empty cylinders deposited by the customer -->
    <div class="min-h-96 border-gray-200 border-b-4">
      <scanned-cylinders-table
        v-if="scanFilledCylinder"
        :body-class="bodyClass"
        :head-class="headClass"
        :data-items="filledCylinders"
        :columns="columns"
        class="py-12"
      />
    </div>
    <!-- renders a descripton of the latest emoty cylinder scanned into the system -->

    <app-button
      v-if="scanFilledCylinder"
      label="Scan Another Filled Cylinder"
      color="white"
      class="w-73 mx-auto mt-10"
      @click="scanFilledCylinder = false"
    />

    <!-- button clicked to proceed to next page to scan filled cylinder -->
    <app-button
      :label="captureButtonLabel"
      type="submit"
      class="w-73 inset-x-0 mx-auto mt-6 mb-4"
      color="blue"
      @click="proceedToCheckout"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import AppButton from '~/components/AppButton.vue'
import ScannedCylindersTable from '~/components/ScannedCylindersTable.vue'
export default {
  components: {
    AppButton,
    ScannedCylindersTable,
  },
  layout: 'deposit-pages-layout',
  data() {
    return {
      scanFilledCylinder: false,
      columns: [
        { title: '', style: 'w-20' },
        { title: 'Item', style: 'w-32' },
        { title: 'Description', style: 'w-28' },
        { title: 'Quantity', style: 'w-20' },
        { title: 'Price', style: 'w-32' },
        { title: '', style: 'w-3' },
      ],
      cashDepositCylinders: [],
      headClass:
        'flex justify-center bg-whisper h-14 rounded-t-lg ff-poppins font-semibold text-base text-tangaroa header',
      bodyClass: 'flex justify-center py-2 border',
    }
  },
  computed: {
    filledCylinders() {
      return this.$store.state.scannedFilledCylinders.filled_cylinders
    },
    captureButtonLabel() {
      if (this.scanFilledCylinder) {
        return 'Proceed To Checkout'
      }
      return 'Scan Filled Cylinder'
    },
  },
  mounted() {
    this.storeCylindersInSession()
  },
  methods: {
    ...mapActions('scannedFilledCylinders', ['storeCylindersInSession']),
    proceedToCheckout() {
      if (this.scanFilledCylinder) this.$router.push('/cashDeposit/checkout')
      this.scanFilledCylinder = !this.scanFilledCylinder
    },
  },
}
</script>
