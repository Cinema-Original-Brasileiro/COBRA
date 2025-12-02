<script setup>
import { onMounted, computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useMoviesStore } from '@/stores/movie'

const route = useRoute()

const movieStore = useMoviesStore()

const movie = computed(() => movieStore.currentMovie);
const providers = ref([]);

onMounted(async () => {
  const id = route.params.id

  const data = await movieStore.watchProvidesList(id);
  console.log(data)
  providers.value = data?.flatrate
})
</script>

<template>
  <section class="movie-info">
    <ul class="infos">
      <li>
        <h3>
          <span class="mdi mdi-calendar-blank"></span>
          Ano de lançamento
        </h3>
        <p class="year">{{ movie?.release_date?.slice(0, 4) }}</p>
      </li>
      <li>
        <h3>
          <span class="mdi mdi-view-grid-outline"></span>
          Gêneros
        </h3>
        <ul class="genres-list">
          <li v-for="g in movie?.genres" :key="g.id" class="genre">
            {{ g.name }}
          </li>
        </ul>
      </li>
      <li>
        <h3>
          <span class="mdi mdi-theater"></span>
          Assita agora
        </h3>

        <p v-if="!providers.length">Streaming indisponível</p>

        <div :class="{ 'infos-list': providers.length}">
          <img
            v-for="p in providers"
            :key="p.provider_id"
            :src="`https://image.tmdb.org/t/p/original${p.logo_path}`"
            :alt="p.provider_name"
            class="providers-logo"
            />
        </div>
      </li>
      <li>
        <h3>
          <span class="mdi mdi-film"></span>
          Produtoras
        </h3>
        <div class="infos-list">
          <img
            v-for="c in movie?.production_companies"
            :key="c.id"
            :src="`https://image.tmdb.org/t/p/w92${c.logo_path}`"
            :alt="c.name"
            class="companies-logos"
            >
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped>

.movie-info {
  background-color: #F9EFE7;
  margin: 8vw 10vw 0 0 ;
  padding: 1vw 8vw 1vw 3vw;
  border-radius: 15px;
  max-width: 25% ;

  & .infos {
    display: flex;
    flex-direction: column;
    gap: 1.5vw;
  }
}

.movie-info ul li {
  & h3 {
    color: #B2B2B2;
    font-weight: 600;
    margin-bottom: 1vw;
  }
}

.infos-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1vw;
  background-color: #FFF5EE;
  border: 1px solid #8D8D8D;
  padding: 0.8vw;
  border-radius: 10px;
}

.providers-logo {
  max-height: 2.5rem;
  max-width: 2.5rem;
  border-radius: 10px;
}

.companies-logos {
  width: 20%;
  height: 10%;

  object-fit: contain;
}

.genres-list {
  display: flex;
  gap: 0.8vw;
  flex-wrap: wrap;

  .genre{
    background-color: #FFF5EE;
    border: 1px solid #8D8D8D;
    padding: 0.2vw 0.5vw;
    border-radius: 10px;
  }
}

.year {
  font-size: 1.4rem;
  font-weight: 600;
}
</style>
