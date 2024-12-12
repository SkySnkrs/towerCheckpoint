<script setup>
import { AppState } from '@/AppState';
import { computed } from 'vue';

const event = computed(() => AppState.selectedEvent)
</script>


<template>
    <section class="container-fluid ">
        <div class="row justify-content-center rounded">
            <div id="photoContainer" class="rounded">
                <div id="blurredBackground" :style="{ backgroundImage: `url(${event?.coverImg})` }"></div>

                <img id="centerImage" class=" img-fluid" :src="event?.coverImg" :alt="event?.name">
            </div>
        </div>
    </section>
    <section class="container" id="eventData">
        <div class="row justify-content-center">
            <div class="col-10">
                <div class="row d-flex justify-content-between">
                    <div class="col-8">
                        <div class="d-flex align-self-center">
                            <h3>{{ event?.name }}</h3>
                            <p class="ms-3"><i class="mdi fs-3" :class="event?.EventCategory"></i></p>
                        </div>
                        <div>
                            <p class="fs-6">{{ event?.description }}</p>
                        </div>

                    </div>
                    <div class="col-3">
                        <div class="p-3 text-center rounded" id="buttonDiv">
                            <h6>Interested In Going?</h6>
                            <p>grab a ticket</p>
                            <div class="text-center">
                                <button class="btn btn-primary w-75">Attend</button>
                            </div>
                        </div>
                        <div class="text-end mt-2 p-2">
                            Spots Left
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