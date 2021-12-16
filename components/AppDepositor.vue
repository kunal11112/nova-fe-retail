<template>
  <div>
    <img
      src="~/assets/icons/user-white-background.png"
      alt="user-background"
      class="mx-auto mb-7"
    />
    <div class="flex justify-center">
      <div class="self-center">
        <h3
          class="
            app-depositor-user-name
            text-lg
            ff-poppins
            font-bold
            text-tangaroa text-center
          "
        >
          {{ user.name }}
        </h3>
        <h5
          class="
            app-depositor-user-userId
            text-sm
            ff-poppins
            font-medium
            text-teal
          "
        >
          {{ user.userId }}
        </h5>
      </div>
      <qrcode
        :value="user.userId"
        :size="64"
        background="transparent"
        class="pl-2 barcode"
      />
    </div>
  </div>
</template>

<script>
import Qrcode from 'qrcode.vue'
export default {
  name: 'AppDepositor',
  components: { Qrcode },
  props: {
    /*
     * information about the depositor
     * @properties userID, name
     */
    user: {
      type: Object,
      default: Object,
    },
  },
}
</script>
