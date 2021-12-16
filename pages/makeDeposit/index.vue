<template>
  <div
    class="
      flex
      bg-whisper35
      min-h-navbarless
      w-full
      overflow-hidden
      ff-poppins
      text-tangaroa text-base text-center
      font-medium
    "
  >
    <div class="w-1/3 flex justify-center">
      <div class="self-center">
        <h2 class="text-center text-2xl pb-11">MAKE DEPOSIT</h2>
        <img
          src="@/assets/icons/nova-cylinder-icon.png"
          alt="nova-cylinder-icon"
        />
      </div>
    </div>
    <section
      class="w-full bg-white filter drop-shadow pb-12 rounded-l-xl relative"
    >
      <the-nav-menu />
      <div class="flex justify-center text-center h-full">
        <div class="self-center">
          <p class="mx-auto font-light w-84">
            Customer must make a deposit to Activate Account.<br /><br />
            Deposit can either be Cash or a Cylinder.
          </p>
          <p class="py-6">
            Click on the preferred deposit the icon below to continue
          </p>
          <div class="flex justify-center mt-5">
            <div
              class="
                shadow-base
                w-38
                rounded-xl
                h-51
                cursor-pointer
                depositCash
              "
              @click="depositCash"
            >
              <div
                class="
                  mx-auto
                  my-4
                  bg-blue-gradient
                  w-30
                  h-30
                  rounded-xl
                  relative
                "
              >
                <img
                  src="@/assets/icons/deposit-cash.png"
                  alt="deposit-cash-icon"
                  class="absolute top-4 left-1"
                />
              </div>

              <span class="block px-6 py-4">DEPOSIT CASH</span>
            </div>
            <div
              class="
                shadow-base
                ml-6
                w-38
                rounded-xl
                h-51
                cursor-pointer
                depositCylinder
              "
              @click="depositCylinder"
            >
              <div
                class="
                  mx-auto
                  my-4
                  bg-blue-gradient
                  w-30
                  h-30
                  rounded-xl
                  relative
                "
              >
                <img
                  src="@/assets/icons/deposit-cylinder.png"
                  alt="deposit-cylinder-icon"
                  class="absolute left-4 top-2"
                />
              </div>

              <span class="block px-6 py-4">DEPOSIT CYLINDER</span>
            </div>
          </div>
        </div>
      </div>
      <img
        src="@/assets/icons/svg/contact-support-icon.svg"
        alt="contact-support-icon "
        class="block absolute bottom-10 right-12"
      />
    </section>
  </div>
</template>

<script>
import TheNavMenu from '~/components/TheNavMenu'

export default {
  components: {
    TheNavMenu,
  },
  layout: 'default-navigation',
  head: {
    title: 'NovaGas Retail Portal- Customer Make Deposit',
    meta: [
      {
        hid: 'login',
        name: 'login',
        content: 'NovaGas Retailer Customer Makes Deposit',
      },
    ],
  },
  methods: {
    depositCash() {
      this.$router.push('/cashDeposit')
    },
    depositCylinder() {
      this.$router.push('/depositCylinder')
    },
  },
}
</script>
