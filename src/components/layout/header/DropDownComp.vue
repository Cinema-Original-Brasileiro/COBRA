<script setup>
</script>

<template>
  <div>
    <ul>
      <li>Em Cartaz</li>
      <li>Últimos Lançamentos</li>
      <li>Melhores Avaliados</li>
      <li>Mais Populares</li>
    </ul>
  </div>
</template>

<style scoped>
  ul {
    width: 16vw;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
    border-radius: 0.8rem;
    position: relative;
    top: 1rem;
    z-index: 1000;
    font-size: 0.85rem;

    & li {
      padding: 0.6rem 0;
      cursor: pointer;
      transition: 0.5s;
      color: #8c8c8c;
      font-weight: 500;

      &:hover {
        color: #479414;
        transform: translateX(5px);
        transition: 0.5s;
      }
    }
  }
</style>
