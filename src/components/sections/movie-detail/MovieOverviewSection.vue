<script setup>
import { onMounted, ref, defineProps, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useMoviesStore } from '@/stores/movie';

defineProps(['id'])

const movieStore = useMoviesStore();
const route = useRoute();
const trailer = ref(null);
const movie = computed(() => movieStore.currentMovie);

onMounted( async () => {
const trailers = await movieStore.trailerMovie(route.params.id);
await movieStore.movieDetail(route.params.id)
trailer.value = trailers?.[0];
})

</script>

<template>
  <section class="movie-overview">
      <iframe
        :src="`https://www.youtube.com/embed/${trailer?.key}`"
        frameborder="0"
        allowfullscreen
        class="movie-trailer"
      >
      </iframe>

      <div class="sinopse">
        <h2>Sinopse</h2>
        <p>{{ movie?.overview }}</p>
      </div>
  </section>
</template>

<style scoped>

.movie-overview {
  background-color: #F9EFE7;
  margin-top: 8vw;
  padding: 3vw;
  border-radius: 15px;
  width: 45%;

  .movie-trailer {
  width: 100%;
  height: 18rem;
  border-radius: 10px;
  }
}

.sinopse {
  margin-top: 2vw;

  & h2 {
    font-size: 2rem;
    margin-bottom: 1vw;
  }

  & p {
    text-align: justify;
  }
}

</style>
