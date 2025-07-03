<template>
  <Header />
  <AboutMe />
  <GameList />

  <ContactSection />
</template>

<script setup>
import Header from "../Components/Header.vue";
import AboutMe from "../Components/AboutMe.vue";
import GameList from "../Components/GameList.vue";

import ContactSection from "../Components/ContactSection.vue";
</script>

<style scoped>
/* Tuỳ chỉnh thêm nếu cần */
body {
  font-family: "Arial", sans-serif;
  background-color: #f0f0f0;
  margin: 0;
  padding: 0;
}

h1 {
  color: #333;
  text-align: center;
  margin-top: 20px;
}
</style>
