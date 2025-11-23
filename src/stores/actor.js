import api from '@/plugins/axios'
import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'

const idActors = [54882, 228059, 52583, 8602, 3656, 55018, 520615, 151949, 96481, 1475116, 27396, 1262688, 1002745, 1285487, 1175842, 1529511, 17289, 1074749, 1007641, 1615924, 563826, 1724037, 6585, 1529511, 1328983, 1180864, 90208, 1540112];

// Paginação

const itensPorPagina = 20;
const paginas = [];

for (let divisao = 0; divisao < idActors.length; divisao+=itensPorPagina) {
  const pagina = idActors.slice(divisao, divisao + itensPorPagina);
  paginas.push(pagina);
};

export const useActorsStore = defineStore('actor', () => {
  const state = reactive({
    actors: [],
    currentActor: [],
    moviesActor: [],
    pages: 0,
    pagesMovie: 1,
  });

  const actors = computed(() => state.actors);
  const pages = computed(() => state.pages);
  const currentActor = computed(() => state.currentActor);
  const moviesActor = computed(() => state.moviesActor);
  const pagesMovie = computed(() => state.pagesMovie);

  const actorsList = async () => {
    try {
      for (const idActor of paginas[state.pages]) {
        const response = await api.get(`person/${idActor}`);
        if (response.data.known_for_department === 'Acting') {
          state.actors.push(response.data);
        };
      };
    } catch (error) {
      console.error('Erro ator ', error);
    };
  };

  // Acesso à outras Páginas de Atores
  
  const actorsPageUp = () => {
    state.pages = state.pages + 1;
    state.actors = [];
    actorsList();
  }
  
  const actorsPageDown = () => {
    if (state.pages > 0) {
      state.pages = state.pages - 1;
      state.actors = [];
      actorsList();
    }
  }

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
          page: state.pagesMovie,
          language: 'pt-BR',
          sort_by: 'popularity.desc',
          with_origin_country: 'BR',
          with_people: actorId,
        },
      });
      state.moviesActor = response.data.results;
    } catch (error) {
      console.error('Erro detalhes filmes da produtora ', error)
    };
  };

  return { actors, pages, currentActor, moviesActor, actorsList, actorDetails, moviesActorList, actorsPageUp, actorsPageDown, moviesActorPageUp, moviesActorPageDown };
});
