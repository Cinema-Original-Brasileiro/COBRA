import api from '@/plugins/axios'
import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'

const idCompanies = [
  345, 346, 1223, 1731, 2425, 2427, 2429, 2430, 2432, 2433, 2434, 2445, 2530, 2535, 3293, 4243,
  4290, 4490, 4943, 5591, 5597, 5713, 5911, 6445, 6446, 6565, 6927, 7462, 7468, 7762, 7763, 7764,
  7765, 8405, 8426, 8428, 8429, 8435, 8436, 8437, 8479, 8480, 8496, 8508, 8542, 8564, 8565, 8580,
  8955, 9171, 9184, 10023, 10796, 10942, 11021, 11312, 11314, 11446, 11507, 11547, 12754, 12755,
  12866, 12867, 13003, 13012, 13118, 13134, 13573, 13699, 13918, 13930, 13931, 13966, 13967, 13968,
  13969, 14011, 14014, 14565, 14594, 14848, 14851, 14853, 14860, 15076, 15313, 15386, 15387, 15390,
  15445, 16387, 16537, 16703, 17215, 17415, 17664, 17665, 17680, 17748, 18514, 18558, 18718, 18723,
  18724, 19035, 19036, 19373, 19714, 19868, 19869, 20272, 20708, 20726, 20749, 20958, 20959, 22088,
  22586, 22896, 22908, 22909, 22916, 23023, 24121, 24739, 25041, 25326, 25327, 25667, 25999, 26673,
  26736, 28170, 28212, 28232, 28333, 28440, 28634, 28814, 28815, 29171, 29891, 30408, 30409, 30410,
  30423, 30424, 30622, 30625, 30626, 30666, 30779, 30883, 31009, 31010, 31049, 31050, 31054, 31055,
  31373, 31573, 31770, 32606, 32624, 32770, 32795, 32820, 33197, 33757, 33758, 33792, 33794, 34239,
  34263, 34630, 34647, 34786, 36091, 36523, 36540, 36660, 37023, 37098, 37100, 37199, 37201, 37202,
  37203, 37204, 37340, 37359, 37400, 37401, 37488, 37489, 37490, 37722, 37966, 38224, 40067, 40068,
  40326, 40332, 40333, 40478, 40992, 40994, 41238, 41320, 41568, 41638, 41803, 42117, 42118, 42132,
  42817, 43310, 43317, 43321, 43322, 43553, 43798, 44159, 44183, 44609, 44619, 44620, 44663, 44664,
  44711, 44863, 45238, 45472, 45618, 45619, 46430, 46541, 46576, 46879, 47044, 47046, 47052, 47462,
  47493, 47546, 47787, 48165, 48567, 49188, 49710, 49756, 49843, 49862, 49866, 49957, 50099, 50815,
  50818, 50875, 50968, 50995, 51105, 51211, 51212, 51255, 51256, 51299, 51306, 51387, 51563, 51985,
  52258, 52266, 52657, 52658, 52686, 53105, 53286, 53447, 53727, 53758, 53768, 53876, 53877, 54054,
  54067, 54351, 54386, 54523, 54590, 55563, 55564, 55992, 56025, 56196, 56545, 56546, 57183, 57414,
  57438, 57559, 57561, 58043, 58044, 58414, 58619, 58916, 58999, 59000, 59458, 59620, 59736, 60463,
  60792, 60793, 61754, 61988, 61993, 62022, 62202, 62226, 62333, 62334, 62518, 62744, 63012, 63183,
  63276, 63277, 63481, 63500, 63501, 63588, 63804, 64363, 64535, 64581, 64835, 65300, 65310, 65311,
  65727, 65922, 66231, 66232, 66416, 66513, 66934, 67018, 67188, 67192, 67650, 67721, 67844, 68012,
  68013, 68036, 68103, 68231, 68932, 68933, 68962, 69025, 69027, 69672, 70464, 70539, 70891, 70941,
  78060, 78256, 78257, 78865, 79031, 79506, 79743, 79744, 79880, 79945, 80023, 80030, 80097, 80161,
  80212, 80213, 80240, 80269, 80324, 80325, 80338, 80352, 80561, 80937, 80938, 81036, 81045, 81072,
  81432, 81436, 81439, 81446, 81447, 81769, 81938, 81942, 81976, 82194, 82196, 82239, 82270, 82389,
  82441, 82442, 82683, 82688, 82792, 82793, 83011, 83012, 83013, 83040, 83053, 83169, 83170, 83336,
  83500, 83729, 83799, 83834, 83973, 83975, 84114, 84262, 84282, 84297, 84298, 84447, 84671, 84735,
  84896, 85315, 85375, 85388, 85544, 85607, 85609, 85710, 85747, 85929, 85958, 85988, 85991, 85992,
  86034, 86051, 86052, 86053, 86094, 86279, 86322, 86384, 86386, 86431, 86457, 86544, 86556, 86869,
  87180, 87253, 87452, 87456, 87557, 87629, 87643, 87662, 87774, 87782, 87798, 87882, 87888, 87961,
  87983, 88042, 88084, 88117, 88174, 88220, 88221, 88222, 88439, 88634, 88922, 88952, 89438, 89453,
  89713, 89727, 89823, 89846, 90083, 90217, 90226, 90546, 90716, 90928, 90934, 91284, 91285, 91323,
  91378, 91705, 91850, 91976, 92034, 92048, 92304, 92306, 92307, 92308, 92353, 92355, 92609, 92687,
  92882, 92886, 92933, 92934, 93133, 93149, 93178, 93179, 93180, 93181, 93184, 93187, 93188, 93189,
  93190, 93191, 93193, 93195, 93196, 93198, 93199, 93200, 93201, 93202, 93203, 93205, 93207, 93208,
  93211, 93216, 93217, 93221, 93231, 93232, 93235, 93236, 93239, 93240, 93243, 93244, 93246, 93250,
  93251, 93253, 93257, 93261, 93268, 93269, 93276, 93291, 93328, 93331, 93361, 93411, 93412, 93430,
  93584, 93634, 93649, 93735, 93760, 93798, 93860, 93980, 93992, 93996, 94228, 94232, 94317, 94354,
  94359, 94389, 94589, 94697, 94762, 94768, 94769, 94844, 94851, 94852, 94877, 95036, 95037, 95038,
  95200, 95223, 95377, 95601, 95603, 95608, 95743, 95878, 96000, 96004, 96017, 96025, 96045, 96053,
  96179, 96218, 96224, 96226, 96472, 96476, 96755, 96773, 97009, 97083, 97280, 97677, 97758, 97764,
  97822, 97831, 97952, 98026, 99070, 99265, 99687, 99726, 99760, 99762, 99763, 99765, 99771, 99777,
  99785, 99822, 99827, 99946, 100008, 100018, 100023, 100040, 100187, 100274, 100281, 100283,
  100284, 100285, 100340, 100353, 100380, 100384, 100386, 100420, 100427, 100428, 100457, 100463,
  100468, 100469, 100470, 100476, 100477, 100479, 100480, 100520, 100521, 100525, 100530, 100541,
  100542, 100573, 100574, 100576,
]

// Paginação

const itensPorPagina = 9
const paginas = []

for (let divisao = 0; divisao < idCompanies.length; divisao += itensPorPagina) {
  const pagina = idCompanies.slice(divisao, divisao + itensPorPagina)
  paginas.push(pagina)
}

export const useCompaniesStore = defineStore('company', () => {
  const state = reactive({
    companies: [],
    currentCompany: [],
    moviesCompany: [],
    pages: 0,
    pagesMovie: 1,
  })

  const companies = computed(() => state.companies)
  const currentCompany = computed(() => state.currentCompany)
  const moviesCompany = computed(() => state.moviesCompany)
  const pages = computed(() => state.pages)
  const pagesMovie = computed(() => state.pagesMovie)

  const companiesList = async () => {
    try {
      for (const idCompany of paginas[state.pages]) {
        const response = await api.get(`company/${idCompany}`)

        const resultado = response.data

        try {
          const responseMovie = await moviesCompanyList(resultado.id)
          resultado.movies = state.moviesCompany
        } catch (error) {
          console.error('Erro filmes produtora CompaniesList', error)
        }

        state.companies.push(resultado)
      }
    } catch (error) {
      console.error('Erro produtora ', error)
    }
  }

  const companiesPageUp = () => {
    state.pages = state.pages + 1
    state.companies = []
    companiesList()
  }

  const companiesPageDown = () => {
    state.pages = state.pages - 1
    state.companies = []
    companiesList()
  }

  const companyDetails = async (companyId) => {
    try {
      const response = await api.get(`company/${companyId}`)
      state.currentCompany = response.data
    } catch (error) {
      console.error('Erro detalhes produtora ', error)
    }
  }

  const moviesCompanyPageUp = (companyId) => {
    state.pagesMovie = state.pagesMovie + 1
    moviesCompanyList(companyId)
  }
  const moviesCompanyPageDown = (companyId) => {
    state.pagesMovie = state.pagesMovie - 1
    moviesCompanyList(companyId)
  }

  const moviesCompanyList = async (companyId, ano_lancamentos, escolha, votos) => {
    try {
      const response = await api.get(`discover/movie`, {
        params: {
          language: 'pt-BR',
          page: state.pagesMovie,
          primary_release_year: ano_lancamentos,
          sort_by: escolha,
          'vote_count.gte': votos,
          with_origin_country: 'BR',
          with_companies: companyId,
        },
      })

      const resultado = response.data.results

      for (const movie of resultado) {
        try {
          const responseMovie = await api.get(`movie/${movie.id}`)
          movie.runtime = responseMovie.data.runtime
        } catch (error) {
          console.error('Erro tempo de duração filme', error)
        }

        // Certifications (Classficação Indicativa)

        try {
          const responseMovie = await api.get(`movie/${movie.id}/release_dates`)
          const resultado = responseMovie.data.results
          const verificacaoBrasil = resultado.find((pais) => pais.iso_3166_1 === 'BR')
          if (verificacaoBrasil == undefined || verificacaoBrasil == null) {
            movie.classificacaoIndicativa = 'L'
            break
          }

          const classificacaoValida = verificacaoBrasil.release_dates.find(
            (classificacao) => classificacao.certification != '',
          )

          if (classificacaoValida?.certification == undefined) {
            movie.classificacaoIndicativa = 'L'
          } else {
            movie.classificacaoIndicativa = classificacaoValida?.certification
          }
        } catch (error) {
          console.error('Erro classificação indicativa:', error)
        }

        state.moviesCompany = resultado
      }
    } catch (error) {
      console.error('Erro detalhes filmes da produtora ', error)
    }
  }

  return {
    companies,
    pages,
    currentCompany,
    moviesCompany,
    companiesList,
    companyDetails,
    companiesPageUp,
    companiesPageDown,
    moviesCompanyList,
    moviesCompanyPageUp,
    moviesCompanyPageDown,
  }
})
