<script setup>
import { TowerEvent } from '@/models/TowerEvent';
import { eventService } from '@/services/EventService';
import Pop from '@/utils/Pop';


defineProps({
    eventProp: { type: TowerEvent, required: true }
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
    <div @click="getEventPage(eventProp?.id)" v-if="eventProp.id != undefined"
        class="text-center rounded mt-2 cardColor" id="eventCard">
        <div id="cardImg" :style="{
            backgroundImage: `url(${eventProp?.coverImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
        }">
            <div class="text-end me-2">
                <i class="mdi fs-4 bg-dark p-3 rounded-bottom" :class="eventProp?.EventCategory"></i>
            </div>
            <div v-if="eventProp?.isCanceled == true" class="bg-danger text-white text-center p-2 rounded"
                style="position: absolute; bottom: 10px; left: 10px;">
                CANCELLED
            </div>
            <div v-if="eventProp?.capacity == eventProp?.ticketCount"
                class="bg-danger text-white text-center p-2 rounded"
                style="position: absolute; bottom: 10px; left: 10px;">
                CANCELLED
            </div>
        </div>
        <div class="mt-3 text-start cardColor align-self-center">
            <p class="fw-bold fs-5">{{ eventProp?.name }}</p>
            <p>Hosted By: {{ eventProp?.creator.name }}</p>
            <p>{{ eventProp?.EventDate }} - {{ eventProp?.location }}</p>
            <p>{{ eventProp?.ticketCount }} attending</p>
            <p>{{ eventProp?.type }}</p>
        </div>
    </div>
    <div v-else class="text-center mt-3 fw-bold">Loading Events... <i class="mdi mdi-loading mdi-spin"></i></div>
</template>


<style lang="scss" scoped>
#eventCard {
    padding: 1em;
    width: 100%;
    height: 100%;
    line-height: normal;
}

#cardImg {
    height: 25dvh;
    width: 100%;
    border-radius: 8px;
    object-fit: cover;
    object-position: center;
}

.cardColor {
    background-color: #42474d;
}

#eventCard {
    cursor: pointer;
    transition: transform 0.2s;
}

#eventCard:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>