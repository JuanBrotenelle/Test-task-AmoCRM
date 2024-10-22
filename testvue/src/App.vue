<script setup lang="ts">
import { onBeforeMount, ref, computed } from "vue";
import { useUserStore } from "./stores/Store";
import axios from "axios";
import type { Data, ArrayAmo, PreArrayAmo } from "./types";
import Component from "./components/Component.vue";

const store = useUserStore();
const currentValue = ref("unselected");
const isLoading = ref(false);
const arrayEnities = computed(() => {
  return store.arrayAmo;
});

const getAuthData = async () => {
  try {
    const response: any = await axios.get("http://localhost:3000/auth");

    const data: Data = {
      token: response.data.access_token,
      base_domain: response.data.base_domain,
    };

    console.log(data);
    store.data = data;
  } catch (error) {
    console.log(error);
  }
};

const handlerObj = async (value: string) => {
  switch (value) {
    case "deal":
      return {
        domain: "deal",
        currentName: "Сделка",
      };
    case "contact":
      return {
        domain: "contact",
        currentName: "Контакт",
      };
    case "company":
      return {
        domain: "company",
        currentName: "Компания",
      };
  }
};

const requestData = async (value: string) => {
  isLoading.value = true;
  let tempHelpObj = await handlerObj(value);
  try {
    const response = await axios.post(
      `http://localhost:3000/${tempHelpObj!.domain}`,
      {
        token: store.data!.token,
        base_domain: store.data!.base_domain,
      }
    );
    console.log(response);
    let data: ArrayAmo = response.data;
    data.name = tempHelpObj!.currentName;
    store.arrayAmo?.push(data);
    console.log(store.arrayAmo);
  } catch (e) {
    console.log(e);
  } finally {
    isLoading.value = false;
  }
};

onBeforeMount(async () => {
  getAuthData();
});
</script>

<template>
  <div class="w-full flex items-center justify-center p-10">
    <div class="max-w-[1920px] flex flex-col items-center justify-start">
      <div class="flex flex-row items-center justify-center gap-20 w-full">
        <select
          v-model="currentValue"
          class="h-[40px] w-[220px] outline-none border-2 border-[#000000] rounded-xl p-1"
          name=""
          id=""
        >
          <option value="unselected">Не выбрано</option>
          <option value="deal">Сделка</option>
          <option value="contact">Контакт</option>
          <option value="company">Компания</option>
        </select>
        <button
          @click="requestData(currentValue)"
          :disabled="currentValue === 'unselected' || isLoading"
          class="bg-[#FF8C00] text-white w-[120px] flex items-center justify-center h-[40px] rounded-xl active:bg-[#ebad63] active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
          :class="{ button: currentValue === 'unselected' }"
        >
          <span v-if="!isLoading">{{
            currentValue === "unselected" ? "Создать" : "Выбрать"
          }}</span>
          <div v-else class="loader"></div>
        </button>
      </div>
      <div
        v-if="store.arrayAmo"
        class="w-full flex flex-col gap-2 items-start justify-start"
      >
        <Component
          v-for="(entity, index) in arrayEnities"
          :key="index"
          :comp-object="entity"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.button {
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #000;
}
.loader {
  width: 20px;
  padding: 4px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #3d3d3d;
  --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
  mask: var(--_m);
  -webkit-mask-composite: source-out;
  mask-composite: subtract;
  animation: l3 1s infinite linear;
}
@keyframes l3 {
  to {
    transform: rotate(1turn);
  }
}
</style>
