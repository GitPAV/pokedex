<template>
  <div class="navbar">
    <nuxt-link to="/">
      <img src="../assets/pokeball.png" alt="pokeball home icon">
    </nuxt-link>
    <p>Je suis une navbar</p>
  </div>
</template>

<style>
.navbar {
  width: 100%;
  height: 3em;
  background-color: white;
  box-shadow: 0px 2px 10px #e0e0e0;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 100;
}

.navbar a {
  display: flex;
  margin-left: 1em;
}

.navbar a img {
  height: 2.2em;
}
</style>
