<template>
  <header
    class="navbar bg-tangaroa px-10 h-16 flex justify-between"
    aria-label="main-nav"
  >
    <img
      src="~/assets/icons/nova-navbar-logo.png"
      alt="navbar-logo"
      class="self-center nova-logo cursor-pointer"
      @click="$router.push('/dashboard')"
    />
    <div class="flex self-center">
      <img
        src="~/assets/icons/svg/cart-nav-icon.svg"
        alt="cart-nav-icon"
        class="self-center pr-6"
      />
      <img
        src="~/assets/icons/retailer-photo.png"
        alt="retailer-photo-icon"
        class="mr-2"
      />
      <p class="self-center text-white text-xs ff-poppins">Isaac Ninson</p>
    </div>
  </header>
</template>

<script>
export default {}
</script>
