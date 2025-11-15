import api from '@/plugins/axios'
import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMoviesStore = defineStore('movies', () => {
  const state = reactive({
    movies: [],
    topFive: [],
    popularMovies: [],
    ultimosLancamentos: [],
    page: 1,
  });

  const movies = computed(() => state.movies)
  const topFive = computed(() => state.topFive);
  const popularMovies = computed(() => state.popularMovies);
  const ultimosLancamentos = computed(() => state.ultimosLancamentos);

  const pageMovieUp = async () => {
    state.page = page + 1
  }

  const pageMovieDown = async () => {
    state.page = state.page - 1
  }

  const moviesList = async () => {
    try {
      const response = await api.get('discover/movie', {
        params: {
          with_origin_country: 'BR',
          language: 'pt-BR',
          page: state.page,
        },
      })
      state.movies = response.data.results
    } catch (error) {
      console.error('Erro filme ', error)
    }
  }

  const moviesTopFiveList = async () => {
    try {
      const response = await api.get('discover/movie', {
        params: {
          language: 'pt-BR',
          sort_by: 'vote_average.desc',
          'vote_count.gte': 500,
          with_origin_country: 'BR',
          with_original_language: 'pt',
        },
      });

      state.topFive = (response.data.results).slice(0,5);
    } catch (error) {
      console.error('Erro top 5 filmes ', error)
    };
  };

  const popularMoviesList = async () => {
    try {
      const response = await api.get('discover/movie', {
        params: {
          page: state.page,
          language: 'pt-BR',
          sort_by: 'popularity.desc',
          'vote_count.gte': 50,
          with_origin_country: 'BR',
          with_original_language: 'pt',
        },
      });

      state.popularMovies = response.data.results;

    } catch (error) {
      console.error('Erro filmes populares', error);
    };
  };

  const ultimosLancamentosList = async () => {
    try {
      const response = await api.get('discover/movie', {
        params: {
          page: state.page,
          language: 'pt-BR',
          primary_release_year: 2025,
          sort_by: 'primary_release_date.desc',
          'vote_count.gte': 2,
          with_origin_country: 'BR',
          with_original_language: 'pt',
        },
      });

      state.ultimosLancamentos = response.data.results;
    } catch (error) {
      console.error('Erro ultimos lançamentos ', error)
    };
  };

  return { movies, topFive, popularMovies, ultimosLancamentos, moviesList, pageMovieUp, pageMovieDown, moviesTopFiveList, popularMoviesList, ultimosLancamentosList };
});
