
import api from '@/plugins/axios'
import { computed, reactive } from 'vue';
import { defineStore } from "pinia";

export const useSearchStore = defineStore('search', () => {
    const state = reactive({
        search: [],      
    });

    const search = computed(() => state.search);
    
    const searchResult = async (userResponse) => {
        try {
            const response = await api.get('search/multi', {
                params: {
                    query: userResponse,
                    language: 'pt-BR',
                },
            });

            const resultado = response.data.results;

            const verificacaoArray = resultado.filter((individual) => individual.media_type === 'person' || individual.media_type === 'movie');

            state.search = verificacaoArray;

        } catch (error) {
            console.error('Erro pesquisa ', error);
        };
    };

    return { search, searchResult };
});