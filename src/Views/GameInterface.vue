<template>
  <div class="game-interface-y8">
    <div class="game-header">
      <h1 class="game-title">{{ game.title }}</h1>
    </div>
    <div class="game-main">
      <div class="game-player-y8">
        <iframe
          ref="gameFrame"
          :src="game.url"
          frameborder="0"
          allowfullscreen
          class="game-iframe"
        ></iframe>
      </div>
    </div>
    <div class="game-desc-bottom">
      <h2>Giới thiệu</h2>
      <p>{{ game.description }}</p>
      <button class="play-again-btn" @click="reloadGame">Chơi lại</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameInterface",
  data() {
    return {
      game: {
        title: "Game Unity WebGL Demo",
        url: "/Game/Game1/index.html",
        description:
          "Trải nghiệm game Unity WebGL trực tiếp trên trình duyệt. Sử dụng phím và chuột để điều khiển như hướng dẫn trong game.",
      },
    };
  },
  methods: {
    reloadGame() {
      const iframe = this.$el.querySelector(".game-iframe");
      if (iframe) {
        iframe.src = this.game.url;
      }
    },
    fullscreenGame() {
      const iframe = this.$refs.gameFrame;
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
      } else if (iframe.mozRequestFullScreen) {
        iframe.mozRequestFullScreen();
      } else if (iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen();
      }
    },
  },
};
</script>

<style scoped>
html,
body,
#app {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  background: #f2f2f2;
}
.game-interface-y8 {
  margin: 0 auto;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 8px 32px #0002;

  font-family: "Segoe UI", Arial, Helvetica, sans-serif;
  height: 180vh;

  box-sizing: border-box;
  max-width: 960px;
}
.game-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 24px 40px 0 40px;
  border-bottom: 1px solid #eee;
  flex-shrink: 0;
}
.game-title {
  flex: 1;
  font-size: 2.2rem;
  color: #222;
  margin: 0;
  font-weight: 700;
  letter-spacing: 1px;
}
.game-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 1 0;
  min-height: 0;
  overflow: hidden;
  justify-content: center;
}
.game-player-y8 {
  width: 100%;
  background: transparent;
  border-radius: 12px;
  overflow: hidden;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px #0001;
  border: none;
  position: relative;
  padding: 0;
}
.game-iframe {
  width: 100vw; /* phủ 90% chiều rộng màn hình */
  height: 110vh; /* phủ 90% chiều cao màn hình */

  min-height: 400px;
  max-width: 980px; /* không vượt quá khung giao diện */
  max-height: 100vh;
  border: none;
  background: transparent;
  border-radius: 8px;
  box-shadow: none;
  display: block;
}
.game-desc-bottom {
  width: 100%;
  background: #f8f8f8;
  border-radius: 10px;
  padding: 18px 32px 18px 32px;
  font-size: 1.05rem;
  color: #333;
  box-shadow: 0 2px 8px #0001;
  border: 1px solid #ececec;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.play-again-btn {
  margin-top: 16px;
  padding: 12px 32px;
  background: linear-gradient(90deg, #ff9800 0%, #ff5722 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 2px 8px #ff980033;
  transition: background 0.2s, transform 0.1s;
}
.play-again-btn:hover {
  background: linear-gradient(90deg, #ff7043 0%, #e65100 100%);
  transform: translateY(-2px) scale(1.03);
}
@media (max-width: 900px) {
  .game-interface-y8 {
    max-width: 100vw;
    height: 100vh;
  }
  .game-main {
    padding: 0 8px;
  }
  .game-player-y8 {
    min-width: unset;
    min-height: 240px;
  }
  .game-iframe {
    min-width: 100%;
    min-height: 240px;
    height: 40vh;
    max-height: 50vh;
  }
  .game-desc-bottom {
    padding: 18px 8px;
  }
}
</style>
