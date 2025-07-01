<script setup>
import { computed } from 'vue'
import { skills as allSkills } from '../data/Skills'

const props = defineProps({
  skills: {
    type: Array,
    default: () => []
  }
})

const filteredSkills = computed(() =>
  allSkills.filter(skill => props.skills.includes(skill.name))
)
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <template v-for="item in filteredSkills" :key="item.name">
      <!-- Ngôn ngữ: chỉ icon hoặc button giả nếu không có icon -->
      <span
        v-if="item.type === 'language'"
        class="inline-flex items-center justify-center min-w-[40px] h-9 rounded-full font-bold text-white text-base"
        :style="{ background: item.color, padding: '0 16px' }"
      >
        <img
          v-if="item.icon"
          :src="item.icon"
          :alt="item.name"
          class="w-6 h-6"
        />
        <span v-else>
          {{ item.short || item.name }}
        </span>
      </span>
      <!-- Framework: icon + tên -->
      <span
        v-else
        class="inline-flex items-center min-w-[40px] h-9 bg-gray-100 rounded-full px-4 font-semibold text-base shadow"
        :style="{ border: `2px solid ${item.color}` }"
      >
        <img :src="item.icon" :alt="item.name" class="w-6 h-6 mr-2" />
        <span class="text-gray-700">{{ item.name }}</span>
      </span>
    </template>
  </div>
</template>
