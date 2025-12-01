<script setup>
import { onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import BannerSection from '@/components/sections/home/BannerSection.vue'
import TopFiveMovies from '@/components/sections/home/TopFiveMovies.vue'
import MainActors from '@/components/sections/home/MainActors.vue'
import { useMoviesStore } from '@/stores/movie'
import router from '@/router'

const moviesStore = useMoviesStore()

const latestReleases = computed(() => {
  return moviesStore.ultimosLancamentos.slice(0, 5)
})

const mostPopular = computed(() => {
  return moviesStore.popularMovies.slice(0, 5)
})

function openMovie(id) {
  router.push({name: 'movie', params: {id}});
};

onMounted(async () => {
  await moviesStore.ultimosLancamentosList()
  await moviesStore.popularMoviesList()
})
</script>

<template>
  <BannerSection />

  <section class="latest-releases">
    <div class="section-header">
      <h2>Últimos Lançamentos</h2>
      <RouterLink>Ver Mais <span class="mdi mdi-chevron-right"></span></RouterLink>
    </div>
    <ul class="movie-list">
      <li v-for="m in latestReleases" :key="m.id" class="movie">
        <img
          :src="`https://image.tmdb.org/t/p/w500${m.poster_path}`"
          :alt="m.title"
          @click="openMovie(m.id)"
          />
        <h3 @click="openMovie(m.id)">{{ m.title }}</h3>
        <div class="infos">
          <p>{{ m.release_date.slice(0, 4) }}</p>
          <p>{{  }}</p>
        </div>
        <div class="item-actions">
          <p>
            <span class="mdi mdi-star"></span>
            {{ m.vote_average !== 10 ? m.vote_average.toFixed(1) : '10' }}
          </p>
          <ul class="actions-icon">
            <li><span class="mdi mdi-heart-outline"></span></li>
            <li><span class="mdi mdi-clock-outline"></span></li>
          </ul>
        </div>
      </li>
    </ul>
  </section>

  <section class="most-popular">
    <div class="section-header">
      <h2>Mais Populares</h2>
      <RouterLink>Ver Mais <span class="mdi mdi-chevron-right"></span></RouterLink>
    </div>
    <ul class="movie-list">
      <li v-for="m in mostPopular" :key="m.id" class="movie">
        <img
          :src="`https://image.tmdb.org/t/p/w500${m.poster_path}`"
          :alt="m.title"
          @click="openMovie(m.id)">
        <h3 @click="openMovie(m.id)">{{ m.title }}</h3>
        <div class="infos">
          <p>{{ m.release_date.slice(0, 4) }}</p>
          <p>{{  }}</p>
        </div>
        <div class="item-actions">
          <p>
            <span class="mdi mdi-star"></span>
            {{ m.vote_average !== 10 ? m.vote_average.toFixed(1) : '10' }}
          </p>
          <ul class="actions-icon">
            <li><span class="mdi mdi-heart-outline"></span></li>
            <li><span class="mdi mdi-clock-outline"></span></li>
          </ul>
        </div>
      </li>
    </ul>
  </section>

  <TopFiveMovies />
  <MainActors />
</template>
