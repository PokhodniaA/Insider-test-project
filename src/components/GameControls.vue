<template>
  <div class="container">
    <div class="controls">
      <p>Press "Enter" to start a new game</p>
      <p>Press "Esc" to pause the game</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";

.controls {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    margin: 0;
    color: $controls-color;
  }
}
</style>
