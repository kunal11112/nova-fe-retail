<template>
  <div>
    <div class="flex justify-between border-b-4 px-16 py-9 mb-10">
      <!-- filled cylinders displayed in a table -->
      <scanned-cylinders-table
        :body-class="bodyClass"
        :head-class="headClass"
        :data-items="filledCylinders"
        :columns="columns"
        :show-scanned="false"
      />
      <div class="w-96">
        <!-- checkout summary displayed when the payment_type is Cash -->
        <app-checkout-summary
          v-if="payment_type === 'Cash'"
          :bill="filledCylinders"
          :total-cost="totalPrice"
        >
          <!-- deposit slot populated with the list of empty cylinders deposited by the customer -->
          <template #deposit>
            <p
              v-for="(item, index) in depositCylinders"
              :key="index"
              class="text-sm text-ferra font-normal"
            >
              {{ item.weight }} {{ item.name }} Cylinder Deposit
              <span v-if="item.quantity > 1">(x{{ item.quantity }})</span>
            </p>
          </template>
        </app-checkout-summary>

        <!-- checkout total displays total price of customer's order when the payment_type is not Cash -->
        <app-checkout-total
          v-if="payment_type !== 'Cash'"
          :total-cost="totalPrice"
          class="mb-4 w-full"
        />

        <!-- form to collect customer's mobile money details rendered when the payment_type is mobile money -->
        <pay-mobile-money
          v-if="payment_type === 'Mobile Money'"
          @mobilePayment="$router.push('/depositCylinder/receipt')"
        />
        <!-- form to collect customer's mobile money details rendered when the payment_type is mobile money -->
        <pay-bank-card
          v-if="payment_type === 'Cards'"
          @cardPayment="$router.push('/depositCylinder/receipt')"
        />
      </div>
    </div>

    <!-- change order button routes the user to the deposit cylinder page to restart the cylinder deposit process -->
    <app-button
      label="Change Order"
      class="w-73 my-4 m-auto"
      :outlined="true"
      @click="$router.push('/depositCylinder')"
    />
    <div class="flex justify-center">
      <!-- list of payment options rendered in a row. click on any one option
      to set the payment_type data variable to the value of the
      corresponding index's paymentOptions.type and remove the element's
      make-blur class -->
      <div
        v-for="(item, index) in paymentOptions"
        :key="index"
        :class="paymentOptionsClass[index]"
        @click="selectModeOfPayment(item.type)"
      >
        <img
          :src="require(`~/assets/icons/${item.image}`)"
          :alt="item.alt"
          class="
            h-20
            w-full
            py-6
            px-10
            border border-grey border-b-0
            rounded-t-xl
            item-image
          "
        />

        <p
          class="
            bg-tangaroa
            h-8
            rounded-b-xl
            text-white text-xs text-center
            font-light
            leading-8
            label
          "
        >
          {{ item.type }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AppButton from '~/components/AppButton.vue'
import AppCheckoutSummary from '~/components/AppCheckoutSummary.vue'
import AppCheckoutTotal from '~/components/AppCheckoutTotal'
import ScannedCylindersTable from '~/components/ScannedCylindersTable.vue'
import PayMobileMoney from '~/components/PayMobileMoney'
import PayBankCard from '~/components/PayBankCard'
export default {
  name: 'DepositCylinderCheckout',
  components: {
    AppButton,
    AppCheckoutSummary,
    AppCheckoutTotal,
    ScannedCylindersTable,
    PayMobileMoney,
    PayBankCard,
  },
  layout: 'deposit-pages-layout',
  data() {
    return {
      columns: [
        { title: 'Item', style: 'w-32' },
        { title: 'Description', style: 'w-28' },
        { title: 'Quantity', style: 'w-20' },
        { title: 'Price', style: 'w-32' },
        { title: '', style: 'w-3' },
      ],
      headClass:
        'flex bg-whisper h-14 rounded-t-lg  font-semibold text-base text-tangaroa header',
      bodyClass: 'flex justify-center py-2 border',
      payment_type: 'Cash',
      paymentOptions: [
        {
          image: 'cash-icon.png',
          alt: 'cash-icon',
          type: 'Cash',
        },
        {
          image: 'mobile-money-icon.png',
          alt: 'mobile-money-icon',
          type: 'Mobile Money',
        },
        {
          image: 'cards-icon.png',
          alt: 'cards-icon',
          type: 'Cards',
        },
        {
          image: 'other-payments-icon.png',
          alt: 'other-payments-icon',
          type: 'Others',
        },
      ],
    }
  },
  head: {
    title: 'NovaGas Retail Portal- Cylinder Deposit Checkout',
    meta: [
      {
        hid: 'login',
        name: 'login',
        content: 'NovaGas Retailer Customer Cylinder Deposit Checkout',
      },
    ],
  },
  computed: {
    ...mapGetters({
      totalPrice: 'cart/getTotalPriceOfFilledCylinders',
      filledCylinders: 'cart/getFilledCylinders',
      depositCylinders: 'cart/getDepositCylinders',
    }),
    paymentOptionsClass() {
      return this.paymentOptions.map((item) => {
        const baseClass = `w-32 mr-4 cursor-pointer ${item.alt}`
        if (item.type !== this.payment_type) return `${baseClass} opacity-50`
        else return baseClass
      })
    },
  },
  methods: {
    selectModeOfPayment(mode) {
      this.payment_type = mode
      if (this.payment_type === 'Cash')
        this.$router.push('/depositCylinder/receipt')
    },
  },
}
</script>
