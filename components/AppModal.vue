<template>
  <section class="fixed -top-16 -left-1/3 overflow-x-hidden overflow-y-auto">
    <div class="flex justify-center h-screen relative w-screen m-auto">
      <div class="self-center bg-white rounded-lg z-50 w-84 h-auto m-auto">
        <div
          class="
            close-btn
            cursor-pointer
            w-full
            flex
            justify-end
            text-tangaroa text-3xl
            mt-5
            pr-6
          "
          @click="$emit('close')"
        >
          &times;
        </div>
        <div class="w-full mt-7 flex justify-center">
          <slot name="image"></slot>
        </div>
        <p
          class="
            w-full
            mt-7
            text-center text-tangaroa text-sm
            ff-poppins
            font-bold
          "
        >
          <slot name="subject"></slot>
        </p>
        <div class="mt-4 flex justify-center">
          <p
            class="
              w-64
              h-24
              self-center
              text-xs text-center text-tangaroa
              ff-poppins
              font-light
            "
          >
            <slot name="message"></slot>
          </p>
        </div>
        <div class="px-6 my-6 flex justify-center">
          <app-button
            label="Ok"
            class="w-full self-center ok-button"
            :color="color"
            @click="$emit('action')"
          />
        </div>
      </div>
    </div>
    <div
      class="
        backdrop
        z-40
        fixed
        -top-16
        -left-1/3
        w-screen
        h-screen
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
  name: 'AppAccessoryInfo',
  components: { AppButton },
  props: {
    color: { type: String, default: '' },
  },
}
</script>
