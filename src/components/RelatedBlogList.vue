<template>
  <div class="mt-12 space-y-8">
    <div>
      <h2 class="text-xl font-bold mb-4">Bài viết liên quan</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="post in related" :key="post.id" class="bg-white rounded shadow p-4 hover:shadow-lg transition">
          <div class="font-semibold text-gray-900 mb-1">{{ post.title }}</div>
          <div class="text-blue-600 text-sm mb-1 cursor-pointer hover:underline">{{ post.author }}</div>
          <div class="text-gray-500 text-xs mb-2">{{ post.time }}</div>
          <div class="flex items-center gap-3 text-gray-400 text-xs">
            <span><i class="fa fa-eye"></i> {{ post.views }}</span>
            <span><i class="fa fa-comments"></i> {{ post.comments }}</span>
            <span><i class="fa fa-bookmark"></i> {{ post.bookmarks }}</span>
            <span><i class="fa fa-heart"></i> {{ post.likes }}</span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h2 class="text-xl font-bold mb-4">Bài viết khác từ {{ author }}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="post in others" :key="post.id" class="bg-white rounded shadow p-4 hover:shadow-lg transition">
          <div class="font-semibold text-gray-900 mb-1">{{ post.title }}</div>
          <div class="text-blue-600 text-sm mb-1 cursor-pointer hover:underline">{{ post.author }}</div>
          <div class="text-gray-500 text-xs mb-2">{{ post.time }}</div>
          <div class="flex items-center gap-3 text-gray-400 text-xs">
            <span><i class="fa fa-eye"></i> {{ post.views }}</span>
            <span><i class="fa fa-comments"></i> {{ post.comments }}</span>
            <span><i class="fa fa-bookmark"></i> {{ post.bookmarks }}</span>
            <span><i class="fa fa-heart"></i> {{ post.likes }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  author: String,
  related: Array,
  others: Array
})
</script>