<template>
  <div class="bg-whisper35 min-h-navbarless flex body-height">
    <div class="w-1/3 self-center">
      <app-stepper
        :steps="2"
        :current-step="step"
        @change-step="changeStep($event)"
      />
      <img
        :src="require(`~/assets/icons/${sideIcon}.png`)"
        alt="phone-icon"
        class="mx-auto my-11"
      />
      <div v-if="step === 2">
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
      <!-- otp form renders when step is 2
         send-otp event is emitted when the form is submitted
         the event is emittted with the otp as an parameter
    -->
      <otp v-if="step === 1" @send-otp="sendOtp($event)" />

      <!-- create-pin form renders when step is 1
         send-pin event is emitted when the form is submitted
         the event is emittted with the phone number as an parameter
     -->
      <create-pin v-if="step === 2" @send-pin="sendPin($event)">
        <template #notificationMessage>
          You have successfully changed your PIN. Click Ok to continue.
        </template>
      </create-pin>
    </section>
  </div>
</template>

<script>
import CreatePin from '~/components/CustomerRegistrationForms/CreatePin.vue'
import Otp from '~/components/CustomerRegistrationForms/Otp.vue'
import AppStepper from '~/components/AppStepper.vue'

export default {
  components: { CreatePin, Otp, AppStepper },
  layout: 'default-navigation',
  data() {
    return {
      OTP: null,
      showOTPError: false,
      step: 1,
    }
  },
  head: {
    title: 'NovaGas Retail Portal- Forgot Pin',
    meta: [
      {
        hid: 'retailer forgot pin',
        name: 'retailer forgot pin',
        content: 'NovaGas Retailer- Retailer Forgot Pin',
      },
    ],
  },
  computed: {
    // this method toggles the icon displayed to the left of the screen according to the current step
    sideIcon() {
      if (this.step === 1) return 'password-key-icon'
      else return 'forgot-pin-profile-icon'
    },
  },
  methods: {
    // this method sets the current step of the process the user is on
    changeStep(step) {
      this.step = step
    },
    sendOtp(otp) {
      this.$store.dispatch('customerRegistration/setOtp', otp)
      this.changeStep(2)
    },
    sendPin(pin) {
      this.$store.dispatch('customerRegistration/setPin', { pin })
    },
  },
}
</script>
