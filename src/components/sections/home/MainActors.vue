<script setup>
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useActorsStore } from '@/stores/actor'
import { useRouter } from 'vue-router'

const actorStore = useActorsStore();
const router = useRouter();


const profileImage = (actor) => {
  return actor?.profile_path ? `url(https://image.tmdb.org/t/p/w500${actor.profile_path})` : ''
}

function openActor(actorId) {
  router.push({ name: 'ActorDetails', params: { actorId } })
}

onMounted(() => {
  actorStore.actorsList()
})
</script>

<template>
  <section>
    <div class="section-header">
      <h2>Principais Atores</h2>
      <RouterLink to="/actors">Ver Mais <span class="mdi mdi-chevron-right"></span></RouterLink>
    </div>
    <ul class="actors-list">
      <li
        v-for="a in actorStore.actors.slice(0, 5)"
        :key="a.id"
        class="actor-card"
        :style="{  backgroundImage: `linear-gradient(to top, rgba(0,0,0, 0.8), rgba(0,0,0,0)), ${profileImage(a)}` }"
        @click="openActor(a.id)"
      >
        <h3> {{ a.name }}</h3>
        <p>{{ a.biography.slice(0, 40) }}...</p>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.section-header {
  padding: 1vw 10vw  2vw 11vw;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & h2 {
    font-weight: 700;
  }

  & a {
    color: #009440;
    &:hover {
      color: #007a33;
    }
  }
}

.actors-list {
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  gap: 5rem;
}

.actor-card {
  display: flex;
  flex-direction: column;
  justify-content: end;
  padding: 1vw;

  height: 270px;
  width: 180px;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  background-color: #000;
  transition: 0.3s;

  &:hover {
    transform: translateY(-5px);
    filter: brightness(0.6);
  }

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.actor-card {
  & h3{
    color: #fff5ee;
    font-weight: 500;
    margin-bottom: 0.8vw;
  }
  & p {
    margin-bottom: 0.5vw;
    font-size: 0.7rem;
    color: #fff5ee;
  }
}
</style>
