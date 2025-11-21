import api from '@/plugins/axios'
import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'

const idActors = [52583, 17289, 1007641, 12386, 1328983]

export const useActorsStore = defineStore('actor', () => {
  const state = reactive({
    actors: [],
    currentActor: [],
    moviesActor: [],
    pagesMovie: 1,
  });

  const actors = computed(() => state.actors);
  const pagesMovie = computed(() => state.pagesMovie);
  const moviesActor = computed(() => state.moviesActor);

  const actorsList = async () => {
    try {
      for (const idActor of idActors) {
        const response = await api.get(`person/${idActor}`);
        if (response.data.known_for_department === 'Acting') {
          state.actors.push(response.data);
        };
      };
    } catch (error) {
      console.error('Erro ator ', error);
    };
  };

  const actorDetails = async (actorId) => {
    try {
      const response = await api.get(`person/${actorId}`);
      state.currentActor = response.data;
    } catch (error) {
      console.error('Erro detalhes ator(a) ', error);
    };
  };

    const moviesActorPageUp = async (actorId) => {
    state.pagesMovie = state.pagesMovie + 1;
    moviesActorList(actorId);
  };
  const moviesActorPageDown = async (actorId) => {
    state.pagesMovie = state.pagesMovie - 1;
    moviesActorList(actorId);
  };

  const moviesActorList = async (actorId) => {
    try {
      const response = await api.get(`discover/movie`, {
        params: {
          language: 'pt-BR',
          page: state.pagesMovie,
          sort_by: 'popularity.desc',
          with_origin_country: 'BR',
          with_people: actorId,
        },
      });
      state.movies = response.data.results;
    } catch (error) {
      console.error('Erro detalhes filmes da produtora ', error)
    };
  };

  return { actors, currentActor, moviesActor, actorsList, actorDetails, moviesActorList, moviesActorPageUp, moviesActorPageDown };
});
