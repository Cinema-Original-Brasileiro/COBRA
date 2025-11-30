<script setup>
import { onMounted, computed, ref } from 'vue'
import { useMoviesStore } from '@/stores/movie'
import { useGenreStore } from '@/stores/genre'

const moviesStore = useMoviesStore();
const genreStore = useGenreStore();

const movieDetails = computed(() => moviesStore.currentMovie);

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
})

// Função para pegar o indicie (usar nos detalhes do filme)
const setMovieDetails = async (index) => {
  currentIndex.value = index
  const selectedMovie = topFive.value[index]

  await moviesStore.movieDetail(selectedMovie?.id)
}

onMounted(async () => {
  await moviesStore.moviesTopFiveList();
  await moviesStore.addLogoToMovie(moviesStore.topFive);
  await genreStore.getAllGenres('movie');

  if (moviesStore.topFive.length > 0) {
    await setMovieDetails(currentIndex.value)
  };
})
</script>

<template>
  <section class="top-five" :style="BackgroundImage">
    <div class="title">
      <h2>Top 5 filmes</h2>
      <h3>Confira os 5 filmes mais bem avaliados pelo público</h3>
    </div>
    <div class="content">
      <img
        class="poster-movie"
        :src="`https://image.tmdb.org/t/p/w500${movie?.poster_path}`"
        :alt="movie?.title"
      />

      <div class="infos-movie">
        <img :src="`https://image.tmdb.org/t/p/original${movie?.logo_path}`" :alt="movie?.title" />
        <p>{{ movieDetails?.tagline }}</p>
        <button class="btn-primary">Ver Detalhes</button>
      </div>

      <ul class="ranking-list">
        <li
          v-for="(m, index) in topFive"
          :key="m.id"
          class="ranking-item"
          :class="{ active: index === currentIndex }"
          @click="setMovieDetails(index)"
          >
          <div class="ranking-info">
            <span class="ranking-position">
              #{{ index + 1 }}
            </span>
            <h4>{{ m.title }}</h4>
            <p class="movie-average" v-if="index === currentIndex">
              <span class="mdi mdi-star"></span>
              {{ m.vote_average.toFixed(1) }}
            </p>
            <span v-if="index === currentIndex" class="mdi mdi-heart-outline"></span>
          </div>

          <div class="expanded-details" v-if="index === currentIndex">
            <p>{{ m.release_date.slice(0, 4) }}</p>
            <p
              v-for="g in m.genre_ids.slice(0, 2)"
              :key="g"
              >
              {{ genreStore.getGenreName(g) || '' }}
            </p>
          </div>

        </li>
      </ul>
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
    color: #fff5ee;
    font-size: 2.5rem;
    font-weight: 600;
  }
  & h3 {
    color: #b2b2b2;
    font-size: 1.1rem;
    margin: 0.7vw 0;
    font-weight: 500;
  }
}

.content {
  display: flex;
  align-items: center;
  gap: 2vw;

  & .poster-movie {
    height: 20rem;
    width: auto;
    margin-top: 2vw;
    border-radius: 5%;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
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
    color: #fff5ee;
    margin: 2vw 0;
  }
}

.ranking-list {
  display: flex;
  flex-direction: column;
  gap: 1vw;

  & .ranking-item {
    background: linear-gradient(to right, rgba(48, 48, 48, 1), rgba(19, 19, 19, 1));
    margin-left: 1vw;
    border-radius: 15px;
    cursor: pointer;
    padding: 1vw 7vw 1vw 2vw;

    & .ranking-position {
      font-size: 1.2rem;
      color: #fff5ee;
      font-weight: bold;
    }

    & .mdi-heart-outline {
      color: #fff;
      font-size: 1.3rem;
      margin-left: 2vw;
    }
  }
}

.ranking-info {
  display: flex;
  gap: 1vw;
  align-items: center;

  & h4 {
    font-size: 1.2rem;
    color: #fff5ee;
    font-weight: 500;
    width: 60%;
  }

}

.movie-average {
    display: flex;
    align-items: center;
    background-color: #AFFFD1;
    color: #767676;
    font-weight: 500;
    border-radius: 15px;
    font-size: 0.9rem;
    width: 5vw;

    & .mdi-star {
      font-size: 0.8rem;
      border-radius: 100%;
      padding: 0.1vw 0.3vw;
      background-color: #2DF884;
      color: #009440;
      margin-right: 0.3vw;
    }
  }

.expanded-details {
  display: flex;
  gap: 1vw;
  color: #b2b2b2;
  margin: 0.3vw 0 0 2.5vw;
  font-size: 0.8rem;
}

</style>
