<script setup>
import { onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import BannerSection from '@/components/sections/home/BannerSection.vue'
import TopFiveMovies from '@/components/sections/home/TopFiveMovies.vue'
import MainActors from '@/components/sections/home/MainActors.vue'
import { useMoviesStore } from '@/stores/movie'

const moviesStore = useMoviesStore()

const latestReleases = computed(() => {
  return moviesStore.ultimosLancamentos.slice(0, 5)
})

const mostPopular = computed(() => {
  return moviesStore.popularMovies.slice(0, 5)
})

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
        <img :src="`https://image.tmdb.org/t/p/w500${m.poster_path}`" :alt="m.title" />
        <h3>{{ m.title }}</h3>
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
        <img :src="`https://image.tmdb.org/t/p/w500${m.poster_path}`" :alt="m.title" />
        <h3>{{ m.title }}</h3>
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

<style scoped>

.latest-releases, .most-popular {
  display: flex;
  flex-direction: column;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5vw 10vw  2vw 10vw;

  & h2 {
    font-weight: 700;
  }

  & a {
    color: #009440;
    &:hover {
      color: #007a33;
    }
  }
}

.movie-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 5.5vw;

  & .movie {
    width: 180px;
  }

  & img {
    height: 270px;
    width: auto;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
    background-color: #000;
    transition: .3s;

    &:hover {
      transform: translateY(-5px);
      filter: brightness(0.6);
    }
  }

  & h3 {
    font-size: 1rem;
    margin-top: 1vw;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
}

.infos {
  & p {
    color: #b2b2b2;
    margin: 0.8vw 0;
  }
}

.item-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;

  & p {
    display: flex;
    align-items: center;
    background-color: #AFFFD1;
    color: #767676;
    font-weight: 500;
    border-radius: 15px;
    font-size: 0.9rem;
    width: 35%;
    margin: 0;

    & .mdi-star {
      font-size: 0.8rem;
      border-radius: 100%;
      padding: 0.1vw 0.3vw;
      background-color: #2DF884;
      color: #009440;
      margin-right: 0.6vw;
    }
  }

  & .actions-icon {
    display: flex;
    gap: 1vw;
    color: #479414;
    cursor: pointer;
    font-size: 1.1rem;
  }
}

</style>
