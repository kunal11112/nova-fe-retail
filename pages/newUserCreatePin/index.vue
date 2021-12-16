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
        class="mx-auto my-11"
      />
      <div v-if="step === 3">
        <h3
          class="mx-auto text-lg ff-poppins font-bold text-tangaroa text-center"
        >
          Welcome, Kwame Nkansah
        </h3>

        <p
          class="
            block
            mx-auto
            w-72
            py-7
            text-center text-tangaroa-darker
            ff-poppins
            font-light
            text-base
          "
        >
          You have successfully signed in to NovaGas Retail portal.
          <br />Please create a new PIN to continue.
        </p>
      </div>
    </div>

    <section
      class="
        data-section
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

      <!-- create-pin form renders when step is 1
         send-pin event is emitted when the form is submitted
         the event is emittted with the phone number as an parameter
     -->
      <create-pin v-if="step === 3" @send-pin="sendPin($event)">
        <template #notificationMessage>
          You have successfully set your PIN. Click Ok to continue.
        </template>
      </create-pin>
    </section>
  </div>
</template>

<script>
import CreatePin from '~/components/CustomerRegistrationForms/CreatePin.vue'
import Otp from '~/components/CustomerRegistrationForms/Otp.vue'
import PhoneNumber from '~/components/CustomerRegistrationForms/PhoneNumber.vue'
import AppStepper from '~/components/AppStepper.vue'

export default {
  components: { CreatePin, Otp, PhoneNumber, AppStepper },
  layout: 'default-navigation',
  data() {
    return {
      step: 1,
    }
  },
  head: {
    title: 'NovaGas Retail Portal- New Customer Create Pin',
    meta: [
      {
        hid: 'new customer create pin',
        name: 'new customer create pin',
        content: 'NovaGas Retailer Creates Pin for New Customer',
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
          return 'forgot-pin-profile-icon'
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
    sendPin(pin) {
      this.$store.dispatch('customerRegistration/setPin', { pin })
    },
  },
}
</script>
