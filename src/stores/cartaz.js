import api from '@/plugins/axios';
import { defineStore } from 'pinia';
import { reactive, computed } from 'vue';

export const useCartazStore = defineStore('cartaz', () => {
  const state = reactive({
    cartazMovies: [],
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

  return { cartazMovies, cartazList, cartazMoviesBr };

})
