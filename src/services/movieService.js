import api from '@/plugins/axios'
import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMoviesStore = defineStore('movies', () => {
  const state = reactive({
    movies: [],
    page: 1,
    
  })

  const movies = computed(() => state.movies)

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
          page: page,
        },
      })
      state.movies = response.data.results
    } catch (error) {
      console.error('Erro filme ', error)
    }
  }

  const moviesTop5 = async () => {
    try {
      const response = await api.get('discover/movie', {
        params: {
          with_origin_country: 'BR',
          language: 'pt-BR',
          with_original_language: 'pt',
          page: state.page,
          sort_by: 'vote_average.desc',
          'vote_count.gte': 500,
        },
      })

      
      state.movies = response.data.results;
      const topCinco = state.movies.slice(0,5);
    } catch (error) {
      console.error('Erro filme ', error)
    }
  }

  return { movies, moviesList, pageMovieUp, pageMovieDown, moviesTop5 }
})
