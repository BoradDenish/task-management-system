import { defineStore } from "pinia";
import { ref } from "vue";

export const useLayoutStore = defineStore("layout", () => {
  const breadcrumbList = ref([]);

  function setBreadcrumb(breadcrumb) {
    breadcrumbList.value = breadcrumb;
  }

  return { breadcrumbList, setBreadcrumb };
});
