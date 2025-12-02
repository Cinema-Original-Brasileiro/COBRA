<script setup>
import LogoFooter from '/images/logo-footer.svg';
</script>

<template>
  <footer>
    <img :src="LogoFooter" alt="logo">

    <div class="dev-list">
      <h3>Desenvolvedores</h3>
      <ul>
        <li>
          <a href="https://github.com/carloshenriqueok">Carlos Henrique</a>
        </li>
        <li>
          <a href="https://github.com/victor-de-sousa">Victor de Sousa</a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background-color: #009440;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2vw 10vw;
  margin-top: 3vw;

  .dev-list {
    color: #FFF5EE;
    & h3 {
      font-size: 1.2rem;
      margin-bottom: 0.5vw;
    }

    & li {
      margin-bottom: 0.3vw;

      & :hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
