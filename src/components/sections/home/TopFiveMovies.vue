<script setup>
import { onMounted, computed, ref } from 'vue'
import { useMoviesStore } from '@/stores/movie'

const moviesStore = useMoviesStore();
const movieDetails = computed(() => moviesStore.currentMovie)

// Pega os 5 primeiros filmes melhores avaliados
const topFive = computed(() => {
  return moviesStore.topFive.slice(0, 5)
})

// Separa o array para pegar cada filme individualmente
const currentIndex = ref(0)
const movie = computed(() => topFive.value[currentIndex.value])

// Função para chamada do backdrop para cada filme
const BackgroundImage = computed(() => {
  if (!movie.value) return {}
  return {
    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.value.backdrop_path})`,
  }
});

// Função para pegar o indicie (usar nos detalhes do filme)
const setMovieDetails = async(index) => {
  currentIndex.value = index;
  const selectedMovie = topFive.value[index];

  await moviesStore.movieDetail(selectedMovie?.id)
}

onMounted(async () => {
  await moviesStore.moviesTopFiveList();
  await moviesStore.addLogoToMovie(moviesStore.topFive)

  if(moviesStore.topFive.length > 0) {
    await setMovieDetails(currentIndex.value)
  }
});


</script>

<template>
  <section class="top-five" :style="BackgroundImage">
    <div class="title">
      <h2>Top 5 filmes</h2>
      <p>Confira os 5 filmes mais bem avaliados pelo público</p>
    </div>
    <div class="content">
      <img :src="`https://image.tmdb.org/t/p/w500${movie?.poster_path}`" :alt="movie?.title">

      <div class="infos-movie">
        <img :src="`https://image.tmdb.org/t/p/original${movie?.logo_path}`" :alt="movie?.title">
        <p>{{ movieDetails?.tagline }}</p>
        <button class="btn-primary">Ver Detalhes</button>
      </div>

    </div>
  </section>
</template>

<style scoped>
.top-five {
  height: 100vh;
  position: relative;
  padding: 5vw 10vw;
  z-index: 0;
  margin: 3vw 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.top-five::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;

  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, 0.7);
}

.title {
  & h2 {
    color: #FFF5EE;
    font-size: 2.5rem;
    font-weight: 600;
  }
  & p {
    color: #B2B2B2;
    font-size: 1.1rem;
    margin: 0.7vw 0;
  }
}

.content {
  display: flex;
  align-items: center;
  gap: 2vw;

  & img {
    height: 20rem;
    width: auto;
    margin-top: 2vw;
    border-radius: 5%;
  }
}

.infos-movie {
  display: flex;
  flex-direction: column;

  & img {
    width: 20rem;
    height: auto;
  }

  & p {
    font-size: 1.1rem;
    max-width: 30vw;
    color: #FFF5EE;
    margin: 2vw 0;
  }

}

</style>
