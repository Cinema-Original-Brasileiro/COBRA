<script setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useRoute } from 'vue-router'
import Logo from '/images/logo-lightmode.svg'
import BarraPesquisaComp from './BarraPesquisaComp.vue'
import DropDownComp from './DropDownComp.vue'
import router from '@/router'

const route = useRoute()

// Verifica a página atual para o css
const paginaAtual = (path) => (route.path === path ? 'active' : 'inactive')

// Controla  a exibição da barra de pesquisa
const pesquisaAtiva = ref(false);
const barraPesquisaTarget = ref(null);
onClickOutside(barraPesquisaTarget, () => {
  pesquisaAtiva.value = false
})
const alternarPesquisa = () => {
  pesquisaAtiva.value = !pesquisaAtiva.value
}

// Controla a exibição do dropdown
const dropAberto = ref(false);
const dropdownTarget = ref(null);
onClickOutside(dropdownTarget, () => {
  dropAberto.value = false
})
const alternarDrop = () => {
  dropAberto.value = !dropAberto.value
}
</script>

<template>
  <header>
    <nav class="nav-bar">
      <h1>
        <img @click="router.push('/')" :src="Logo" alt="logo" />
      </h1>

      <ul v-if="pesquisaAtiva === false" class="nav-list">
        <li @click="router.push('/')" :class="paginaAtual('/')">Início</li>
        <li @click="router.push('/movies')" :class="paginaAtual('/movies')" ref="dropdownTarget" style="margin-right: 1vw;">
          Filmes
          <span @click.stop="alternarDrop" :class="dropAberto ? 'mdi mdi-chevron-up' : 'mdi mdi-chevron-down'" ></span>
          <drop-down-comp style="position: absolute;" v-if="dropAberto" />
        </li>
        <li :class="paginaAtual('/actors')" @click="router.push('/actors')">Atores</li>
        <li :class="paginaAtual('/companies')" @click="router.push('/companies')">Produtoras</li>
        <li title="Barra de pesquisa"><barra-pesquisa-comp @click="alternarPesquisa" /></li>
      </ul>

      <div class="barra-pesquisa" ref="barraPesquisaTarget" v-else>
        <input type="text" placeholder="Busque por algo" />
        <span class="mdi mdi-close" title="Fechar pesquisa" @click="alternarPesquisa"> </span>
      </div>

      <ul class="icon-list">
        <li title="Alternar modo">
          <span class="mdi mdi-weather-sunny" />
        </li>
        <li @click="router.push('/favorites')" title="Favoritos">
          <span class="mdi mdi-heart-outline icon-center" />
        </li>
        <li @click="router.push('/watch-later')" title="Assistir mais tarde">
          <span class="mdi mdi-clock-outline" />
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
/*==== ESTILIZAÇÃO GERAL DO HEADER ====*/

header {
  padding: 0.8vw 10vw;
  background-color: #FFF5EE;
  color: #080808;
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
}

.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-list {
  display: flex;
  gap: 2rem;
  cursor: pointer;
}

.icon-list {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.icon-list li span {
  font-size: 1.5rem;
  padding: 0 1.5rem;
  color: #479414;
}

.icon-center {
  display: flex;
  align-items: center;
  line-height: 1rem;
  border-right: 3px solid #479414;
  border-left: 3px solid #479414;
  border-radius: 2px;
}

/*===ESTILIZAÇÃO DOS ITENS DE NAVEGAÇÃO==*/

.active {
  font-weight: 600;
}

.inactive {
  color: #8c8c8c;
  transition: 0.2s;

  &:hover {
    color: #b2b2b2;
    transform: translateY(-1.5px);
    transition: 0.2s;
  }
}

.nav-list li span {
  margin-left: 0.5vw;
  position: absolute;
}

/* BARRA DE PESQUISA */

.barra-pesquisa {
  position: relative;
}

.barra-pesquisa input {
  padding: 0.5rem 8rem 0.5rem 1rem;
  background-color: #fff5ee;
  border: 2px solid #b2b2b2;
  border-radius: 5px;
  transition: 0.2s;
}

.barra-pesquisa input:focus {
  outline: none;
  transition: 0.2s;
  border: 2px solid #8c8c8c;
  box-shadow: 0 0 5px #b2b2b2;
}

.barra-pesquisa span {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #8c8c8c;
  cursor: pointer;
}
</style>
