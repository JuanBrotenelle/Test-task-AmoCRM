<script setup lang="ts">
import { defineProps } from "vue";
import type { CompObject } from "../types";

const props = defineProps<{
  compObject: CompObject;
}>();
</script>

<template>
  <div class="flex flex-row justify-between w-full">
    <p>{{ props.compObject.id }}</p>
    <p>{{ props.compObject.name }}</p>
  </div>
</template>

<style scoped></style>
