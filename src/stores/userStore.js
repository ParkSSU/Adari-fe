import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const peopleCount = ref(0);
  const names = ref([]);

  const setPeopleCount = (count) => {
    peopleCount.value = count;
  };

  const setNames = (newNames) => {
    names.value = newNames;
  };

  return { peopleCount, names, setPeopleCount, setNames };
});
