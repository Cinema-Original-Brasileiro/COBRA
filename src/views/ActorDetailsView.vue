<script setup>

import { ref, computed, onMounted } from 'vue';
import { useActorsStore } from '@/stores/actor';
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const actorStore = useActorsStore();
const router = useRouter();

const props = defineProps({
    actorId: {
        type: String,
        required: true,
    },
});

onMounted(async () => {
    await actorStore.actorDetails(props.actorId);
    await actorStore.moviesActorList(props.actorId, '', '', '');
})

function actorGender(gender) {
    if (gender === 0) {
        return 'Não especificado';
    }
    if (gender === 1) {
        return 'Feminino';
    }
    if (gender === 2) {
        return 'Masculino';
    }
    else {
        return 'Não binário';
    }
}
function openMovie(id) {
  router.push({name: 'movie', params: {id}});
};

// Artigo que usei para pegar dia atual
// https://www.freecodecamp.org/portuguese/news/date-now-em-javascript-como-obter-a-data-atual-em-javascript/

const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR', {
    year: "numeric",
    month: "long",
    day: "numeric",
});

const idade = computed(() => {
    if (actorStore.currentActor.deathday === null) {
        const aniversario = actorStore.currentActor.birthday;
        if (aniversario === undefined) {
            return '';
        };
        let atorNascimento = actorStore.currentActor.birthday.replaceAll('-', '').slice(0, 10);
        let diaAtual = (new Date()).toISOString().slice(0, 10).replaceAll('-', '');

        if (Number(diaAtual.slice(4, 6)) > Number(atorNascimento.slice(4, 6))) {
            return (Number(diaAtual.slice(0, 4)) - Number(atorNascimento.slice(0, 4)));
        };
        if (Number(diaAtual.slice(4, 6)) < Number(atorNascimento.slice(4, 6))) {
            return (Number(diaAtual.slice(0, 4)) - Number(atorNascimento.slice(0, 4)) - 1);
        };
    }
    return '';
});

const drop = ref(false);
const alternarDrop = () => {
    drop.value = !drop.value;
}

let selecionarMaisPopulares = ref(false);
let selecionarMelhoresAvaliados = ref(false);
let selecionarUltimosLancamentos = ref(false);

function selecionadoFiltro() {
    if (selecionarMaisPopulares.value === true) {

        selecionarMelhoresAvaliados.value = false;
        selecionarUltimosLancamentos.value = false;
        actorStore.moviesActorList(props.actorId, '', 'popularity.desc', '');
    }
    if (selecionarMelhoresAvaliados.value === true) {

        selecionarMaisPopulares.value = false;
        selecionarUltimosLancamentos.value = false;
        actorStore.moviesActorList(props.actorId, '', 'vote_average.desc', '100');
    }
    if (selecionarUltimosLancamentos.value === true) {

        selecionarMaisPopulares.value = false;
        selecionarMelhoresAvaliados.value = false;
        actorStore.moviesActorList(props.actorId, '2025', 'popularity.desc', '');

    }
    return actorStore.moviesActor;
};

const LimiteBiografia = 450;

const expandido = ref(false);

function cortarTexto(biografia) {
    if (biografia === undefined) {
        return '';
    }

    if (biografia < LimiteBiografia) {
        return biografia;
    }
    return biografia.slice(0, LimiteBiografia) + '...';
};



</script>

<template>
    <div class="main">
        <div class="ator">
            <img :src="`https://image.tmdb.org/t/p/w500/${actorStore.currentActor.profile_path}`" alt="">
            <div class="biografia">
                <h3>Biografia</h3>
                <p class="biografia-text" style="margin-bottom: 0.3vw;">{{ expandido === true ? actorStore.currentActor.biography : cortarTexto(actorStore.currentActor.biography) }}</p>
                    <p v-if="actorStore.currentActor.biography?.length > LimiteBiografia" @click="expandido = !expandido" style="color: #B2B2B2; text-decoration: underline; margin-top: 0;">{{ !expandido ? 'Ler mais' : 'Ler menos' }}</p>
            </div>
            <div class="informacoes">
                <h3>Informações Pessoais</h3>
                <div>
                    <h4>Data de Nascimento</h4>
                    <p>{{ formatDate(actorStore.currentActor.birthday) }} - {{ idade }} anos de Idade</p>
                </div>
                <div>
                    <h4>Gênero</h4>
                    <p>{{ actorGender(actorStore.currentActor.gender) }}</p>
                </div>
                <div>
                    <h4>Nasceu Em</h4>
                    <p>{{ actorStore.currentActor.place_of_birth }}</p>
                </div>
            </div>
        </div>
        <div class="movies">
            <div>
                <h2>Com participações de</h2>
                <h1>{{ actorStore.currentActor.name }}</h1>
            </div>
            <hr />
            <div>
                <div>
                    <h3>Filtrar por <span @click="alternarDrop()"
                            :class="drop ? 'mdi mdi-menu-up' : 'mdi mdi-menu-down'">
                            <div class="filtros">
                                <ul v-if="drop === true" style="position: absolute; z-index: 1001" class="filtros-selecao">
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
                <ul>
                    <li v-for="movie in selecionadoFiltro()" :key="movie.id" class="movies-card">
                        <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" alt="movie.title "
                            class="movie-image"
                            @click="openMovie(movie.id)"
                            >
                    </li>
                </ul>
            </div>
        </div>
    </div>

</template>

<style scoped>
.main {
    display: flex;
    padding: 1vw 10vw;
}

.ator {
    max-width: 22%;
    margin-right: 9%;
}

.ator img {
    width: 18rem;
    height: 27.0774rem;
    object-fit: cover;
    border-radius: 0.78125vw;
    margin-bottom: 2vw;
}

.ator h3 {
    font-size: 1.2rem;
}

.ator h4 {
    font-size: 1.1rem;
    margin-bottom: 0;
}

.ator p {
    font-size: 1rem;
}

.informacoes p {
    color: #B2B2B2;
}

.filtros {
    font-size: 1.1rem;
    font-weight: 400;
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

.movies h1 {
    font-size: 2rem;
    font-weight: 600;
    margin-top: 0;
}

.movies h2 {
    font-size: 1.4rem;
    font-weight: 400;
    color: #B2B2B2;
}

hr {
    width: 103%;
    color: #b2b2b24a;
}

.movies ul {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
}

.movie-image {
    width: 7.666666rem;
    height: 11.5rem;
    object-fit: cover;
    margin: 0.5vw 1.5vw 2rem 1vw;
    border-radius: 10px;
    transition: 1.2s;
    box-shadow: 0 0 0.1vw rgba(0, 0, 0, 0.1);
    &:hover {
        scale: 1.25;
        transition: 0.9s;
        box-shadow: 0 0 2vw rgba(0, 0, 0, 0.3);
    }
}
</style>
