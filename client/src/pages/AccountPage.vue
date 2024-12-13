<script setup>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import EventCard from '@/components/EventCard.vue';

const account = computed(() => AppState.account)
const events = computed(() => AppState.events)

</script>

<template>
  <section class="container">
    <div class="d-flex accountSection align-items-center" v-if="account">
      <img :src="account.picture" alt="" />
      <div class="ms-3">
        <p>{{ account?.name }}</p>
        <p>Total Events: <span>0</span> , Total Tickets: <span>{{ events.length }}</span></p>
      </div>
    </div>
    <div v-else>
      <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
    </div>
  </section>
  <section class="container mt-5">
    <div class="row">
      <h3>Your Attending:</h3>
      <div v-for="event in events" v-bind:key="event.id" class="col-lg-4 col-sm-6 col-12 mt-4 mb-2">
        <EventCard :eventProp="event" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
img {
  max-width: 100px;
  aspect-ratio: 1/1;
  border-radius: 50%;
}

section {
  color: white;
  text-shadow: 1px 1px black;
}

.accountSection {
  margin-left: 6em;
  margin-top: 3em;
}
</style>
