<template>
  <div class="bg-blue-gradient min-h-screen flex flex-col items-center">
    <img
      src="~/assets/icons/nova-logo-reverse.png"
      alt="nova-logo"
      class="mx-auto nova-header pt-52"
    />
    <p
      class="
        flex
        justify-center
        mt-16
        font-normal
        ff-poppins
        leading-6
        mb-5
        text-base text-white
      "
    >
      Sign In To NovaGas Retail Portal
    </p>
    <validation-observer>
      <form class="form w-73" @submit.prevent="handleSubmit">
        <validation-provider
          v-slot="{ errors }"
          name="phone number"
          rules="required|numeric"
        >
          <app-input
            v-model="phoneNumber"
            name="phone number"
            label="Phone Number"
            type="text"
            :login="true"
          />
          <small class="text-red">{{ errors[0] }}</small>
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          name="pin"
          rules="required|numeric"
        >
          <app-input
            v-model="pin"
            name="pin"
            label="PIN"
            type="password"
            :login="true"
            class="mt-6"
          />
          <small class="text-red">{{ errors[0] }}</small>
        </validation-provider>
        <app-button type="submit" label="Login" color="grey" class="mt-6" />
        <app-button
          label="new user?"
          class="text-white new-user mt-2"
          @click="$router.push('/newUserCreatePin')"
        />
        <app-button
          label="Forgot Password"
          :login-outlined="true"
          class="forgot-password mt-8"
          @click="$router.push('/forgotPin')"
        />
      </form>
    </validation-observer>
    <section class="cylinders inline-block absolute bottom-9 right-0">
      <div class="flex justify-end">
        <div class="flex h-72 w-72">
          <div class="self-end">
            <img
              src="~/assets/icons/nova-cylinder-icon-lg.png"
              alt="nova cylinder icon"
            />
          </div>
          <div class="-ml-36 self-end">
            <img
              src="~/assets/icons/nova-cylinder-icon-sm.png"
              alt="nova cylinder icon"
              class="h-40"
            />
          </div>
        </div>
      </div>
    </section>
    <app-modal
      v-if="showLoginError"
      class="absolute z-50"
      color="blue"
      @close="showLoginError = false"
    >
      <template #image>
        <img src="~/assets/icons/error-icon.png" alt="error-icon" />
      </template>

      <template #subject> Login Error </template>

      <template #message>
        You have provided an invalid information. Please enter the right
        information or call
        <span class="font-bold">+233 302 428 550</span> for assistance.
      </template>
    </app-modal>
  </div>
</template>

<script>
import {
  ValidationProvider,
  ValidationObserver,
} from 'vee-validate/dist/vee-validate.full'
import AppButton from '~/components/AppButton.vue'
import AppInput from '~/components/AppInput.vue'
import AppModal from '~/components/AppModal.vue'
export default {
  components: {
    AppButton,
    AppInput,
    AppModal,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      phoneNumber: '',
      pin: '',
      showLoginError: false,
    }
  },
  head: {
    title: 'NovaGas Retail Portal- Login',
    meta: [
      {
        hid: 'login',
        name: 'login',
        content: 'NovaGas Retailer Login',
      },
    ],
  },
  methods: {
    handleSubmit() {
      this.$router.push('/dashboard')
    },
  },
}
</script>
