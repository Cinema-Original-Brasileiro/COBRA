import { reactive, computed } from "vue";
import { defineStore } from "pinia";
import api from "@/plugins/axios";
import { useMoviesStore } from "./movie";

export const useGenreStore = defineStore('genre', () => {
    const state = reactive({
        genres: [],
        currentGenresId: [],
    });

    const moviesStore = useMoviesStore();
    
    function selectGenres(id) {
        setCurrentGenresId(id);
        moviesStore.moviesList();
        moviesStore.popularMoviesList();
        moviesStore.ultimosLancamentosList();
        moviesStore.moviesTopFiveList();
        moviesStore.page = 1;
    }

    const genres = computed(() => state.genres);
    const currentGenresId = computed(() => state.currentGenresId);

    const getGenreName = (id) => state.genres.find((genre) => genre.id === id).name;

    const getAllGenres = async (type) => {
        const response = await api.get(`genre/${type}/list?language=pt-BR`);
        state.genres = response.data.genres;
    };

    const setCurrentGenresId = (genreId) => {
        const verificacao = state.currentGenresId.indexOf(genreId);
        if (verificacao < 0) {
            state.currentGenresId.push(genreId);
        }
        else {
            state.currentGenresId.splice(verificacao, 1);
        }
    };

    const clearGenres = () => {
        state.currentGenresId = [];
        moviesStore.moviesList();
    };

    return { genres, getAllGenres, getGenreName, currentGenresId, setCurrentGenresId, clearGenres, selectGenres };
});