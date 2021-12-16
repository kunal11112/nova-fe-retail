<template>
  <div>
    <!-- list of empty cylinders deposited by the customer -->
    <scanned-cylinders-table
      :body-class="bodyClass"
      :head-class="headClass"
      :data-items="depositCylinders"
      :columns="columns"
      class="border border-b-4 py-12"
      @reduceItemQuantity="reduceItemQuantity($event)"
    />
    <!-- renders a descripton of the latest emoty cylinder scanned into the system -->
    <p
      v-if="receivedCylinder.length > 0"
      class="
        border border-b-4
        ff-poppins
        font-light
        text-center text-base text-tangaroa
        w-full
        py-5
      "
    >
      {{ receivedCylinder[0].weight }} {{ receivedCylinder[0].name }} Cylinder
      received as <span class="font-bold">Deposit</span>
    </p>
    <app-button
      label="Scan Another Deposit Cylinder"
      color="white"
      class="w-73 mx-auto mt-10 mb-6"
      @click="scanAnotherDepositCylinder"
    />

    <!-- button clicked to proceed to next page to scan filled cylinder -->
    <app-button
      type="submit"
      label="Scan Filled Cylinders"
      color="blue"
      class="w-73 mx-auto mb-10"
      @click="$router.push('/depositCylinder/scannedFilledCylindersList')"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AppButton from '~/components/AppButton.vue'
import ScannedCylindersTable from '~/components/ScannedCylindersTable.vue'
export default {
  name: 'ScannedDepositCylindersList',
  components: {
    AppButton,
    ScannedCylindersTable,
  },
  layout: 'deposit-pages-layout',
  data() {
    return {
      columns: [
        { title: '', style: 'w-20' },
        { title: 'Item', style: 'w-32' },
        { title: 'Description', style: 'w-28' },
        { title: 'Quantity', style: 'w-20' },
        { title: 'Price', style: 'w-32' },
        { title: '', style: 'w-3' },
      ],
      depositCylinders: [],
      headClass:
        'flex justify-center bg-whisper h-14 rounded-t-lg ff-poppins font-semibold text-base text-tangaroa header',
      bodyClass: 'flex justify-center py-2 border',
    }
  },
  head: {
    title: 'NovaGas Retail Portal- View Scanned Deposit Cylinders',
    meta: [
      {
        hid: 'scanned deposit cylinder list',
        name: 'scanned deposit cylinder list',
        content:
          "NovaGas Retailer Views Customer's Scanned Deposit Cylinders Size",
      },
    ],
  },
  computed: {
    ...mapGetters({
      receivedCylinder: 'productCatalog/getSelectedCylinder',
    }),
  },
  mounted() {
    this.loadDepositCylinders()
  },
  methods: {
    // loads cylinders deposited from state
    loadDepositCylinders() {
      this.depositCylinders =
        this.$store.state.scannedDepositCylinders.deposit_cylinders
    },

    // sets select property of all deposited cylinders to false and routes user to deposit cylinder page
    scanAnotherDepositCylinder() {
      this.$store.dispatch('productCatalog/resetSelectedItems')
      this.$router.push('/depositcylinder')
    },

    reduceItemQuantity(row) {
      this.$store.dispatch(
        'scannedDepositCylinders/reduceCylinderQuantity',
        row
      )
      this.$store.dispatch('productCatalog/resetSelectedItems')
    },
  },
}
</script>
