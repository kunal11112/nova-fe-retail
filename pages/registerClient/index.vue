<template>
  <div class="bg-whisper35 min-h-navbarless flex body-height">
    <div class="w-1/3 self-center">
      <app-stepper
        :steps="3"
        :current-step="step"
        @change-step="changeStep($event)"
      />
      <img
        :src="require(`~/assets/icons/${sideIcon}.png`)"
        alt="phone-icon"
        class="mx-auto mt-11"
      />
    </div>
    <section
      class="
        w-full
        rounded-l-xl
        bg-white
        filter
        drop-shadow
        flex
        justify-center
        items-center
      "
    >
      <!-- phone number form renders when step is 1
         send-phone-number event is emitted when the form is submitted
         the event is emittted with the phone number as an parameter
     -->
      <phone-number
        v-if="step === 1"
        @send-phone-number="sendPhoneNumber($event)"
      />

      <!-- otp form renders when step is 2
         send-otp event is emitted when the form is submitted
         the event is emittted with the otp as an parameter
    -->
      <otp v-if="step === 2" @send-otp="sendOtp($event)" />

      <!-- customer name form is rendered when step is 3
         send-name event is emitted when the form is submitted
         the event is emittted with the name as an parameter
    -->
      <customer-name v-if="step === 3" @send-name="sendName($event)" />
    </section>
  </div>
</template>

<script>
import CustomerName from '~/components/CustomerRegistrationForms/CustomerName.vue'
import Otp from '~/components/CustomerRegistrationForms/Otp.vue'
import PhoneNumber from '~/components/CustomerRegistrationForms/PhoneNumber.vue'
import AppStepper from '~/components/AppStepper.vue'

export default {
  components: { CustomerName, Otp, PhoneNumber, AppStepper },
  layout: 'default-navigation',
  data() {
    return {
      step: 1,
    }
  },
  head: {
    title: 'NovaGas Retail Portal- Customer Registration',
    meta: [
      {
        hid: 'registration',
        name: 'registration',
        content: 'NovaGas Retail- Customer Registration',
      },
    ],
  },
  computed: {
    // this method toggles the icon displayed to the left of the screen according to the current step
    sideIcon() {
      switch (this.step) {
        case 1:
          return 'phone-icon'

        case 2:
          return 'password-key-icon'

        default:
          return 'user-icon'
      }
    },
  },
  methods: {
    // this method sets the current step of the process the user is on
    changeStep(step) {
      this.step = step
    },
    sendPhoneNumber(phoneNumber) {
      this.$store.dispatch('customerRegistration/setPhoneNumber', phoneNumber)
      this.changeStep(2)
    },
    sendOtp(otp) {
      this.$store.dispatch('customerRegistration/setOtp', otp)
      this.changeStep(3)
    },
    sendName(name) {
      this.$store.dispatch('customerRegistration/setName', name)
    },
  },
}
</script>
