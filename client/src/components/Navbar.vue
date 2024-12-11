<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import Login from './Login.vue';






const screenWidth = ref(window.innerWidth);

function updateScreenWidth() {
  screenWidth.value = window.innerWidth;
}

onMounted(() => {
  window.addEventListener('resize', updateScreenWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScreenWidth);
});



</script>

<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-dark px-3"
    :style="screenWidth <= 576 ? 'height: auto;' : 'height: 10dvh;'">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex">
        <img v-if="screenWidth >= 576" class="mt-5" alt="logo" src="../assets/img/giraffe.gif" height="125"
          id="navImage" />
        <img v-else alt="logo" src="../assets/img/giraffe.gif" height="80" id="navImage" />

      </div>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
      </ul>

      <Login />
    </div>
  </nav>
</template>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}


.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
