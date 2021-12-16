<template>
  <div
    class="flex justify-center ff-poppins text-tangaroa text-base"
    :class="{ 'pb-56': dataItems.length < 2 }"
  >
    <app-data-table
      :data-items="dataItems"
      :head-class="headClass"
      :body-class="bodyClass"
      :columns="columns"
    >
      <template slot-scope="{ row }">
        <td v-show="showScanned" class="flex self-center mx-7 w-20">
          <img
            src="~/assets/icons/success-icon.png"
            alt="success"
            class="w-5 mr-2 self-center scan-check-icon"
          />
          <p class="text-ferra text-xs self-center">Scanned</p>
        </td>
        <td class="self-center mx-7 w-32">
          <filled-cylinder-avatar />
        </td>
        <td
          class="
            flex
            justify-center
            self-center
            mx-7
            w-28
            text-ferra text-base
            description
          "
        >
          {{ row.weight }}/{{ row.name }}
        </td>
        <td
          class="
            flex
            justify-center
            self-center
            mx-7
            w-20
            font-semibold
            quantity
          "
        >
          {{ row.quantity }}
        </td>
        <td
          class="flex justify-center self-center mx-7 w-32 font-semibold price"
        >
          GHS {{ row.totalPrice }}
        </td>
        <td class="flex self-center mx-7 w-3">
          <img
            src="~/assets/icons/svg/delete-icon.svg"
            alt="delete-icon"
            class="w-4 delete-icon"
            @click="$emit('reduceItemQuantity', row)"
          />
        </td>
      </template>
    </app-data-table>
  </div>
</template>

<script>
import FilledCylinderAvatar from '~/components/FilledCylinderAvatar.vue'
import AppDataTable from '~/components/AppDataTable.vue'
export default {
  components: { AppDataTable, FilledCylinderAvatar },
  props: {
    // array of table columns and their titles to be displayed in the head
    columns: { type: Array, required: true },

    // array of data to be displayed in the rows
    dataItems: { type: Array, required: true },

    // prop to hold utility classes for styling the table's head
    headClass: { type: String, required: true },

    // prop to hold utility classes for styling the table's body
    bodyClass: { type: String, required: true },

    showScanned: { type: Boolean, default: true },
  },
}
</script>
