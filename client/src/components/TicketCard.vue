<script setup>
import { Ticket } from '@/models/Ticket';
import { eventService } from '@/services/EventService';
import Pop from '@/utils/Pop';

defineProps({
    ticketProp: { type: Ticket, required: true }
})

async function getEventPage(id) {
    try {
        await eventService.getEventPage(id)
    }
    catch (error) {
        Pop.error(error);
    }
}


</script>


<template>
    <div v-if="ticketProp?.event.isCanceled != true">
        <router-link @click="getEventPage(ticketProp?.event.id)"
            :to="{ name: 'EventPage', params: { id: ticketProp?.event.id } }">
            <section class="rounded card cardColor p-3 mb-3">
                <div class="d-flex">
                    <p>{{ ticketProp?.event.name }}</p>
                </div>
                <p class="ms-3">{{ ticketProp?.event.location }}</p>
                <p class="fw-bold">Event Description-</p>
                <div class="eventDescription">
                    <div class="ms-3 p-1">{{ ticketProp?.event.description }}</div>
                </div>
                <div class="text-center mt-3">
                    <i class="mdi mdi-arrow-down"></i>
                </div>
            </section>
        </router-link>
    </div>
</template>


<style lang="scss" scoped>
.cardColor {
    background-color: #42474d;
    color: white;
    text-shadow: 1px 1px black;
    max-height: 43dvh;
}

.eventDescription {
    overflow-y: scroll;
    scrollbar-width: none;
}

.cardColor {
    cursor: pointer;
    transition: transform 0.2s;
}

.cardColor:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>