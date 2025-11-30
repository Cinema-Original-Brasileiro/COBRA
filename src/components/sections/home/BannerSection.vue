<script setup>
import { onMounted, ref, computed } from 'vue'
import { useCartazStore } from '@/stores/cartaz'
import { useMoviesStore } from '@/stores/movie';

const cartazStore = useCartazStore();
const moviesStore = useMoviesStore();

// Pega apenas o 5 primeiros filmes e remove repetidos
const firstMovies = computed(() => {
  const uniqueMovies = [...new Set(cartazStore.cartazMoviesBr)]
  return uniqueMovies.slice(0, 5)
})

// Sistema de carrosel
const currentIndex = ref(0)
const totalMovies = computed(() => firstMovies.value.length)

const nextMovie = () => {
  currentIndex.value = (currentIndex.value + 1) % totalMovies.value
}

const prevMovie = () => {
  currentIndex.value = (currentIndex.value - 1 + totalMovies.value) % totalMovies.value
}

// Filme atual
const movie = computed(() => firstMovies.value[currentIndex.value])

// Pega o fundo do filme atual
const backgroundImage = computed(() => {
  if (!movie.value) return {}
  return {
    backgroundImage: `
      linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)),
      url(https://image.tmdb.org/t/p/original${movie.value.backdrop_path})`,
  }
})

//

onMounted(async () => {
  let page = 1
  while (page <= 8) {
    await cartazStore.cartazList(page)
    page++
  }

  await moviesStore.addLogoToMovie(cartazStore.cartazMoviesBr)
})
</script>

<template>
  <section class="banner-section">
    <div :style="backgroundImage" class="banner-item">
      <div class="banner-content">
        <p><span class="mdi mdi-movie-open-outline"></span> AGORA NOS CINEMAS</p>
        <img
          v-if="movie?.logo_path"
          :src="`https://image.tmdb.org/t/p/original${movie?.logo_path}`"
          :alt="movie?.title"
        />
        <h1 v-else>{{ movie?.title }}</h1>
        <p class="overview">{{ movie?.overview }}</p>
      </div>

      <div class="banner-nav">
        <button class="prev-button" @click="prevMovie">
          <span class="mdi mdi-chevron-left"></span>
        </button>
        <button class="next-button" @click="nextMovie">
          <span class="mdi mdi-chevron-right"></span>
        </button>
      </div>

      <div class="btns">
        <button class="btn-primary">Ver Detalhes</button>
        <button class="btn-secondary">Assistir Mais Tarde</button>
      </div>

      <div class="count">
        <span
          v-for="m in totalMovies"
          :key="m"
          class="mdi mdi-circle"
          :class="{ active: currentIndex === (m - 1) }"
        >
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.banner-item {
  height: 90vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 5vw 10vw;
  position: relative;
}

.banner-content {
  & img {
    max-width: 35%;
    height: auto;
  }

  & h1 {
    color: #fff;
    font-size: 3rem;
  }

  & p {
    color: #fff;
    font-size: 1.2rem;
    margin: 1.5vw 0;
    font-weight: 500;
  }

  & .overview {
    max-width: 60%;
    margin-top: 2vw;
    font-size: 1rem;
  }
}

.prev-button,
.next-button {
  position: absolute;
  background-color: #d9d9d9;
  border: none;
  border-radius: 100%;
  cursor: pointer;
  top: 50%;
  padding: 0.2vw 0.8vw;
  & span {
    font-size: 1.7rem;
    color: #444444;
  }

  &:hover {
    background-color: #bfbfbf;
    transition: 0.3s;
  }
}

.prev-button {
  left: 2vw;
}

.next-button {
  right: 2vw;
}

.btns {
  display: flex;
  gap: 1vw;
}

.count {
  position: absolute;
  bottom: 2vw;
  right: 50%;
  display: flex;
  gap: 0.3vw;
  & span {
    color: #fff;
  }
  & .active {
  color: #ffdf00;
}
}
</style>
