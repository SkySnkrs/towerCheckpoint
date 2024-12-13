<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import EventCard from '@/components/EventCard.vue';
import { eventService } from '@/services/EventService.js';
import Pop from '@/utils/Pop.js';
import { ticketService } from '@/services/TicketService.js';
import TicketCard from '@/components/TicketCard.vue';

onMounted(() => {
  getMyEvents()
  getMyTickets()
})



async function getMyEvents() {
  try {
    await eventService.getMyEvents()
  }
  catch (error) {
    Pop.error(error);
  }

}


async function getMyTickets() {
  try {
    await ticketService.getMyTickets()
  }
  catch (error) {
    Pop.error(error);
  }

}

const events = computed(() => AppState.events)
const tickets = computed(() => AppState.tickets)
const account = computed(() => AppState.account)


</script>

<template>
  <section class="container">
    <div class="d-flex accountSection align-items-center" v-if="account">
      <img :src="account?.picture" alt="" />
      <div class="ms-3">
        <p>{{ account?.name }}</p>
        <p>Total Events: <span>{{ events?.length }}</span> , Total Tickets: <span>{{ tickets?.length }}</span></p>
      </div>
    </div>
    <div v-else>
      <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
    </div>
  </section>
  <section class="container mt-5">
    <div class="row">
      <h3>Your Tickets:</h3>
      <div v-if="AppState.tickets.length == 0">
        <h2 class="mb-3 mt-2 p-3 ms-3">You Are Not Attending Any Events</h2>
      </div>
      <div v-else v-for="ticket in tickets" v-bind:key="ticket?.eventId" class="col-lg-4 col-sm-6 col-12 mt-4 mb-2">
        <TicketCard :ticketProp="ticket" />
      </div>
    </div>
    <div class="row">
      <h3>Your Hosted Events:</h3>
      <div v-for="event in events" v-bind:key="event?.id" class="col-lg-4 col-sm-6 col-12 mt-4 mb-2">
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
