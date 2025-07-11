<template>
  <div class="flex justify-center items-center gap-2 mt-6">
    <button
      class="px-3 py-1 rounded bg-gray-700 text-white hover:bg-yellow-500"
      :disabled="currentPage === 1"
      @click="$emit('update:page', currentPage - 1)"
    >
      &lt;
    </button>
    <span class="font-semibold text-yellow-400"
      >Trang {{ currentPage }} / {{ totalPages }}</span
    >
    <button
      class="px-3 py-1 rounded bg-gray-700 text-white hover:bg-yellow-500"
      :disabled="currentPage === totalPages"
      @click="$emit('update:page', currentPage + 1)"
    >
      &gt;
    </button>
  </div>
</template>

<script setup>
defineProps({
  currentPage: Number,
  totalPages: Number,
});
defineEmits(["update:page"]);
</script>
