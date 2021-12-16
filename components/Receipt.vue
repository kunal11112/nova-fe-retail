<template>
  <div class="mt-12 mb-9">
    <div
      id="print-view"
      class="w-80 mx-auto text-sm text-center ff-poppins text-tangaroa"
    >
      <img
        src="~/assets/icons/svg/group-successful-transaction.svg"
        alt=""
        class="w-16 mb-3 mx-auto"
      />
      <h1 class="ff-great-vibes text-3xl text-black mb-2 heading">Thank You</h1>
      <p class="font-medium success">Your transaction was successful</p>

      <!-- transaction id -->
      <h5 class="text-xs font-medium mb-1 id">521265421</h5>

      <!-- transaction date -->
      <p
        class="p-2 mb-3 border-t border-b border-tangaroa text-left font-light"
      >
        6 June, 2020<span class="float-right">11:28 am</span>
      </p>
      <p class="px-2 mb-1 text-right font-light">
        <span class="font-medium float-left">FROM</span> Cantonments NovaGas
        Point
      </p>
      <p class="px-2 pb-3 mb-7 border-b border-tangaroa text-right font-light">
        <span class="font-medium float-left">TELEPHONE</span> +233 5543231233
      </p>

      <!-- rendered if isCylinderDeposit prop is set to true -->
      <div v-if="isCylinderDeposit" class="font-normal">
        <!-- renders list of cylinders deposited by customer -->
        <div
          v-for="(item, index) in cylinderDeposit"
          :key="`deposit ${index}`"
          class="grid grid-cols-12"
        >
          <div class="col-span-8 place-self-start deposit-name">
            {{ item.weight }} {{ item.name }} Cylinder Deposit
          </div>
          <div class="col-span-1 deposit-quant">{{ item.quantity }}</div>
        </div>
      </div>

      <!-- rendered if is cashDeposit prop is set to true -->
      <div v-if="isCashDeposit" class="font-normal grid grid-cols-12">
        <div class="col-span-8 place-self-start cash-deposit-name">
          Initial Cash Deposit
        </div>
        <div class="col-span-1"></div>
        <div class="col-span-3 cash-deposit-amount">
          GHS {{ cashDeposit }}.00
        </div>
      </div>

      <!-- renders list of filled cylinders -->
      <div
        v-for="(item, index) in filledCylinders"
        :key="`refill ${index}`"
        class="grid grid-cols-12"
      >
        <div class="col-span-8 place-self-start refill-name">
          {{ item.weight }} {{ item.name }} Cylinder Refill
        </div>
        <div class="col-span-1 refill-quant">{{ item.quantity }}</div>
        <div class="col-span-3 place-self-end refill-price">
          GHs {{ item.totalPrice }}.00
        </div>
      </div>

      <div class="grid grid-cols-12 mb-7">
        <div class="col-span-8 place-self-start">Delivery</div>
        <div class="col-span-1"></div>
        <div class="col-span-3 place-self-end">GHs 75.00</div>
      </div>
      <div
        class="
          border border-whisper
          h-15
          p-3
          mb-5
          flex
          justify-between
          text-base
          font-medium
        "
      >
        <div class="flex self-center">
          <img src="~/assets/icons/svg/remcash.svg" alt="remcash" class="w-8" />
          <p class="font-normal ml-1 self-center">Remcash</p>
        </div>
        <div class="self-center">
          <h4>TOTAL</h4>
          <p>{{ orderTotal }}.00</p>
        </div>
      </div>
      <p class="font-light text-xs pb-5 border-b border-tangaroa">
        Your Order will be delivered within the next 24Hrs
      </p>
    </div>

    <!-- click to print receipt -->
    <div
      class="p-3 border-b border-ferra flex cursor-pointer print-receipt"
      @click="printArea"
    >
      <img src="~/assets/icons/svg/print-icon.svg" alt="" class="w-5 mr-7" />
      <p class="text-ferra font-medium text-sm">Print Receipt</p>
    </div>

    <div class="p-3 border-b border-ferra flex cursor-pointer send-email">
      <img src="~/assets/icons/svg/email-icon.svg" alt="" class="w-5 mr-7" />
      <p class="text-ferra font-medium text-sm">Send as email</p>
    </div>
  </div>
</template>

<script>
import html2pdf from 'html2pdf.js'
export default {
  props: {
    /*
     * filled cylinders purchased by customer loaded from store
     */
    filledCylinders: { type: Array, required: true },
    /*
     * cylinders deposited by customer loaded from store
     */
    cylinderDeposit: { type: Array, default: null },
    /*
     * customer's initial cash deposit loaded from store
     */
    cashDeposit: { type: Number, default: 100 },
    /*
     * total price to be paid by the customer loaded from store
     */
    orderTotal: { type: Number, required: true },
    /*
     * set to true if transaction is cash deposit
     */
    isCashDeposit: { type: Boolean, default: false },
    /*
     * set to true if transaction is cylinder deposit
     */
    isCylinderDeposit: { type: Boolean, default: false },
  },
  methods: {
    /*
     * called when customer clicks "Print Receipt"
     */
    printArea() {
      const printContent = document.getElementById('print-view')
      html2pdf(printContent)
    },
  },
}
</script>
