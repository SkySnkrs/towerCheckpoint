<script setup>
import { AppState } from '@/AppState';
import EventCard from '@/components/EventCard.vue';
import { eventService } from '@/services/EventService';
import Pop from '@/utils/Pop';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';


const screenWidth = ref(window.innerWidth);

function updateScreenWidth() {
  screenWidth.value = window.innerWidth;
}

onMounted(() => {
  window.addEventListener('resize', updateScreenWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScreenWidth);
});

const backgroundHeight = computed(() => {
  return screenWidth.value <= 576 ? '90dvh' : '90dvh';
});

const marginTop = computed(() => {
  return screenWidth.value >= 768 ? '' : '2em';
});

const marginStart = computed(() => {
  return screenWidth.value <= 768 ? '' : 'ms-3';
});

const checkWidth = computed(() => {
  return screenWidth.value <= 992 ? true : false;
});

onMounted(() => {
  getEvents()
})

async function getEvents() {
  try {
    await eventService.getEvents()
  } catch (error) {
    Pop.error('[Get Events]', error)
  }
}

const events = computed(() => AppState.events)
</script>

<template>
  <section class="background-section" :style="{ height: backgroundHeight }">
    <div class="content-container row justify-content-center align-content-center">
      <div class="text-center col-sm-12 w-sm-50 w-75">
        <h4 class="fw-bold text-light">Make, Create, And Enjoy Events With Tower!</h4>
      </div>
      <div class="text-center col-sm-12 w-75">
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore eos aperiam, quod impedit est fugit
          delectus id non omnis fugiat provident blanditiis sed commodi perferendis culpa? Eveniet neque sequi quasi.
        </p>
      </div>
    </div>
  </section>

  <section class="container" style=" position: relative; margin-top: -75px;">
    <div class="floating-card row justify-content-between d-flex" style="background-color: transparent">
      <div class="col-md-5 align-self-center">
        <div class="card card-float">
          <div class="card-body text-light">
            <h5 class="card-title ">Discover Events You're Interested In</h5>
            <p class="card-text mt-4">Browse through community hosted events for all of the things you love!</p>
          </div>
        </div>
      </div>

      <div class="col-xl-5 col-md-6  align-self-center">
        <div class="card card-float" :style="{ marginTop: marginTop }">
          <div class="card-body text-light">
            <h5 class="card-title ">Start An Event To Invite Your Friends!</h5>
            <p class="card-text">Create your own tower event, invite your friends, and the whole tower community!</p>
            <div class="text-end mt-3">
              <button class="btn btn-success">Create Event</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="container event-body" style="">
    <div v-if="checkWidth" class="p-3">
      <h2>Explore Top Categories:</h2>
      <div class=" row justify-content-around mt-4" :class="marginStart">
        <div class=" p-3 col-sm-5 col-6 text-center card card-event-categories" role="button" selectable>
          <div>
            <i class="mdi fs-3 text-success mdi-infinity"></i>
          </div>
          <h5 class="fw-bold font-capitalize">All</h5>
        </div>
        <div class=" col-sm-5 col-6  p-3 text-center card card-event-categories" role="button" selectable>
          <div>
            <i class="mdi fs-3 text-success mdi-guitar-acoustic"></i>
          </div>
          <h5 class="fw-bold font-capitalize">Concert</h5>
        </div>
        <div class=" col-sm-5 col-6 p-3 text-center card card-event-categories" role="button" selectable>
          <div>
            <i class="mdi fs-3 text-success mdi-account-group"></i>
          </div>
          <h5 class="fw-bold font-capitalize">Convention</h5>
        </div>
        <div class=" col-sm-5 col-6 p-3 text-center card card-event-categories" role="button" selectable>
          <div>
            <i class="mdi fs-3 text-success mdi-football-helmet"></i>
          </div>
          <h5 class="fw-bold font-capitalize">Sport</h5>
        </div>
        <div class=" col-sm-5 col-6 p-3 text-center card card-event-categories" role="button" selectable>
          <div>
            <i class="mdi fs-3 text-success mdi-desktop-classic"></i>
          </div>
          <h5 class="fw-bold font-capitalize">Digital</h5>
        </div>
        <div class=" col-sm-5 col-6 p-3">

        </div>
      </div>
    </div>
    <div v-else class="p-3">
      <h2>Explore Top Categories:</h2>
      <div class=" row justify-content-around mt-4" :class="marginStart">
        <div class=" p-3 col-2 text-center card card-event-categories" role="button" selectable>
          <div>
            <i class="mdi fs-3 text-success mdi-infinity"></i>
          </div>
          <h5 class="fw-bold font-capitalize">All</h5>
        </div>
        <div class="col-lg-2   p-3 text-center card card-event-categories" role="button" selectable>
          <div>
            <i class="mdi fs-3 text-success mdi-guitar-acoustic"></i>
          </div>
          <h5 class="fw-bold font-capitalize">Concert</h5>
        </div>
        <div class="col-lg-2 p-3 text-center card card-event-categories" role="button" selectable>
          <div>
            <i class="mdi fs-3 text-success mdi-account-group"></i>
          </div>
          <h5 class="fw-bold font-capitalize">Convention</h5>
        </div>
        <div class="col-lg-2 p-3 text-center card card-event-categories" role="button" selectable>
          <div>
            <i class="mdi fs-3 text-success mdi-football-helmet"></i>
          </div>
          <h5 class="fw-bold font-capitalize">Sport</h5>
        </div>
        <div class="col-lg-2 p-3 text-center card card-event-categories" role="button" selectable>
          <div>
            <i class="mdi fs-3 text-success mdi-desktop-classic"></i>
          </div>
          <h5 class="fw-bold font-capitalize">Digital</h5>
        </div>

      </div>
    </div>
  </section>
  <section class="container ">
    <div class="row mt-4">
      <h2>Explore Upcoming Events:</h2>
      <div v-for="event in events" v-bind:key="event.id" class="col-sm-4">
        <EventCard :eventProp="event" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.background-section {
  position: relative;
  height: 100vh;
  background: url('https://static.vecteezy.com/system/resources/previews/029/332/632/non_2x/ai-generative-crowded-concert-stage-scenery-with-spotlights-and-colored-lights-realistic-image-ultra-hd-free-photo.jpg') center center no-repeat;
  background-size: cover;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
}

.content-container {
  position: relative;
  z-index: 2;
}

section {
  text-shadow: 1px 1px black;
  color: white;
}

section>div {
  height: 100%;
}

.floating-card {
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  margin-top: -50px;
  width: 80%;
  min-height: 50dvh;
}

.card-event-categories {
  background-color: #42474d;
  padding: 1em;
  height: 15dvh;
  color: white;
}



.card-float {
  background-color: #42474d;
  padding: 1em;
  min-height: 85%;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.container {
  position: relative;
}

.event-body {
  margin-top: 20rem;
}

@media screen and (max-width: 992px) {
  .card-event-categories {
    margin-top: 1em;

  }
}

@media screen and (max-width: 768px) {
  .event-body {
    margin-top: 25rem;

  }

  .card-event-categories {
    margin-top: 1em;

  }
}

@media screen and (max-width: 532px) {
  .event-body {
    margin-top: 28rem;
  }

  .card-event-categories {
    margin-top: 1em;
  }
}

@media screen and (max-width: 428px) {
  .event-body {
    margin-top: 30rem;
  }

  .card-event-categories {
    margin-top: 1em;
  }
}

@media screen and (max-width: 375px) {
  .event-body {
    margin-top: 35rem;
  }

  .card-event-categories {
    margin-top: 1em;
  }
}
</style>
