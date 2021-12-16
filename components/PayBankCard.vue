<template>
  <div class="bg-grey-60 ff-poppins flex flex-col items-center p-4">
    <h4 class="text-sm text-black font-medium self-start mb-4 ml-7">
      Pay/ Bank Card
    </h4>
    <form class="w-73" @submit="submitBankCardDetails($event)">
      <div class="flex mb-6 justify-center">
        <img
          v-for="(item, index) in cards"
          :key="index"
          :class="cardClass[index]"
          :src="require(`@/assets/icons/${item.image}.png`)"
          :alt="`${item.image}`"
          @click="payment.type = item.type"
        />
      </div>
      <validation-observer>
        <validation-provider
          v-slot="{ errors }"
          rules="required|numeric"
          name="Card Number"
        >
          <app-input
            v-model="payment.cardNumber"
            :checkout-form="true"
            label="Enter Card Number"
            type="text"
            name="Card Number"
          />
          <small class="text-red text-left ff-poppins py-2">{{
            errors[0]
          }}</small>
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          rules="required|alpha"
          name="Name on Card"
        >
          <app-input
            v-model="payment.cardName"
            :checkout-form="true"
            label="Name on Card"
            type="text"
            name="Name on Card"
            class="mt-4"
          />
          <small class="text-red text-left ff-poppins py-2">{{
            errors[0]
          }}</small>
        </validation-provider>
        <div class="grid grid-cols-2 gap-4 mt-4">
          <validation-provider
            v-slot="{ errors }"
            rules="required|numeric"
            name="Expiry Date"
          >
            <app-input
              v-model="payment.cardDate"
              :checkout-form="true"
              label="Expiry Date"
              type="text"
              name="Expiry Date"
            />
            <small class="text-red text-left ff-poppins py-2">{{
              errors[0]
            }}</small>
          </validation-provider>

          <validation-provider
            v-slot="{ errors }"
            rules="required|numeric"
            name="CVV"
          >
            <app-input
              v-model="payment.cardCVV"
              :checkout-form="true"
              label="CVV"
              type="text"
              name="CVV"
            />
            <small class="text-red text-left ff-poppins py-2">{{
              errors[0]
            }}</small>
          </validation-provider>
        </div>
      </validation-observer>

      <app-button
        label="Pay"
        name="bank_card"
        type="submit"
        color="green"
        class="w-73 mt-4 mb-10 mx-auto"
      />
    </form>
  </div>
</template>

<script>
import {
  ValidationObserver,
  ValidationProvider,
} from 'vee-validate/dist/vee-validate.full'
import AppInput from '~/components/AppInput'
import AppButton from '~/components/AppButton'

export default {
  components: {
    AppInput,
    AppButton,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      cards: [
        { type: 'visa', image: 'pay-visa-icon' },
        { type: 'mastercard', image: 'pay-master-card-icon' },
      ],
      payment: {
        type: 'visa',
        cardNumber: '',
        cardName: '',
        cardDate: '',
        cardCVV: '',
      },
    }
  },
  computed: {
    cardClass() {
      return this.cards.map((item) => {
        const type = item.type
        const baseClass = `w-24 h-full cursor-pointer mr-2 ${type}`
        if (type !== this.payment.type) return `${baseClass} opacity-50`
        else return baseClass
      })
    },
  },
  methods: {
    submitBankCardDetails(e) {
      e.preventDefault()
      this.$emit('cardPayment', this.payment)
    },
  },
}
</script>
