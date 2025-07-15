<template>
  <div class="game-list-y8">
    <Navbar />
    <h1 class="y8-title">Game Y8 - Danh sách trò chơi</h1>
    <div class="game-grid-y8">
      <GameCard v-for="game in games" :key="game.id" :game="game" />
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import GameCard from "../components/GameCard.vue";

export default {
  components: {
    Navbar,
    GameCard,
  },
  data() {
    return {
      games: [
        {
          id: 1,
          title: "Bomb IT 4",
          thumbnail:
            "https://i.pinimg.com/1200x/2b/eb/03/2beb035fb64b8e8cac232a857d8f4672.jpg",
        },
        {
          id: 2,
          title: "Fireboy & Watergirl",
          thumbnail:
            "https://i.pinimg.com/736x/9c/fa/08/9cfa083d1c6935eea6bff5ddf55bf880.jpg",
        },
        {
          id: 3,
          title: "Moto X3M",
          thumbnail:
            "https://i.pinimg.com/736x/6a/e0/09/6ae00996d768efb45dbe74ae368dbcf4.jpg",
        },
        {
          id: 4,
          title: "Slither.io",
          thumbnail:
            "https://i.pinimg.com/736x/97/ec/da/97ecdad124f49dc8f8fe69d5363b7dbc.jpg",
        },
        // Thêm game khác nếu muốn
      ],
    };
  },
};
</script>

<style scoped>
.game-list-y8 {
  background: linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%, #f64f59 100%);
  min-height: 100vh;
  padding-bottom: 40px;
}
.y8-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  color: #222;
  margin: 32px 0 24px 0;
  letter-spacing: 1px;
  text-shadow: 0 2px 8px #fff6;
}
.game-grid-y8 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
}
</style>
