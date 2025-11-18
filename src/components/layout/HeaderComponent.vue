<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import Logo from '/images/logo-lightmode.svg'
import BarraPesquisaComp from '../BarraPesquisaComp.vue'

const route = useRoute()

const paginaAtual = (path) => (route.path === path ? 'active' : 'inactive')

const pesquisaAtiva = ref(false)

const alternarPesquisa = () => {
  pesquisaAtiva.value = !pesquisaAtiva.value
}
</script>

<template>
  <header>
    <nav class="nav-bar">
      <h1>
        <img :src="Logo" alt="logo" />
      </h1>


      <ul v-if="pesquisaAtiva === false" class="nav-list">
        <li :class="paginaAtual('/')">Início</li>
        <li :class="paginaAtual('/filmes')">Filmes</li>
        <li :class="paginaAtual('/atores')">Atores</li>
        <li :class="paginaAtual('/produtoras')">Produtoras</li>
        <barra-pesquisa-comp @click="alternarPesquisa"/>
      </ul>

      <div class="barra-pesquisa" v-else>
        <input type="text" placeholder="Busque por algo">
        <span
          class="mdi mdi-close"
          title="Fechar pesquisa"
          @click="alternarPesquisa"
          >
        </span>
      </div>

      <ul class="icon-list">
        <li title="Alternar modo">
          <span class="mdi mdi-weather-sunny" />
        </li>
        <li title="Favoritos">
          <span class="mdi mdi-heart-outline icon-center" />
        </li>
        <li title="Assistir mais tarde">
          <span class="mdi mdi-clock-outline" />
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
/*==== ESTILIZAÇÃO GERAL DO HEADER ====*/

header {
  padding: 1vw 10vw;
  background: rgba(255, 245, 238, 0.5);
  backdrop-filter: blur(5px);
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

/* BARRA DE PESQUISA */

.barra-pesquisa{
  position: relative;
}

.barra-pesquisa input {
  padding: 0.5rem 8rem 0.5rem 1rem;
  background-color: #FFF5EE;
  border: 2px solid #b2b2b2;
  border-radius: 5px;
  transition: .2s;
}

.barra-pesquisa input:focus {
  outline: none;
  transition: .2s;
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
