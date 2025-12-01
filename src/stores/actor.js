import api from '@/plugins/axios'
import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'

const idActors = [
  8602, 52583,55009, 17289, 10055, 54882, 27396, 55836, 55824, 55106, 130044, 1248966, 228059,
  1540112, 1475549, 1255197, 102552, 55825, 55833, 55828, 59321, 55111, 55112, 8595, 8596, 8597,
  8598, 8599, 8600, 8603, 8605, 52585, 52586, 55103, 55105, 55012, 55015, 55026, 55027, 55031,
  55034, 55036, 55101, 55109, 55113, 58663, 66252, 5659, 209198, 207606, 10583, 55114, 55830,
  1328983, 59537, 65462, 65463, 65464, 65465, 1622590, 1280250, 2072389, 1475116, 1286908, 6585,
  1836856, 1724035, 26662, 27018, 27026, 27029, 30850, 34618, 39157, 39158, 44333, 50363, 50369,
  52534, 54995, 54996, 54997, 54998, 54999, 55010, 55011, 55023, 55024, 55025, 55028, 55029, 55033,
  55336, 55337, 55835, 55837, 57379, 59317, 62871, 63039, 64240, 64772, 66609,
]

// Paginaçãow

const itensPorPagina = 20
const paginas = []

for (let divisao = 0; divisao < idActors.length; divisao += itensPorPagina) {
  const pagina = idActors.slice(divisao, divisao + itensPorPagina)
  paginas.push(pagina)
}

export const useActorsStore = defineStore('actor', () => {
  const state = reactive({
    actors: [],
    currentActor: [],
    moviesActor: [],
    pages: 0,
    pagesMovie: 1,
  })

  const actors = computed(() => state.actors)
  const pages = computed(() => state.pages)
  const currentActor = computed(() => state.currentActor)
  const moviesActor = computed(() => state.moviesActor)
  const pagesMovie = computed(() => state.pagesMovie)

  const actorsList = async () => {
    try {
      for (const idActor of paginas[state.pages]) {
        const response = await api.get(`person/${idActor}`, { params: { language:  'pt-BR'}})
        if (response.data.known_for_department === 'Acting') {
          state.actors.push(response.data)
        }
      }
    } catch (error) {
      console.error('Erro ator ', error)
    }
  }

  // Acesso à outras Páginas de Atores

  const actorsPageUp = () => {
    state.pages = state.pages + 1
    state.actors = []
    actorsList()
  }

  const actorsPageDown = () => {
    if (state.pages > 0) {
      state.pages = state.pages - 1
      state.actors = []
      actorsList()
    }
  }

  const actorDetails = async (actorId) => {
    try {
      const response = await api.get(`person/${actorId}`)
      state.currentActor = response.data
    } catch (error) {
      console.error('Erro detalhes ator(a) ', error)
    }
  }

  const moviesActorPageUp = async (actorId) => {
    state.pagesMovie = state.pagesMovie + 1
    moviesActorList(actorId)
  }
  const moviesActorPageDown = async (actorId) => {
    state.pagesMovie = state.pagesMovie - 1
    moviesActorList(actorId)
  }

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
      })
      state.moviesActor = response.data.results
    } catch (error) {
      console.error('Erro detalhes filmes da produtora ', error)
    }
  }

  return {
    actors,
    pages,
    currentActor,
    moviesActor,
    actorsList,
    actorDetails,
    moviesActorList,
    actorsPageUp,
    actorsPageDown,
    moviesActorPageUp,
    moviesActorPageDown,
  }
})
