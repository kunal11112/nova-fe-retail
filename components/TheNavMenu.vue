<template>
  <nav class="flex justify-end py-5 pr-10 border-gray-200 border-0 border-b-4">
    <ul class="self-center flex ff-poppins">
      <li
        v-for="(item, index) in navItems"
        :key="`nav-item${index}`"
        class="
          flex
          self-center
          cursor-pointer
          text-base
          hover:text-tangaroa
          group
        "
        :class="[
          $route.name == item.path ? 'text-tangaroa' : 'text-ferra',
          `${item.label}-nav-item`,
        ]"
        @click="
          item.label === 'Logout'
            ? (showLogoutModal = true)
            : $router.push(item.path)
        "
      >
        <div class="flex">
          <icons-base class="mr-2 self-start" view-box="0 0 20 20">
            <component :is="item.icon" />
          </icons-base>
          <p class="mr-2">{{ item.label }}</p>
        </div>
        <div v-if="index < navItems.length - 1" class="mr-2">
          <img src="@/assets/icons/line.png" alt="menu-line-icon" />
        </div>
      </li>
    </ul>
    <app-confirmation-modal
      v-if="showLogoutModal"
      class="absolute z-50 w-screen -left-1/3"
      @close="showLogoutModal = false"
      @action="$router.push('/')"
    >
      <template #image>
        <img src="~/assets/icons/error-icon.png" alt="error-icon" />
      </template>

      <template #subject> Logout </template>

      <template #message>
        <div>Are you sure you want to</div>
        <div class="font-medium text-tangaroa pb-3">Logout?</div>
      </template>
    </app-confirmation-modal>
  </nav>
</template>

<script>
import IconsBase from '~/components/IconsBase'
import ProfileIcon from '~/assets/icons/svg/components/ProfileIcon'
import SettingsIcon from '~/assets/icons/svg/components/SettingsIcon.vue'
import HomeIcon from '~/assets/icons/svg/components/HomeIcon.vue'
import LogoutIcon from '~/assets/icons/svg/components/LogoutIcon.vue'
import AppConfirmationModal from '~/components/AppConfirmationModal.vue'

export default {
  components: {
    IconsBase,
    ProfileIcon,
    SettingsIcon,
    HomeIcon,
    LogoutIcon,
    AppConfirmationModal,
  },
  data() {
    return {
      showLogoutModal: false,
      navItems: [
        { icon: HomeIcon, label: 'Home', path: '/dashboard' },
        { icon: SettingsIcon, label: 'Settings', path: '' },
        { icon: ProfileIcon, label: 'Profile', path: '' },
        { icon: LogoutIcon, label: 'Logout' },
      ],
    }
  },
}
</script>
