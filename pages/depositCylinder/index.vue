<template>
  <div>
    <div class="flex justify-center border border-b-4 p-6">
      <div class="self-center">
        <!-- video stream active when pictureTaken is false -->
        <video
          v-show="!pictureTaken"
          id="camera"
          ref="camera"
          width="656"
          height="326"
          class="border rounded-xl bg-whisper w-full h-full"
          autoplay
        />

        <!-- canvas draws the image on the screen after the camera captures it
          It is active when the picture has been taken -->
        <div v-show="pictureTaken" class="relative w-full">
          <canvas
            id="photo"
            ref="canvas"
            width="656"
            height="326"
            class="border rounded-xl bg-whisper"
          />

          <!-- click this tag to route to cylinder select page -->
          <img
            src="~/assets/icons/svg/route-to-select-cylinder.svg"
            alt="route-to-select-cylinder"
            class="
              select-cylinder-size-image
              absolute
              bottom-7
              w-1/2
              inset-x-0
              mx-auto
              cursor-pointer
            "
            @click="$router.push('/depositcylinder/selectCylinderSize')"
          />
        </div>
      </div>
    </div>

    <!-- when the picture is not taken the button's label is "Scan Deposit Cylinder"
    while its color is 'blue' when the picture is taken the button's label is
    "Rescan Deposit Cylinder" and the color is 'faded-blue' -->
    <app-button
      :label="captureButtonLabel"
      :color="buttonColor"
      class="w-73 mx-auto mt-12 capture-btn"
      @click="takePhoto"
    />
  </div>
</template>

<script>
import AppButton from '~/components/AppButton.vue'
export default {
  name: 'DepositCylinder',
  components: { AppButton },
  layout: 'deposit-pages-layout',
  data() {
    return {
      pictureTaken: false,
      depositor: {
        name: 'Nii Laryea',
        userId: 'AMM1030420',
      },
    }
  },
  head: {
    title: 'NovaGas Retail Portal- Scan Customer Deposit Cylinder',
    meta: [
      {
        hid: 'scan cylinder',
        name: 'scan cylinder',
        content: "NovaGas Retailer Scans Customer's Deposit Cylinder",
      },
    ],
  },
  computed: {
    buttonColor() {
      if (this.pictureTaken) {
        return 'faded-blue'
      }
      return 'blue'
    },
    captureButtonLabel() {
      if (this.pictureTaken) {
        return 'Rescan Deposit Cylinder'
      }
      return 'Scan Deposit Cylinder'
    },
  },
  mounted() {
    this.startVideoStream()
  },
  methods: {
    // take photo is called to take a picture and draw the image on the canvas and toggle the value of pictureTaken
    takePhoto() {
      this.pictureTaken = !this.pictureTaken
      const context = this.$refs.canvas.getContext('2d')
      context.drawImage(this.$refs.camera, 0, 0, 800, 500)
    },
    startVideoStream() {
      const constraints = (window.constraints = { audio: false, video: true })
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => (this.$refs.camera.srcObject = stream))
        .catch((error) => alert(`${error.message}`))
    },
  },
}
</script>
