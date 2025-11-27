import api from '@/plugins/axios';
import { defineStore } from 'pinia';
import { reactive, computed } from 'vue';

export const useCartazStore = defineStore('cartaz', () => {
  const state = reactive({
    cartazMovies: [],
    logos: {},
  });

  const cartazMovies = computed(() => state.cartazMovies);
  const cartazMoviesBr = computed(() => state.cartazMovies.filter((m) => m.original_language == 'pt'));

  const cartazList = async (page = 1) => {
    try {
      const response = await api.get('movie/now_playing', {
        params: {
          language: 'pt-BR',
          region: 'BR',
          page,
        },
      });

      state.cartazMovies = [...state.cartazMovies.concat(...response.data.results)];

    } catch (error) {
      console.error('Erro filmes em cartaz: ', error);
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

  return { cartazMovies, cartazList, cartazMoviesBr, logosList, addLogoToMovie };

})
