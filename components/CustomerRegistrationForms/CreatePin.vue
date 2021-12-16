<template>
  <validation-observer ref="form">
    <form class="w-73" @submit="handleSubmit($event)">
      <p
        class="text-center text-tangaroa text-base ff-poppins font-medium mb-4"
      >
        Create a New PIN
      </p>
      <validation-provider
        v-slot="{ errors }"
        rules="required|numeric|confirmed:confirm"
        name="new pin"
      >
        <app-input
          v-model="newPin"
          type="text"
          name="new-pin"
          label="Create New PIN"
          :regular="true"
          class="mx-auto"
        />
        <small class="text-red w-73">{{ errors[0] }}</small>
      </validation-provider>
      <validation-provider
        v-slot="{ errors }"
        rules="required|numeric"
        name="confirm pin"
        vid="confirm"
      >
        <app-input
          v-model="confirmPin"
          type="text"
          name="confirm-pin"
          label="Confirm PIN"
          :regular="true"
          class="mt-4 mx-auto"
        />
        <small class="text-red w-73">{{ errors[0] }}</small>
      </validation-provider>
      <app-button
        label="Continue"
        type="submit"
        class="w-73 mt-4"
        color="blue"
      />
    </form>
    <app-modal
      v-if="showSuccessMessage"
      class="absolute z-50"
      color="blue"
      @action="navigateToLogin"
      @close="showSuccessMessage = false"
    >
      <template #image>
        <img src="~/assets/icons/success-icon.png" alt="success-icon" />
      </template>

      <template #subject> Success </template>

      <template #message>
        <slot name="notificationMessage" />
      </template>
    </app-modal>
  </validation-observer>
</template>

<script>
import {
  ValidationObserver,
  ValidationProvider,
} from 'vee-validate/dist/vee-validate.full'
import AppButton from '~/components/AppButton'
import AppInput from '~/components/AppInput'
import AppModal from '~/components/AppModal'

export default {
  name: 'NewUserCreatePin',
  components: {
    AppButton,
    AppInput,
    AppModal,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      type: 'text',
      newPin: '',
      confirmPin: '',
      showSuccessMessage: false,
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.$refs.form.validate().then((success) => {
        if (success) {
          this.$emit('send-pin', this.newPin)
          this.showSuccessMessage = true
        }
      })
    },
    navigateToLogin() {
      this.$router.push('/')
    },
  },
}
</script>
