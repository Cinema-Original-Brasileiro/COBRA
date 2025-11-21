<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits(['click']);

</script>

<template>
  <div
  class="mdi mdi-magnify"
  @click="emit('click')"
  >
  </div>
</template>

<style scoped>

div {
  color: #b2b2b2;
  font-size: 20px;
}

</style>
