import { reactive, computed } from "vue";
import { defineStore } from "pinia";
import api from "@/plugins/axios";

export const useGenreStore = defineStore('genre', () => {
    const state = reactive({
        genres: [],
        currentGenresId: [],
    });

    const currentGenresId = computed(() => state.currentGenresId);

    
    const genres = computed(() => state.genres);
    const getGenreName = (id) => state.genres.find((genre) => genre.id === id).name;

    const getAllGenres = async (type) => {
        const response = await api.get(`genre/${type}/list?language=pt-BR`);
        state.genres = response.data.genres;
    };

    const setCurrentGenresId = (genreId) => {
        const index = currentGenresId.indexOf(genreId);
        if (index < 0) {
            currentGenresId[index] = '';
        };
        if (index >= 0) {
            currentGenresId.push(genreId);
        };
    };

    const clearGenres = async () => {
        state.currentGenresId = [];
    };

    return { genres, getAllGenres, getGenreName, currentGenresId, setCurrentGenresId, clearGenres };
});