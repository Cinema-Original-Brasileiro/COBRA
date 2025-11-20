import api from '@/plugins/axios';
import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';

const idActors = [52583, 17289, 1007641, 12386, 1328983];

export const useActorsStore = defineStore('actor', () => {
    const state = reactive({
        actors: [],
    });

    const actors = computed(() => state.actors);

    const actorsList = async() => {
        try {
            for (const idActor of idActors) {
                const response = await api.get(`person/${idActor}`);
                if (response.data.known_for_department === 'Acting') {
                    state.actors.push(response.data)
                };
            };
        } catch (error) {
            console.error('Erro ator ', error);
        }
    }

    return { actors, actorsList };
});