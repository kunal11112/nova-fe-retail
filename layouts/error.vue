<template>
  <main
    class="
      h-screen
      flex flex-col
      justify-center
      items-center
      overflow-hidden
      w-screen
      text-tangaroa
    "
  >
    <div v-if="error.statusCode === 404" class="flex justify-center">
      <h1 class="border-r border-tangaroa text-2xl font-medium pr-6">404</h1>
      <h2 class="self-center pl-6">This page could not be found</h2>
    </div>
    <h1 v-else class="flex justify-center">An error occurred</h1>
    <NuxtLink class="flex justify-center font-medium mt-10 underline" to="/"
      >Home page</NuxtLink
    >
  </main>
</template>

<script>
export default {
  props: {
    error: { type: Object, required: true },
  },
}
</script>
