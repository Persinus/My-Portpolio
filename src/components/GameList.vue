<template>
  <section class="bg-gray-900 py-12">
    <div class="container mx-auto">
      <h2 class="text-3xl font-bold text-white mb-8 text-center">Game Đã Phát Triển</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="game in games" :key="game.id" class="bg-gray-800 rounded-lg p-6 shadow-lg">
          <img :src="game.image" :alt="game.title" class="w-full h-40 object-cover rounded mb-4" />
          <h3 class="text-xl font-semibold text-white mb-2">{{ game.title }}</h3>
          <p class="text-gray-400 mb-4">{{ game.description }}</p>
          <a :href="game.link" target="_blank" class="text-yellow-400 hover:underline">Xem chi tiết</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const games = [
  {
    id: 1,
    title: 'Pixel Adventure',
    description: 'Game platformer 2D với đồ họa pixel cổ điển.',
    image: 'https://placehold.co/400x200?text=Pixel+Adventure',
    link: '#'
  },
  {
    id: 2,
    title: 'Space Shooter',
    description: 'Bắn súng không gian với nhiều cấp độ thử thách.',
    image: 'https://placehold.co/400x200?text=Space+Shooter',
    link: '#'
  },
  {
    id: 3,
    title: 'Puzzle Quest',
    description: 'Giải đố sáng tạo, rèn luyện trí tuệ.',
    image: 'https://placehold.co/400x200?text=Puzzle+Quest',
    link: '#'
  }
]
</script>