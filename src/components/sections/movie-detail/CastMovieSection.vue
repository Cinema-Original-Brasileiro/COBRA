<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useMoviesStore } from '@/stores/movie';

const movieStore = useMoviesStore();
const route = useRoute();

const castMovie = computed(() => movieStore.castMovie);

onMounted(async () => {
  const id = route.params.id;
  const data = await movieStore.castMovieList(id);
  castMovie.value = data
  console.log(castMovie.value)
});

</script>

<template>
  <section>
    <h2>Elenco</h2>
    <ul class="cast_list">
      <li
        v-for="c in castMovie"
        :key="c.cast_id"
      >
      <img :src="`https://image.tmdb.org/t/p/original${c.profile_path}`" :alt="c.original_name">
      <div class="actor-infos">
        <h4>{{ c.original_name }}</h4>
        <p>{{ c.character }}</p>
      </div>
      </li>
    </ul>
  </section>
</template>

<style scoped>

section {
  margin-top: 3vw;

  .cast_list {
    margin-top: 2vw;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 2vw;

     & li {
      display: flex;
      gap: 1vw;
       & img {
        max-width: 6rem;
        height: auto;
        border-radius: 1vw;
       }

       & p {
        color: #b2b2b2;
       }
     }
  }

}

</style>
