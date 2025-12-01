<script setup>

import { useActorsStore } from '@/stores/actor';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const actorStore = useActorsStore();
const router = useRouter();

onMounted(async () => {
  await actorStore.actorsList();
  await actorStore.moviesActorList();
});


function openActor(actorId) {
    router.push({ name: 'ActorDetails', params: {actorId} });
}

</script>

<template>
  <div>
    <h1>Atores</h1>
  </div>
  <div class="paginas">
    <button class="descer-pagina" @click="actorStore.actorsPageDown()">
      <span class="mdi mdi-chevron-left"></span>
    </button>
    <button class="subir-pagina" @click="actorStore.actorsPageUp()">
      <span class="mdi mdi-chevron-right"></span>
    </button>
  </div>
  <ul class="atores">
    <li v-for="actor in actorStore.actors" :key="actor.id" class="ator">
      <div>
        <img :src="`https://image.tmdb.org/t/p/w500/yJjV1ZCQbCSSgRy05FncCKjyaY4.jpg`"  @click="openActor(actor.id)"  alt="" class="actor-image">
      </div>
      <div class="informacoes">
        <h2>{{ actor.name }}</h2>
        <h3>Conhecido por</h3>
        <span v-for="movie in actor.movies.slice(0, 3)" class="actor-movies"
          :style="{ fontSize: actor.movies.slice(0, 3).length > 2 ? '0.7rem' : '0.85rem' }">
          {{ actor.movies.slice(0, 3).indexOf(movie) === 2 || actor.movies.length === 1 ? movie.title : movie.title + ', ' }}
        </span>
        <div v-if="actor.instagramId != undefined">
          <a class="instagram" :href="`https://www.instagram.com/${actor.instagramId}`"><span
              class="mdi mdi-instagram"></span>Instagram</a>
        </div>
      </div>
    </li>
  </ul>
</template>

<style scoped>
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

.atores {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.ator {
  display: flex;
  margin-bottom: 3vw;
}

.actor-image {
  width: 8rem;
  height: 11rem;
  object-fit: cover;
  opacity: 1;
  border-radius: 10%;
  box-shadow: 0 0 0.1vw rgba(0, 0, 0, 0.1);
  transition: 0.9s;

  &:hover {
    width: 8.5rem;
    height: 12.5rem;
    scale: 1.25;
    transition: 0.9s;
    box-shadow: 0 0 2vw rgba(0, 0, 0, 0.3);
  }
}

.informacoes {
  margin-left: 2vw;
  max-width: 12rem;
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

.actor-movies {
  text-align: justify;
  font-size: 0.8rem;
  text-overflow: ellipsis;
  align-items: stretch;
  overflow: hidden;
  color: #B2B2B2;
}

.instagram {
  font-size: 0.7rem;
  align-items: center;
  color: #009440;

  & span {
    font-size: 0.9rem;
    margin-right: 0.5vw;
  }
}
</style>
