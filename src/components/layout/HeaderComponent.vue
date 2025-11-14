<script setup>
import { useRoute } from 'vue-router';
import Logo from '/images/logo-lightmode.svg'

const route = useRoute();

const paginaAtual = (path) => ( route.path === path ? 'active' : 'inactive' );

</script>

<template>
  <header>
    <nav class="nav-bar">

      <h1>
        <img :src="Logo" alt="logo" />
      </h1>

      <ul class="nav-list">
        <li :class="paginaAtual('/')">Início</li>
        <li :class="paginaAtual('/filmes')">Filmes</li>
        <li :class="paginaAtual('/atores')">Atores</li>
        <li :class="paginaAtual('/produtoras')">Produtoras</li>
      </ul>

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
    padding: 0 10vw;
    background: rgba(255, 245, 238, 0.5);
    backdrop-filter: blur(5px);
    position: sticky;
    top: 0;
    z-index: 1000;
    width: 100%;;
  }

  .nav-bar{
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
    font-size:  1.5rem;
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
    transition: .2s;

    &:hover {
      color: #b2b2b2;
      transform: translateY(-1.5px);
      transition: .2s;
    }
  }

</style>
