<template>
  <validation-observer ref="form">
    <form class="w-73" @submit="handleSubmit($event)">
      <p class="mb-4 text-center text-tangaroa text-base font-medium">
        Enter Customers Phone Number
      </p>
      <validation-provider
        v-slot="{ errors }"
        name="phone number"
        rules="required|numeric"
      >
        <app-input
          v-model="phoneNumber"
          name="phone number"
          label="Phone Number"
          :regular="true"
        />
        <small class="text-red w-73">{{ errors[0] }}</small>
      </validation-provider>
      <app-button label="Next" type="submit" class="my-4" color="blue" />
      <app-button
        label="Back"
        :outlined="true"
        class="back-button w-full"
        @click="$router.push('/dashboard')"
      />
    </form>
  </validation-observer>
</template>

<script>
import {
  ValidationProvider,
  ValidationObserver,
} from 'vee-validate/dist/vee-validate.full'
import AppButton from '~/components/AppButton.vue'
import AppInput from '~/components/AppInput.vue'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    AppButton,
    AppInput,
  },
  layout: 'default-navigation',
  data() {
    return {
      phoneNumber: '',
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.$refs.form.validate().then((success) => {
        if (success) {
          this.$emit('send-phone-number', {
            phoneNumber: this.phoneNumber,
          })
        }
      })
    },
  },
}
</script>
