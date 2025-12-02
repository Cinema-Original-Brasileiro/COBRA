<script setup>
import HeaderComponent from '@/components/layout/header/HeaderComponent.vue';
import FooterComp from './components/layout/FooterComp.vue';

</script>


<template>
  <header-component />
  <main>
    <router-view />
  </main>
  <footer-comp />
</template>

<style scoped>
</style>
