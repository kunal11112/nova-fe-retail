<template>
  <div class="bg-whisper35 min-h-navbarless w-full flex body-height">
    <div class="w-1/3 flex flex-col justify-center items-center">
      <app-stepper :steps="3" :current-step="3" />
      <img
        v-show="!pictureTaken"
        src="~/assets/icons/user-icon.png"
        alt="user-icon"
        class="mt-11 mx-auto"
      />
      <canvas
        v-show="pictureTaken"
        id="photo"
        ref="sideCanvas"
        width="238"
        class="mx-auto mt-11 border rounded-xl canvas"
      />
      <p
        class="
          mt-3
          mb-6
          mx-auto
          text-center text-tangaroa text-sm
          ff-poppins
          font-medium
        "
      >
        Verify ID Details
      </p>
      <form class="w-73 mx-auto" @submit="submitForm($event)">
        <app-input
          v-model="idDetails.cardName"
          :disable="true"
          :scanned-input-style="scannedInputFieldBackgroundColor"
          :has-label="true"
          type="text"
          name="cardName"
          label="Name on Card"
        />
        <app-input
          v-model="idDetails.cardNumber"
          :disable="true"
          :scanned-input-style="scannedInputFieldBackgroundColor"
          :has-label="true"
          type="text"
          name="cardNumber"
          label="Card #"
        />
        <app-input
          v-model="idDetails.expiryDate"
          :disable="true"
          :scanned-input-style="scannedInputFieldBackgroundColor"
          :has-label="true"
          type="text"
          name="expiryDate"
          label="Expiry YYYY-MM-DD"
        />
        <app-button
          :use-scan-color="true"
          :is-scanned="pictureTaken"
          type="submit"
          label="Verify"
          class="mt-6"
        />
      </form>
    </div>
    <section
      class="
        w-full
        rounded-l-xl
        bg-white
        filter
        drop-shadow
        flex flex-col
        items-center
        justify-center
      "
    >
      <div class="self-center">
        <img
          v-show="showFrame"
          src="~/assets/icons/svg/scan-id-frame.svg"
          alt="scan-frame"
          class="mx-auto"
        />
        <video
          v-show="!pictureTaken && !showFrame"
          id="camera"
          ref="camera"
          width="800"
          height="500"
          class="border rounded-xl bg-whisper mx-auto"
          autoplay
        />
        <canvas
          v-show="pictureTaken && !showFrame"
          id="photo"
          ref="canvas"
          width="800"
          height="500"
          class="border rounded-xl bg-whisper mx-auto"
        />
        <div class="grid grid-cols-2 gap-6 mt-16">
          <app-button
            :label="buttonLabel"
            color="blue"
            class="capture-btn"
            @click="showFrame ? (showFrame = false) : takePhoto()"
          />
          <app-button
            label="Cancel"
            :outlined="true"
            @click="
              showFrame = true
              pictureTaken = false
            "
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import AppButton from '~/components/AppButton.vue'
import AppInput from '~/components/AppInput.vue'
import AppStepper from '~/components/AppStepper.vue'

export default {
  components: { AppButton, AppInput, AppStepper },
  layout: 'default-navigation',
  data() {
    return {
      idDetails: { cardNumber: ' ', cardName: '', expiryDate: '' },
      pictureTaken: false,
      showFrame: true,
    }
  },
  head: {
    title: 'NovaGas Retail Portal- Customer Registration',
    meta: [
      {
        hid: 'registration id',
        name: 'registration id',
        content: 'NovaGas Retailer Customer Registration',
      },
    ],
  },
  computed: {
    scannedInputFieldBackgroundColor() {
      if (this.pictureTaken) {
        return 'bg-white uppercase'
      }
      return 'bg-grey-30'
    },
    buttonLabel() {
      if (this.showFrame) {
        return 'Start Scanning'
      } else if (this.pictureTaken) {
        return 'Rescan'
      } else return 'Capture'
    },
  },
  mounted() {
    const constraints = (window.constraints = { audio: false, video: true })
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => (this.$refs.camera.srcObject = stream))
      .catch((error) => alert(`${error.message}`))
  },
  methods: {
    submitForm(e) {
      e.preventDefault()
      if (this.pictureTaken) {
        this.$router.push('/makedeposit')
      } else this.$router.go(0)
    },
    takePhoto() {
      this.pictureTaken = !this.pictureTaken
      this.$refs.canvas
        .getContext('2d')
        .drawImage(this.$refs.camera, 0, 0, 800, 500)

      this.$refs.sideCanvas
        .getContext('2d')
        .drawImage(this.$refs.camera, 0, 0, 300, 150)
      if (this.pictureTaken) {
        this.idDetails = {
          cardNumber: 'ADL-23101985-10122',
          cardName: 'LARYEA ADOLPHUS',
          expiryDate: '2025-03-25',
        }
      } else this.idDetails = { cardNumber: '', cardName: '', expiryDate: '' }
    },
  },
}
</script>
