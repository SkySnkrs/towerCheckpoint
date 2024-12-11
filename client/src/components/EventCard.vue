<script setup>
import { TowerEvent } from '@/models/TowerEvent';


defineProps({
    eventProp: { type: TowerEvent, required: true }
})


</script>


<template>
    <p>{{ eventProp?.name }}</p>
</template>


<style lang="scss" scoped></style>