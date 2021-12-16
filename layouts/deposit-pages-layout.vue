<template>
  <main class="overflow-hidden">
    <the-navbar />
    <div class="bg-whisper35 min-h-navbarless w-full flex">
      <!-- app depositor component displays customer's profile info with customer's photograph -->
      <aside class="w-1/3 flex justify-center">
        <app-depositor :user="user" class="mx-auto self-center" />
      </aside>
      <section class="w-full bg-white filter drop-shadow rounded-l-xl relative">
        <the-nav-menu />
        <!-- main page display -->
        <nuxt />

        <!-- contact support button -->
        <img
          class="w-16 h-20 absolute bottom-9 right-16"
          src="@/assets/icons/svg/contact-support-icon.svg"
          alt="support-icon"
        />
      </section>
    </div>
  </main>
</template>

<script>
import AppDepositor from '~/components/AppDepositor'
export default {
  components: { AppDepositor },
  data() {
    return {
      user: {
        name: 'Nii Laryea',
        userId: 'AMM1030420',
      },
    }
  },
}
</script>
