<template>
  <table>
    <caption>
      {{
        caption
      }}
    </caption>
    <tr :class="headClass">
      <th
        v-for="(column, index) in columns"
        :id="column"
        :key="index"
        :class="column.style"
        class="self-center mx-7"
      >
        {{ column.title }}
      </th>
    </tr>
    <tr
      v-for="(data, index) in dataItems"
      :id="data"
      :key="index"
      :class="[bodyClass, index === dataItems.length - 1 ? 'rounded-b-lg' : '']"
    >
      <slot :row="data"></slot>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'AppDataTable',
  props: {
    caption: { type: String, default: '' },

    // array of table columns and their titles to be displayed in the head
    columns: { type: Array, required: true },

    // array of data to be displayed in the rows
    dataItems: { type: Array, required: true },

    // prop to hold utility classes for styling the table's head
    headClass: { type: String, required: true },

    // prop to hold utility classes for styling the table's body
    bodyClass: { type: String, required: true },
  },
}
</script>
