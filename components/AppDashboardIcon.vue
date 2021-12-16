<template>
  <div class="w-full h-full cursor-pointer">
    <div
      class="
        bg-blue-gradient
        flex
        justify-center
        h-32
        border
        rounded-lg
        shadow-lg
        mb-3
      "
      @click="$router.push(link)"
    >
      <div class="self-center">
        <img
          :src="require(`~/assets/icons/${image}.png`)"
          alt="sales-and-exchange-icon"
        />
      </div>
    </div>
    <p class="h-7 ff-roboto uppercase text-xs text-tangaroa text-center md:h-8">
      {{ label }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
}
</script>
