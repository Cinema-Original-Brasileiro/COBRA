<script setup>

import { onMounted, ref, computed } from 'vue';
import { useMoviesStore } from '@/stores/movie';
import { useGenreStore } from '@/stores/genre';
import { useRouter } from 'vue-router';

const movieStore = useMoviesStore();
const genreStore = useGenreStore();
const router = useRouter()

onMounted(async () => {

  movieStore.moviesList();
  movieStore.popularMoviesList();
  movieStore.moviesTopFiveList();
  movieStore.ultimosLancamentosList();

  await genreStore.getAllGenres('movie');
});

function imagemClassificacao(classificacao) {
  if (classificacao === undefined) {
    classificacao = 'L';
  };
  if (classificacao === 'R') {
    classificacao = '18';
  }
  return new URL(`../components/icons/${classificacao}.png`, import.meta.url).href;
};

function openMovie(movieId) {
  router.push({ name: 'MovieDetails', params: { movieId } });
}

let selecionarMaisPopulares = ref(false);
let selecionarMelhoresAvaliados = ref(false);
let selecionarUltimosLancamentos = ref(false);

const selecionadoFiltro = computed(() => {
  if (selecionarMaisPopulares.value === true) {
    movieStore.ultimosLancamentos = [];
    movieStore.topFive = [];
    movieStore.page = 1;
    selecionarMelhoresAvaliados.value = false;
    selecionarUltimosLancamentos.value = false;
    return movieStore.popularMovies;
  }
  if (selecionarMelhoresAvaliados.value === true) {
    movieStore.ultimosLancamentos = [];
    movieStore.popularMovies = [];
    movieStore.page = 1;
    selecionarMaisPopulares.value = false;
    selecionarUltimosLancamentos.value = false;
    return movieStore.topFive;
  }
  if (selecionarUltimosLancamentos.value === true) {
    movieStore.popularMovies = [];
    movieStore.topFive = [];
    movieStore.page = 1;
    selecionarMaisPopulares.value = false;
    selecionarMelhoresAvaliados.value = false;
    return movieStore.ultimosLancamentos;
  }
  else {
    movieStore.moviesList();
    return movieStore.movies;
  }
});

</script>

<template>
  <div class="caminhos">
    <p>
      <BreadcrumbComponent />
    </p>
  </div>
  <div class="main">
    <div class="filtros">
      <h1>Opções de Filtro</h1>
      <div class="generos">
        <h2>Por Gênero</h2>
        <ul>
          <li v-for="genre in genreStore.genres" :key="genre.id" @click="genreStore.selectGenres(genre.id)"
            class="genre-item" :class="{ active: genreStore.currentGenresId.includes(genre.id) }">
            <label>
              <input type="checkbox" name="checkbox" id="checkbox"><span class="genre-name">{{ genre.name }}</span>
            </label>
          </li>
        </ul>
      </div>
      <div class="destaques">
        <h2>Destaques Por</h2>
        <ul>
          <li>
            <p @click="selecionarMaisPopulares = !selecionarMaisPopulares"
              :class="{ selecionarMaisPopulares: selecionarMaisPopulares }">{{ selecionarMaisPopulares ? '-' : '+' }}
              Mais populares <span class="quantidade">({{ movieStore.quantidadeFilmes[0] }})</span></p>
          </li>
          <li>
            <p @click="selecionarMelhoresAvaliados = !selecionarMelhoresAvaliados"
              :class="{ selecionarMelhoresAvaliados: selecionarMelhoresAvaliados }">{{ selecionarMelhoresAvaliados ? '-'
                : '+' }} Melhores Avaliados <span class="quantidade">({{ movieStore.quantidadeFilmes[1] }})</span></p>
          </li>
          <li>
            <p @click="selecionarUltimosLancamentos = !selecionarUltimosLancamentos"
              :class="{ selecionarUltimosLancamentos: selecionarUltimosLancamentos }">{{ selecionarUltimosLancamentos ?
                '-' : '+' }} Últimos Lançamentos <span class="quantidade">({{ movieStore.quantidadeFilmes[2] }})</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
    <div class="movies">
      <div class="paginas">
        <button class="descer-pagina" @click="movieStore.moviePageDown()">
          <span class="mdi mdi-chevron-left"></span>
        </button>
        <button class="subir-pagina" @click="movieStore.moviePageUp()">
          <span class="mdi mdi-chevron-right"></span>
        </button>
      </div>
      <ul class="movies-items">
        <li v-for="movie in selecionadoFiltro" :key="movie.id" class="movies-card">
          <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="movie.title" class="movie-image"
            @click="openMovie(movie.id)">
          <h3 class="titulo">{{ movie.title }}</h3>
          <div>
            <p class="horas" v-if="movie.runtime >= 0">{{ Math.floor(movie.runtime / 60) }}h {{ (movie.runtime % 60) }}m
            </p>
            <img :src="imagemClassificacao(movie.classificacaoIndicativa)" class="classificacao-indicativa">
            <p class="ano">{{ movie.release_date.slice(0, 4) }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>


.caminhos {
  background-color: #F9EFE7;
  width: 100%;
}

.main {
  display: flex;
}

.generos {
  min-width: 18.5rem;
  max-width: 18.5rem;
  min-height: 24rem;
  max-height: 24rem;
  background-color: #F9EFE7;
  padding: 0.2vw 1vw 1vw 1vw;
  border-radius: 0.7vw;
}

.filtros {
  & h1 {
    font-size: 1.7rem;
  }
  & h2 {
    font-size: 1.4rem;
  }
}

.generos ul {
  padding: 0.2vw 0 0 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border-radius: 0.5vw;
}

.genre-name {
  margin-left: 0.3vw;
  padding-right: 1vw;
  cursor: pointer;
}

.generos ul li {
  font-size: 0.8rem;
  color: #B2B2B2;
  margin-bottom: 0.5vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}


.generos ul li input[type="checkbox"] {
  width: 0.8rem;
  height: 0.8rem;
  background-color: inherit;
  cursor: pointer;
}

.generos ul li input[type="checkbox"]:checked {
  color: #009440;
  accent-color: #4CAF50;
}

.generos ul li:active {
  color: #009440;
}

.destaques {
  background-color: #F9EFE7;
  margin-top: 1.5vw;
  padding: 0.2vw 1vw 1vw 1vw;
  border-radius: 0.7vw;
}

.destaques ul {
  margin-top: 1vw;
  padding-left: 0;
}

.destaques ul li p {
  margin: 0.3vw 0 0 0;
  font-size: 1rem;
  color: #B2B2B2;
  cursor: pointer;
}

.destaques ul li p.selecionarMaisPopulares {
  font-weight: 500;
  color: #009440;
}

.destaques ul li p.selecionarUltimosLancamentos {
  font-weight: 500;
  color: #009440;
}

.destaques ul li p.selecionarMelhoresAvaliados {
  font-weight: 500;
  color: #009440;
}

.quantidade {
  font-size: 0.7rem;
}

.movies {
  max-width: 100%;
  margin-left: 2vw;
}

.paginas {
  margin-top: 1.2rem;
  display: flex;
  margin-left: 2.55vw;
}

.paginas button {
  margin-right: 1vw;
  background-color: #F7E9DE;
  border: none;
  border-radius: 100%;
  cursor: pointer;
  padding: 0.15vw 0.3vw;
  transition: 0.3s;

  & span {
    font-size: 1.6rem;
    color: #EECFBA;
  }

  &:hover {
    transition: 0.3s;
    background-color: #edd0bb;

    & span {
      color: #02E563;
      transition: 0.3s;
    }
  }
}

.movies-items {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.movies-card {
  background-color: #F9EFE7;
  padding: 1vw;
  margin: 0.5vw 2vw 1vw 0;
  min-height: 22rem;
  max-height: 22rem;
  min-width: 12.5rem;
  max-width: 12.5rem;
  border-radius: 15px;
  box-shadow: 0.005208vw 0.005208vw rgba(0, 0, 0, 0.1);
  transition: 0.9s;
}

.movies-card:hover {
  scale: 1.03;
  transition: 0.6s;
  box-shadow: 0.104vw 0.104vw 0.260416vw rgba(0, 0, 0, 0.1);
}

.movies-card div {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.movies-card .movie-image {
  width: 8.36rem;
  height: 13rem;
  object-fit: cover;
  margin: 0.5vw 1vw 0.5vw 1vw;
  justify-content: center;
  opacity: 0.03;
  align-content: center;
  border-radius: 10px;
}

.movies-card h3 {
  font-size: 1.05rem;
  text-align: center;
  align-items: stretch;
  margin: 2vw 0 0 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #080808;
}

.classificacao-indicativa {
  height: 0.75rem;
  width: 0.75rem;
  vertical-align: middle;
}

.movies-card p {
  font-size: 0.75rem;
  text-align: center;
  color: #B2B2B2
}
</style>
