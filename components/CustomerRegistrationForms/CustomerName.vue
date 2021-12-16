<template>
  <validation-observer ref="form">
    <p class="text-center text-tangaroa text-base ff-poppins font-medium mb-4">
      Enter Customers Name
    </p>

    <form class="w-73" @submit="handleSubmit($event)">
      <validation-provider
        v-slot="{ errors }"
        name="first name"
        rules="required|alpha"
      >
        <app-input
          v-model="firstName"
          name="first name"
          label="First Name"
          :regular="true"
        />
        <small class="text-red">{{ errors[0] }}</small>
      </validation-provider>

      <validation-provider
        v-slot="{ errors }"
        name="last name"
        rules="required|alpha"
      >
        <app-input
          v-model="lastName"
          name="last name"
          label="Last Name"
          :regular="true"
          class="mt-4"
        />
        <small class="text-red w-73">{{ errors[0] }}</small>
      </validation-provider>
      <app-button label="Complete" class="mt-4" type="submit" color="blue" />
    </form>
    <app-modal
      v-if="registrationSuccess"
      class="absolute z-50"
      color="blue"
      @action="$router.push('/registerclient/idcard')"
      @close="registrationSuccess = false"
    >
      <template #image>
        <img src="~/assets/icons/success-icon.png" alt="error-icon" />
      </template>

      <template #subject> Success </template>

      <template #message>
        Scan a valid national ID to complete registration
      </template>
    </app-modal>
  </validation-observer>
</template>

<script>
import {
  ValidationObserver,
  ValidationProvider,
} from 'vee-validate/dist/vee-validate.full'
import AppButton from '~/components/AppButton.vue'
import AppInput from '~/components/AppInput.vue'
import AppModal from '~/components/AppModal.vue'

export default {
  components: {
    AppButton,
    AppInput,
    AppModal,
    ValidationObserver,
    ValidationProvider,
  },
  layout: 'default-navigation',
  data() {
    return {
      firstName: '',
      lastName: '',
      registrationSuccess: false,
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.$refs.form.validate().then((success) => {
        if (success) {
          this.$emit('send-name', {
            name: { firstName: this.firstName, lastName: this.lastName },
          })
          this.registrationSuccess = true
        }
      })
    },
  },
}
</script>
