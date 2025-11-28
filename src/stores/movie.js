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
  });

  const movies = computed(() => state.movies)
  const topFive = computed(() => state.topFive);
  const popularMovies = computed(() => state.popularMovies);
  const ultimosLancamentos = computed(() => state.ultimosLancamentos);
  const currentMovie = computed(() => state.currentMovie);
  const castMovie = computed(() => state.castMovie);
  const runTime = computed(() => state.runTime);

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
          include_adult: 'false',
          with_genres: genreStore.currentGenresId.join(','),
        },
      });

      const resultado = response.data.results;

      for (const movie of resultado) {
        try {
          const responseMovie = await api.get(`movie/${movie.id}`);
          movie.runtime = responseMovie.data.runtime;
        } catch (error) {
          console.error('Erro tempo de duração filme', error);
        }

        // Certifications (Classficação Indicativa)
                
        try {
          const responseMovie = await api.get(`movie/${movie.id}/release_dates`);
          const resultado = responseMovie.data.results;
          const verificacaoBrasil = resultado.find(pais => pais.iso_3166_1 === "BR");
          if (verificacaoBrasil == undefined || verificacaoBrasil == null){
            movie.classificacaoIndicativa = 'L';
            break;
          }

          const classificacaoValida = verificacaoBrasil.release_dates.find(classificacao => classificacao.certification != '');
          
          if (classificacaoValida?.certification == undefined) {
            movie.classificacaoIndicativa = 'L';
          }
          else {
            movie.classificacaoIndicativa = classificacaoValida?.certification;
          }
          
        } catch (error) {
          console.error("Erro classificação indicativa:", error);
        }
      }


      state.movies = resultado;
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
      const response = await api.get(`movie/${movieId}`);
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

  return { movies, topFive, popularMovies, ultimosLancamentos, currentMovie, castMovie, moviesList, moviePageUp, moviePageDown, moviesTopFiveList, popularMoviesList, ultimosLancamentosList, movieDetail, castMovieList };
});