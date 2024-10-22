<script setup lang="ts">
import { defineProps } from "vue";
import type { CompObject } from "../types";

const props = defineProps<{
  compObject: CompObject;
  index: number;
}>();
</script>

<template>
  <tr class="w-full">
    <td>{{ props.index + 1 }}.</td>
    <td>{{ props.compObject.id }}</td>
    <td>{{ props.compObject.name }}</td>
  </tr>
</template>

<style scoped></style>
