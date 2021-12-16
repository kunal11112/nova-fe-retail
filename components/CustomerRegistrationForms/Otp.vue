<template>
  <div
    class="
      flex flex-col
      justify-center
      items-center
      text-center text-tangaroa text-base
    "
  >
    <p class="font-light pb-6 w-96">
      <span class="font-medium">Enter One-time Password</span>
      <br /><br />
      Please enter the 6-digit One-time password (OTP) sent to the customers
      phone to complete the sign up process.
    </p>
    <form class="w-73" @submit="handleSubmit($event)">
      <the-otp-input @sendOtp="handleOtp" />
      <app-button
        label="Submit"
        type="submit"
        class="mt-10 mb-6"
        color="blue"
      />
      <app-button
        label="Resend OTP"
        :outlined="true"
        @click="showOtpError = true"
      />
      <app-modal
        v-if="showOtpError"
        class="absolute z-50"
        color="blue"
        @close="showOtpError = false"
        @action="showOtpError = false"
      >
        <template #image>
          <img src="~/assets/icons/error-icon.png" alt="error-icon" />
        </template>

        <template #subject> OTP Error </template>

        <template #message>
          You have entered an invalid OTP. Please enter a valid OTP.
        </template>
      </app-modal>
    </form>
  </div>
</template>

<script>
import AppModal from '~/components/AppModal.vue'
import TheOtpInput from '~/components/TheOTPInput.vue'
import AppButton from '~/components/AppButton.vue'

export default {
  components: {
    AppButton,
    AppModal,
    TheOtpInput,
  },
  layout: 'default-navigation',
  data() {
    return {
      otp: '',
      showOtpError: false,
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.$emit('send-otp', { otp: this.otp })
    },
    handleOtp(value) {
      this.otp = value
    },
  },
}
</script>
