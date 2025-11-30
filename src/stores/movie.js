import api from '@/plugins/axios'
import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { useGenreStore } from './genre';

export const useMoviesStore = defineStore('movies', () => {
  const genreStore = useGenreStore();
  const state = reactive({
    movies: [],
    topFive: [],
    popularMovies: [],
    ultimosLancamentos: [],
    currentMovie: {},
    castMovie: [],
    page: 1,
    logos: {}
  });

  const movies = computed(() => state.movies)
  const topFive = computed(() => state.topFive);
  const popularMovies = computed(() => state.popularMovies);
  const ultimosLancamentos = computed(() => state.ultimosLancamentos);
  const currentMovie = computed(() => state.currentMovie);
  const castMovie = computed(() => state.castMovie);

  const moviePageUp = () => {
    state.page = state.page + 1;
    moviesList();
    popularMoviesList();
    ultimosLancamentosList();
  };

  const moviePageDown = () => {
    if (state.page > 1) {
      state.page = state.page - 1;
      moviesList();
      popularMoviesList();
      ultimosLancamentosList();
    }
  };

  const moviesList = async () => {
    try {
      const response = await api.get('discover/movie', {
        params: {
          with_origin_country: 'BR',
          language: 'pt-BR',
          page: state.page,
          with_genres: genreStore.currentGenresId.join(','),
        },
      })


      state.movies = response.data.results;
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

      state.topFive = response.data.results;
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
          language: 'pt-BR',
          page: state.page,
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

  const movieDetail = async (movieId) => {
    try {
    const response = await api.get(`movie/${movieId}`, { params: { language: 'pt-BR' }});
      state.currentMovie = response.data;
    } catch (error) {
      console.error('Erro detalhes de filme: ', error);
      throw error;
    };
  };

  const castMovieList = async (movieId) => {
    try {
      const response = await api.get(`movie/${movieId}/credits`, {
        params: {
          language: 'pt-BR',
      }}
    );

    const resultado = response.data.cast;

    const filterCast = resultado.filter((individual) => individual.known_for_department === 'Acting' || individual.known_for_department === 'Directing');

    state.castMovie = filterCast;

    } catch(error) {
      console.error('Erro elenco do filme ', error);
      throw error;
    }
  };


  const logosList = async (movieId) => {
    try {
      const response = await api.get(`movie/${movieId}/images` , {
        params: {
          include_image_language: 'pt-BR, null',
        }
      });

      const logo = response.data.logos?.[0]
      state.logos[movieId] = logo;
      return logo;
    } catch (error) {
      console.error('Erro ao buscar logos', error);
    }
  }

  const addLogoToMovie = async (movies) => {
    for (const m of movies) {
      const logo = await logosList(m.id);
      m.logo_path = logo?.file_path || null;
    }
  }

  return { movies, topFive, popularMovies, ultimosLancamentos, currentMovie, castMovie, moviesList, moviePageUp, moviePageDown, moviesTopFiveList, popularMoviesList, ultimosLancamentosList, movieDetail, castMovieList, logosList, addLogoToMovie };
});
