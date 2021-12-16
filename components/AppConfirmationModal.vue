<template>
  <section class="fixed top-0 left-0 overflow-x-hidden overflow-y-auto">
    <div class="flex items-center min-h-screen">
      <div
        class="
          bg-white
          text-center text-tangaroa
          rounded-lg
          z-50
          w-82
          h-97
          mx-auto
          px-6
        "
      >
        <div
          class="
            close-btn
            w-full
            flex
            justify-end
            text-tangaroa text-3xl
            mt-5
            cursor-pointer
          "
          @click="$emit('close')"
        >
          &times;
        </div>
        <div class="w-full mt-4 flex justify-center">
          <slot name="image"></slot>
        </div>
        <p class="w-full mt-7 text-sm font-bold">
          <slot name="subject"></slot>
        </p>
        <div class="mt-4 flex justify-center">
          <p class="w-64 self-center text-xs font-light">
            <slot name="message"></slot>
          </p>
        </div>
        <app-button
          label="Cancel"
          color="blue"
          class="mt-3 cancel-btn"
          @click="$emit('close')"
        />
        <app-button
          label="Yes"
          type="submit"
          :outlined="true"
          class="mt-5 confirm-btn"
          @click="$emit('action')"
        />
      </div>
    </div>
    <div
      class="
        backdrop
        z-40
        fixed
        top-0
        w-screen
        min-h-screen
        bg-grey-50
        opacity-50
      "
      @click="$emit('close')"
    />
  </section>
</template>

<script>
import AppButton from '~/components/AppButton.vue'

export default {
  components: { AppButton },
}
</script>
