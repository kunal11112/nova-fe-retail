<template>
  <div class="bg-whisper35 min-h-navbarless w-full flex overflow-hidden">
    <div class="h-52 w-1/3 flex justify-center self-center"></div>
    <section class="w-full bg-white filter drop-shadow rounded-l-xl">
      <the-nav-menu />
      <div
        class="
          -ml-16
          bg-tangaroa
          h-32
          w-32
          rounded-full
          flex
          justify-center
          cursor-pointer
          self-start
          register-client-button
        "
        @click="$router.push('/registerclient')"
      >
        <img
          src="~/assets/icons/add-client-icon.png"
          alt="add-client-icon"
          class="w-12 self-center"
        />
      </div>
      <div class="flex justify-center py-36">
        <div class="grid grid-cols-3 gap-x-20 gap-y-9 pb-1 icons-grid">
          <div
            v-for="(item, index) in dashboardIcon"
            :key="index"
            class="w-32 cursor-pointer"
          >
            <app-dashboard-icon
              :label="item.label"
              :image="item.image"
              :link="item.link"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import AppDashboardIcon from '~/components/AppDashboardIcon.vue'
import TheNavMenu from '~/components/TheNavMenu.vue'
export default {
  components: {
    AppDashboardIcon,
    TheNavMenu,
  },
  layout: 'default-navigation',
  data() {
    return {
      dashboardIcon: [
        {
          label: 'Sales and Exchange',
          image: 'sales-exchange-dashboard-icon',
          link: '/depositcylinder/',
        },
        {
          label: 'Online Order',
          image: 'online-order-dashboard-icon',
          link: '/onlineorder/',
        },
        {
          label: 'Product Request',
          image: 'product-request-dashboard-icon',
          link: '/productrequest/',
        },
        {
          label: 'Reports',
          image: 'reports-dashboard-icon',
          link: '/reports/',
        },
        {
          label: 'Inventory',
          image: 'inventory-dashboard-icon',
          link: '/inventory/',
        },
        {
          label: 'Door To Door Delivery',
          image: 'delivery-dashboard-icon',
          link: '/doordelivery/',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.register-client-button {
  position: absolute;
  top: calc(50% - 112px);
  background: $color-blue-gradient;
}

.icons-grid {
  position: absolute;
  top: calc(50% - 200px);
}
</style>
