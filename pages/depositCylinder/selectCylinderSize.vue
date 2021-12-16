<template>
  <div>
    <p
      class="
        pt-6
        w-2/3
        flex
        justify-center
        ff-poppins
        text-base text-tangaroa
        font-medium
      "
    >
      Select the size of Cylinder to be used as Deposit
    </p>
    <div class="flex justify-center pt-6 pb-15 border-b-4">
      <!-- display the different cylinder types -->
      <deposit-cylinder-product-image
        v-for="(item, index) in cylinderTypes"
        :key="index"
        :product="item"
        class="mr-8"
        :class="item.name.toLowerCase()"
        @click="selectCylinder(item)"
      />
    </div>
  </div>
</template>

<script>
import DepositCylinderProductImage from '~/components/DepositCylinderProductImage.vue'
export default {
  name: 'SelectCylinderSize',
  components: {
    DepositCylinderProductImage,
  },
  layout: 'deposit-pages-layout',
  data() {
    return {
      selectedCylinder: {},
    }
  },
  head: {
    title: 'NovaGas Retail Portal- Select Customer Deposit Cylinder Size',
    meta: [
      {
        hid: 'scanned deposit cylinder size',
        name: 'scanned deposit cylinder size',
        content: 'NovaGas Retailer Selects Customer Deposit Cylinder Size',
      },
    ],
  },
  computed: {
    cylinderTypes() {
      return this.$store.state.productCatalog.cylinders
    },
  },
  methods: {
    /*
     * selectCylinder method dispatches an action to the store to set selected property cylinder with the same name to true
     * adds the selected cylinder to state
     * and routes the user to the page with updated list of deposited cylinder
     */
    selectCylinder(cylinder) {
      this.selectedCylinder = cylinder
      this.$store.dispatch('productCatalog/setSelectedItem', cylinder.name)
      this.addToScannedDepositCylinders()
      this.$router.push('/depositcylinder/scannedDepositCylindersList')
    },
    addToScannedDepositCylinders() {
      this.$store.dispatch(
        'scannedDepositCylinders/addDepositCylinder',
        this.selectedCylinder
      )
    },
  },
}
</script>
