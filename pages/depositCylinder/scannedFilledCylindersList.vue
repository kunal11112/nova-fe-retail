<template>
  <div>
    <!-- list of filled cylinders selected for purchase by the customer -->
    <scanned-cylinders-table
      :body-class="bodyClass"
      :head-class="headClass"
      :data-items="filledCylinders"
      :columns="columns"
      class="border border-b-4 py-12"
    />
    <app-button
      label="Scan Another Filled Cylinder"
      color="white"
      class="w-73 mx-auto mt-10 mb-6"
    />
    <app-button
      type="submit"
      label="Proceed To Checkout"
      color="blue"
      class="w-73 mx-auto mb-36"
      @click="$router.push('/depositCylinder/checkout')"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AppButton from '~/components/AppButton.vue'
import ScannedCylindersTable from '~/components/ScannedCylindersTable.vue'
export default {
  name: 'ScannedFilledCylindersList',
  components: {
    AppButton,
    ScannedCylindersTable,
  },
  layout: 'deposit-pages-layout',
  data() {
    return {
      user: {
        name: 'Nii Laryea',
        userId: 'AMM1030420',
      },
      columns: [
        { title: '', style: 'w-20' },
        { title: 'Item', style: 'w-32' },
        { title: 'Description', style: 'w-28' },
        { title: 'Quantity', style: 'w-20' },
        { title: 'Price', style: 'w-32' },
        { title: '', style: 'w-3' },
      ],
      headClass:
        'flex justify-center bg-whisper h-14 rounded-t-lg ff-poppins font-semibold text-base text-tangaroa header',
      bodyClass: 'flex justify-center py-2 border',
    }
  },
  head: {
    title: 'NovaGas Retail Portal- View Scanned Filled Cylinders',
    meta: [
      {
        hid: 'scanned filled cylinders list',
        name: 'scanned filled cylinders list',
        content: "NovaGas Retailer Views Customer's Scanned Filled Cylinders",
      },
    ],
  },
  computed: {
    ...mapState({
      filledCylinders: (state) => state.scannedFilledCylinders.filled_cylinders,
    }),
  },
  mounted() {
    this.storeFilledCylindersInSession()
  },
  methods: {
    ...mapActions({
      storeFilledCylindersInSession:
        'scannedFilledCylinders/storeCylindersInSession',
    }),
  },
}
</script>
