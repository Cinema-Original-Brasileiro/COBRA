  <script setup>
  import { onMounted, computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { useMoviesStore } from '@/stores/movie'

  const route = useRoute()
  const movieStore = useMoviesStore()

  const movie = computed(() => movieStore.currentMovie)

  const backgdropImage = () => {
    return {
      backgroundImage: `
        linear-gradient(to top, rgba(255, 245, 238, 1), rgba(255, 245, 238, 0.5 ), rgba(0,0,0,0)),
        url(https://image.tmdb.org/t/p/original${movie.value.backdrop_path})
      `,
    }
  }

  onMounted(async () => {
    const id = route.params.id

    await movieStore.movieDetail(id)
    await movieStore.logosList(id)
  })
  </script>

  <template>
    <section v-if="movie && movie.id" class="banner" :style="backgdropImage()">
      <img
        v-if="movie?.logo_path"
        :src="`https://image.tmdb.org/t/p/original${movie?.logo_path}`"
        :alt="movie?.title" />
      <h1 v-else>{{ movie?.title }}</h1>

      <p v-if="movie?.tagline">{{ movie?.tagline }}</p>
      <p v-else>{{ movie?.overview.split('. ')[0]  }}</p>

      <ul class="actions-list">
        <li>
          <span class="mdi mdi-heart-outline"></span>
        </li>
        <li>
          <span class="mdi mdi-clock-outline"></span>
        </li>
      </ul>
    </section>
  </template>
  <style scoped>
  section {
    margin: 1vw 10vw;
  }

  .banner {
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;

    background: linear-gradient(to top, rgba(255, 245, 238, 1));
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 80vh;
    border-radius: 15px;
    overflow: hidden;

    & h1 {
      font-size: 3rem;
    }

    & img {
      max-width: 30rem;
      max-height: 15rem;
    }

    & p {
      color: #434343;
      font-size: 1rem;
      margin: 1vw 0;
      font-weight: 600;
      width: 70%;
      text-align: center;
    }

    & .actions-list {
      display: flex;
      gap: 1vw;

      & li {
        font-size: 1.5rem;
        background-color: #F9EFE7;
        padding: 0.5vw 1vw;
        color: #009440;
        border-radius: 100%;
        cursor: pointer;
      }
    }

  }

  </style>
