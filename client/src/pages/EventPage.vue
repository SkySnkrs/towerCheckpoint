<script setup>
import { AppState } from '@/AppState';
import { computed } from 'vue';

const event = computed(() => AppState.selectedEvent)
</script>


<template>
    <p>{{ event.name }}</p>
    <p>{{ event.coverImg }}</p>
</template>


<style lang="scss" scoped></style>