import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const peopleCount = ref(0);
  const names = ref([]);

  const setPeopleCount = (count) => {
    peopleCount.value = count;
    names.value = Array.from({ length: count }, (_, i) => names.value[i] || '');
  };

  return { peopleCount, names, setPeopleCount };
});
