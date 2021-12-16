<template>
  <div class="bg-grey-60 flex flex-col items-center p-4">
    <h4 class="text-sm text-black font-medium mb-4 ml-7 self-start">
      Pay/ Mobile Money
    </h4>
    <form @submit.prevent="submitMobileMoneyNumber($event)">
      <div class="flex justify-center mb-4">
        <img
          v-for="(item, index) in networks"
          :key="index"
          :class="networkClass[index]"
          :src="require(`@/assets/icons/${item.image}.png`)"
          :alt="item.image"
          @click="toggleMobileMoneyPaymentProvider(item.name)"
        />
      </div>
      <validation-observer>
        <validation-provider
          v-slot="{ errors }"
          rules="required|numeric"
          name="Phone Number"
        >
          <app-input
            v-model="payment.phoneNumber"
            :checkout-form="true"
            label="Enter Phone Number"
            type="text"
            name="Phone Number"
            class="w-73"
          />
          <small class="text-red text-left py-2">{{ errors[0] }}</small>
        </validation-provider>
        <app-button
          label="Pay"
          name="mobile_money"
          type="submit"
          color="green"
          class="w-73 mb-10 mt-4 m-auto"
        />
      </validation-observer>
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
      networks: [
        { name: 'vodafone', image: 'pay-vodafone' },
        { name: 'mtn', image: 'pay-mtn' },
        { name: 'airtel', image: 'pay-airtel' },
      ],
      payment: {
        network: 'vodafone',
        phoneNumber: '',
      },
    }
  },
  computed: {
    networkClass() {
      return this.networks.map((item) => {
        const network = item.name
        const baseClass = `${network} cursor-pointer w-full h-full mr-1`
        if (item.name !== this.payment.network) return `${baseClass} opacity-50`
        else return baseClass
      })
    },
  },
  methods: {
    toggleMobileMoneyPaymentProvider(value) {
      this.payment.network = value
    },
    submitMobileMoneyNumber(e) {
      e.preventDefault()
      this.$emit('mobilePayment', this.payment)
    },
  },
}
</script>
