<template>
  <div class="game-card-y8">
    <img :src="game.thumbnail" alt="Game Thumbnail" class="game-thumbnail-y8" />
    <h3 class="game-title-y8">{{ game.title }}</h3>
    <router-link
      :to="{ name: 'GameInterface', params: { id: game.id } }"
      class="play-button-y8"
    >
      Chơi ngay
    </router-link>
  </div>
</template>

<script>
export default {
  name: "GameCard",
  props: {
    game: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.game-card-y8 {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 18px #0002;
  overflow: hidden;
  text-align: center;
  margin: 0;
  padding: 18px 12px 24px 12px;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.game-card-y8:hover {
  transform: translateY(-4px) scale(1.04);
  box-shadow: 0 8px 32px #f64f5955;
}
.game-thumbnail-y8 {
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 18px;
  box-shadow: 0 2px 8px #0001;
}
.game-title-y8 {
  font-size: 1.25rem;
  font-weight: bold;
  color: #f64f59;
  margin-bottom: 18px;
  margin-top: 0;
  letter-spacing: 0.5px;
}
.play-button-y8 {
  display: inline-block;
  padding: 12px 32px;
  background: linear-gradient(90deg, #ff9800 0%, #ff5722 100%);
  color: #fff;
  text-decoration: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  box-shadow: 0 2px 8px #ff980033;
  transition: background 0.2s, transform 0.1s;
}
.play-button-y8:hover {
  background: linear-gradient(90deg, #ff7043 0%, #e65100 100%);
  transform: scale(1.06);
}
</style>
