<script setup>
import { AppState } from '@/AppState';
import { eventService } from '@/services/EventService';
import Pop from '@/utils/Pop';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';


onMounted(() => {
    getSelectedEvent()
})
const event = computed(() => AppState.selectedEvent)


const route = useRoute();

async function getSelectedEvent() {
    try {
        const eventId = route.params.id;
        await eventService.getSelectedEvent(eventId)
    }
    catch (error) {
        Pop.error(error);
    }
}
</script>


<template>
    <section v-if="event" class="container-fluid ">
        <div class="row justify-content-center rounded">
            <div id="photoContainer" class="rounded">
                <div id="blurredBackground" :style="{ backgroundImage: `url(${event?.coverImg})` }"></div>

                <div v-if="event?.isCanceled == true" class="bg-danger text-white text-center p-2 rounded"
                    style="position: absolute; bottom: 10px; left: 10px; z-index: 1">
                    CANCELLED
                </div>
                <div v-if="event?.capacity == event?.ticketCount" class="bg-danger text-white text-center p-2 rounded"
                    style="position: absolute; bottom: 10px; left: 10px; z-index: 1">
                    SOLD OUT
                </div>
                <img id="centerImage" class=" img-fluid" :src="event?.coverImg" :alt="event?.name">

            </div>
        </div>
    </section>
    <section v-if="event" class="container" id="eventData">
        <div class="row justify-content-center">
            <div class="col-10">
                <div class="row d-flex justify-content-between">
                    <div class="col-md-8 col-7">
                        <div class="d-flex align-self-center">
                            <h3>{{ event?.name }}</h3>
                            <p class="ms-3"><i class="mdi fs-3" :class="event?.EventCategory"></i></p>
                        </div>
                        <div>
                            <p class="fs-6">{{ event?.description }}</p>
                        </div>

                    </div>
                    <div class="col-md-3 col-5">
                        <div class="p-3 text-center rounded" id="buttonDiv">
                            <h6>Interested In Going?</h6>
                            <p>grab a ticket</p>
                            <div v-if="event?.isCanceled != true" class="text-center">
                                <button class="btn btn-primary w-75">Attend</button>
                            </div>
                            <div v-else class="bg-danger text-white text-center p-2 rounded">
                                CANCELLED
                            </div>
                            <div v-if="event?.capacity == event?.ticketCount"
                                class="bg-danger text-white text-center p-2 rounded">
                                SOLD OUT
                            </div>
                        </div>
                        <div class="text-end mt-0 p-2">
                            <span>
                                {{ event?.ticketsLeft }}
                            </span> Spots Left
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row justify-content-center mt-3 mb-5">
            <div class="col-10">
                <div>
                    <h4 class="fw-bold">Date And Location:</h4>
                    <div class="d-flex align-items-center">
                        <i class="ms-3 fs-4 mdi mdi-calendar"></i>
                        <p class="ms-3 mb-0">{{ event?.EventDate }} {{ event?.location }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section v-else class="text-center mt-5 text-white ">
        <h3>Loading Event.... <i class="mdi mdi-loading mdi-spin"></i></h3>
    </section>
</template>


<style lang="scss" scoped>
#buttonDiv {
    background-color: #42474d;
}

section {
    color: white;
    text-shadow: 1px 1px black;
}

#eventData {
    margin-top: 6em;
}

#photoContainer {
    position: relative;
    width: 70%;
    height: 55dvh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    #blurredBackground {
        position: absolute;
        top: -10%;
        left: -10%;
        width: 120%;
        height: 120%;
        background-position: center;
        background-size: cover;
        filter: blur(15px);
        z-index: 1;
    }

    #centerImage {
        position: relative;
        z-index: 2;
        max-height: 100%;
        max-width: 100%;
    }

    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, transparent 70%, rgba(0, 0, 0, 0.6) 100%);
        z-index: 3;
    }
}
</style>