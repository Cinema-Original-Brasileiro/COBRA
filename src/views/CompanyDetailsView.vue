<script setup>

import { defineProps, onMounted, ref } from 'vue';
import { useCompaniesStore } from '@/stores/company';

const companyStore = useCompaniesStore();

const props = defineProps({
    companyId: {
        type: String,
        required: true,
    },
});

onMounted(async () => {
    await companyStore.companyDetails(props.companyId);
    await companyStore.moviesCompanyList(props.companyId, '', '', '')
});

const drop = ref(false);
const alternarDrop = () => {
    drop.value = !drop.value;
}

// Funcionalidade de seleção de filmes, entre mais populares, melhores avaliados, e últimos lançamentos

let selecionarMaisPopulares = ref(false);
let selecionarMelhoresAvaliados = ref(false);
let selecionarUltimosLancamentos = ref(false);

function selecionadoFiltro() {
    if (selecionarMaisPopulares.value === true) {

        selecionarMelhoresAvaliados.value = false;
        selecionarUltimosLancamentos.value = false;
        companyStore.moviesCompanyList(props.companyId, '', 'popularity.desc', '');
    }
    if (selecionarMelhoresAvaliados.value === true) {

        selecionarMaisPopulares.value = false;
        selecionarUltimosLancamentos.value = false;
        companyStore.moviesCompanyList(props.companyId, '', 'vote_average.desc', '100');
    }
    if (selecionarUltimosLancamentos.value === true) {

        selecionarMaisPopulares.value = false;
        selecionarMelhoresAvaliados.value = false;
        companyStore.moviesCompanyList(props.companyId, '2025', 'popularity.desc', '');

    }
    return companyStore.moviesCompany;
};

// Hover sobre a imagem

const hover = ref(null);

// Função para a classificação do filme

function imagemClassificacao(classificacao) {
  if (classificacao === undefined) {
    classificacao = 'L';
  };
  if (classificacao === 'R') {
    classificacao = '18';
  }
  return new URL(`../components/icons/${classificacao}.png`, import.meta.url).href;
};


</script>

<template>
    <div class="main">

        <div class="company">
            <img :src="`https://image.tmdb.org/t/p/w500/${companyStore.currentCompany.logo_path}`"
                class="company-image">
            <h1>
                {{ companyStore.currentCompany.name }}
            </h1>
            <h2>{{ companyStore.currentCompany.headquarters }}</h2>
            <div v-if="companyStore.currentCompany.homepage != ''" style="margin-bottom: 1.5rem; margin-top: 1rem; cursor: pointer; font-size: 0.9rem; color: #B2B2B2;" class="company-homepage">
                <a :href="companyStore.currentCompany.homepage">{{ companyStore.currentCompany.homepage }}</a>
            </div>
            <hr style="color: #b2b2b259">
        </div>
        <div>
            <div>
                <div>
                    <h3>Filtrar por <span @click="alternarDrop()"
                            :class="drop ? 'mdi mdi-menu-up' : 'mdi mdi-menu-down'">
                            <div class="filtros" style="display: flex; justify-content: center !important;">
                                <ul v-if="drop === true" style="position: absolute; z-index: 1001;"
                                    class="filtros-selecao">
                                    <li @click="selecionarMaisPopulares = !selecionarMaisPopulares"
                                        :class="{ selecionarMaisPopulares: selecionarMaisPopulares }">
                                        <p>Mais populares</p>
                                    </li>
                                    <li @click="selecionarMelhoresAvaliados = !selecionarMelhoresAvaliados"
                                        :class="{ selecionarMelhoresAvaliados: selecionarMelhoresAvaliados }">
                                        <p>Melhores avaliados</p>
                                    </li>
                                    <li @click="selecionarUltimosLancamentos = !selecionarUltimosLancamentos"
                                        :class="{ selecionarUltimosLancamentos: selecionarUltimosLancamentos }"
                                        selecionarUltimosLancamentos>
                                        <p>Últimos Lançamentos</p>
                                    </li>
                                </ul>
                            </div>
                        </span></h3>
                </div>
                <ul style="margin-top: 3vw;">
                    <li v-for="movie in selecionadoFiltro()" :key="movie.id" class="movies-card"
                        @mouseenter="hover = movie.id" @mouseleave="hover = null">
                        <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="movie.title" class="movie-image" @click="openMovie(movie.id)">
                        <div v-show="hover === movie.id" style="display: flex; flex-direction: column; margin-bottom: 0; gap: 0rem; transition: 0.5s;">
                            <h3 class="titulo"
                            :style="{fontSize: (movie.title).length > 20 ? '0.85rem' : '1rem' }"
                            >{{ movie.title }}</h3>
                            <div style="margin-top: 0;">
                                <p class="horas" v-if="movie.runtime >= 0">{{ Math.floor(movie.runtime / 60) }}h {{
                                    (movie.runtime % 60) }}m
                                </p>
                                <img :src="imagemClassificacao(movie.classificacaoIndicativa)"
                                    class="classificacao-indicativa">
                                <p class="ano">{{ movie.release_date.slice(0, 4) }}</p>
                            </div>
                        </div>

                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
.main {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.paginas {
    margin-top: 1.2rem;
    display: flex;
    margin-left: 2.55vw;
}


.paginas button {
    margin-right: 1vw;
    background-color: #F7E9DE;
    border: none;
    border-radius: 100%;
    cursor: pointer;
    padding: 0.15vw 0.3vw;
    transition: 0.3s;

    & span {
        font-size: 1.6rem;
        color: #EECFBA;
    }

    &:hover {
        transition: 0.3s;
        background-color: #edd0bb;

        & span {
            color: #02E563;
            transition: 0.3s;
        }
    }
}

.filtros {
    font-size: 1.1rem;
    font-weight: 400;
    text-align: left !important;
}

.filtros-selecao {
    display: flex !important;
    flex-direction: column !important;
    padding: 1vw 2vw 1vw 2vw;
    cursor: pointer;
    border-radius: 1vw;
    background: rgba(255, 245, 238, 0.9);
    box-shadow: 0 0 1vw rgba(0, 0, 0, 0.04);
    backdrop-filter: blur(1px);
}

.selecionarMaisPopulares,
.selecionarUltimosLancamentos,
.selecionarMelhoresAvaliados {
    font-weight: 600;
}

.company-image {
    width: 30.5rem;
    height: auto;
    height: 13rem;
    max-height: 16rem;
    object-fit: contain;
    opacity: 1;
    border-radius: 4%;
    box-shadow: 0 0 0.1vw rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: 0.9s;

    /* &:hover {
    width: 8.5rem;
    height: 12.5rem;
    scale: 1.25;
    transition: 0.9s;
    box-shadow: 0 0 2vw rgba(0, 0, 0, 0.3);
  } */
}

.informacoes {
    margin-left: 2vw;
    max-width: 12rem;

    & h2:hover {
        cursor: pointer;
        text-decoration: underline;
    }
}


.company-homepage:hover {
    font-weight: 500;
    text-decoration: underline;
}

.company h1 {
    margin-top: 2.5vw;
    font-size: 2rem;
}

.company h2 {
    margin-top: 2.5vw;
    font-size: 1.4rem;
    font-weight: 400;
    color: #B2B2B2;
}

ul {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
}

.actor-movies {
    text-align: justify;
    font-size: 0.8rem;
    text-overflow: ellipsis;
    align-items: stretch;
    overflow: hidden;
    color: #B2B2B2;
}

h2 {
    font-size: 1.2rem;
    color: #080808;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

h3 {
    font-size: 0.9rem;
    margin-bottom: 0.3vw;
    font-weight: normal;
    color: #009440;
}


.movies-card {
    padding: 1vw;
    margin: 0.5vw 4vw 1vw 0;
    min-height: 22rem;
    max-height: 22rem;
    min-width: 12.5rem;
    max-width: 12.5rem;
    border-radius: 15px;
    box-shadow: 0.005208vw 0.005208vw rgba(0, 0, 0, 0.01);
    transition: 0.9s;
}

.movies-card:hover {
    scale: 1.03;
    transition: 0.9s;
    box-shadow: 0 0 0.560416vw rgba(0, 0, 0, 0.09);
}

.movies-card div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
}

.movies-card .movie-image {
    width: 8.36rem;
    height: 13rem;
    object-fit: cover;
    margin: 0.5vw 1vw 0.5vw 1vw;
    justify-content: center;
    align-content: center;
    border-radius: 10px;
}

.classificacao-indicativa {
    height: 0.75rem;
    width: 0.75rem;
    vertical-align: middle;
}

.movies-card p {
    font-size: 0.75rem;
    text-align: center;
    color: #B2B2B2
}

.movies ul {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
}
</style>