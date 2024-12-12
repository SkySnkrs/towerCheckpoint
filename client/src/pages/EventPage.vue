<script setup>
import { AppState } from '@/AppState';
import Login from '@/components/Login.vue';
import { commentService } from '@/services/CommentService';
import { eventService } from '@/services/EventService';
import { ticketService } from '@/services/TicketService';
import Pop from '@/utils/Pop';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';


onMounted(() => {
    getSelectedEvent()
    getTicketsForEvent()
    getComments()
})

const route = useRoute();

const isUserAttending = computed(() => {
    const userAccountId = AppState.account.id;

    return AppState.tickets.some(ticket => ticket.accountId === userAccountId);
})


async function getSelectedEvent() {
    try {
        const eventId = route.params.id;
        await eventService.getSelectedEvent(eventId)
    }
    catch (error) {
        Pop.error(error);
    }
}

async function attendEvent() {
    try {
        const eventId = route.params.id;
        await ticketService.attendEvent(eventId)
    }
    catch (error) {
        Pop.error(error);
    }
}

async function getTicketsForEvent() {
    try {
        const eventId = route.params.id;
        await ticketService.ticketsSold(eventId)
    } catch (error) {
        Pop.error(error)
    }
}

async function unAttendEvent() {
    try {
        const eventId = route.params.id;
        await ticketService.unAttendEvent(eventId)
    }
    catch (error) {
        Pop.error(error);
    }
}

async function getComments() {
    try {
        const eventId = route.params.id;
        await eventService.getComments(eventId)
    }
    catch (error) {
        Pop.error(error);
    }
}

const commentData = ref({
    body: ''
});


async function postComment() {
    try {
        const eventId = route.params.id;
        await commentService.postComment(eventId, commentData.value.body);
        commentData.value = {
            body: ''
        };
    }
    catch (error) {
        Pop.error(error);
    }
}

async function deleteComment(commentId) {
    try {
        await commentService.deleteComment(commentId)
    }
    catch (error) {
        Pop.error(error);
    }
}



const event = computed(() => AppState.selectedEvent)
const tickets = computed(() => AppState.tickets)
const comments = computed(() => AppState.comments)
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
            <div class="col-sm-10 col-12">
                <div class="row d-flex justify-content-between">
                    <div class="col-md-8 col-sm-7 col-12">
                        <div class="d-flex align-self-center">
                            <h3>{{ event?.name }}</h3>
                            <p class="ms-3"><i class="mdi fs-3" :class="event?.EventCategory"></i></p>
                        </div>
                        <div>
                            <p class="fs-6">{{ event?.description }}</p>
                        </div>

                    </div>
                    <div class="col-md-3 col-sm-5 col-12">
                        <div class="p-3 text-center rounded" id="buttonDiv">
                            <h6>Interested In Going?</h6>
                            <p>grab a ticket</p>
                            <div v-if="event?.isCanceled != true && AppState.account != null" class="text-center">
                                <button v-if="!isUserAttending" @click="attendEvent()"
                                    class="btn btn-primary w-100">Attend</button>
                                <button v-else @click="unAttendEvent()" class="btn btn-danger w-100">Unattend</button>
                            </div>
                            <div v-else-if="event?.isCanceled == true"
                                class="bg-danger text-white text-center p-2 rounded w-100">
                                CANCELLED
                            </div>
                            <div v-if="event?.capacity == event?.ticketCount"
                                class="bg-danger text-white text-center p-2 rounded w-100">
                                SOLD OUT
                            </div>
                            <div v-if="AppState?.account == null" class="text-center rounded text-white p-2">
                                <Login />
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
            <div class="col-sm-10">
                <div>
                    <h4 class="fw-bold">Date And Location:</h4>
                    <div class="d-flex align-items-center">
                        <i class="ms-3 fs-4 mdi mdi-calendar"></i>
                        <p class="ms-3 mb-0">{{ event?.EventDate }} {{ event?.location }}</p>
                    </div>
                </div>
            </div>
        </div>
        <section class="row justify-content-center mb-4">
            <div class="mt-5 col-sm-10">
                <div class="row justify-content-between">
                    <section class="col-md-6">
                        <p class="fw-bold">Comments:</p>
                        <div class="rounded p-3 commentSection mb-3">
                            <h6 class="mb-3">Leave A Comment</h6>
                            <form @submit.prevent="postComment">
                                <textarea minlength="1" maxlength="500" required v-model="commentData.body" name="body"
                                    id="body" class="w-100 rounded" rows="3"></textarea>
                                <div class="text-end mt-2">
                                    <button class="btn btn-success p-1 w-25">Submit</button>
                                </div>
                            </form>
                        </div>
                        <div v-if="comments?.length != 0" class=" rounded " id="attendeesDiv">
                            <div class=" mb-1 rounded p-2 " v-for="comment in comments" v-bind:key="comment?.id">
                                <div class="d-flex align-items-center rounded m-2 p-4 shadow-lg bg-dark"
                                    id="commentSection">
                                    <div class="">
                                        <img id="commentImg" :src="comment?.creator.picture" alt="">
                                    </div>
                                    <div>
                                        <div class="d-flex">
                                            <p class="fw-bold ms-3">{{ comment?.creator.name }}</p>
                                        </div>
                                        <p class="ms-3 mt-2 fs-6">
                                            {{ comment?.body }}
                                        </p>
                                    </div>
                                </div>
                                <div v-if="comment?.creatorId == AppState.account.id" class="text-end mt-3">
                                    <button @click="deleteComment(comment?.id)"
                                        class="btn btn-danger rounded p-2 me-2">Delete Comment</button>
                                </div>
                            </div>
                        </div>
                        <div v-else class=" fw-bold">
                            <p>No Comments</p>
                        </div>
                    </section>
                    <section class="col-md-6">
                        <p class="fw-bold">Attendees:</p>
                        <div v-if="tickets.length != 0" class=" rounded p-3" id="attendeesDiv">
                            <div class="d-flex mb-1 rounded p-2  align-items-center" v-for="ticket in tickets"
                                v-bind:key="ticket?.accountId">
                                <img id="profileImg" :src="ticket?.profile.picture" alt="">
                                <div>
                                    <p class="ms-3 mt-2 fs-6">
                                        {{ ticket?.profile.name }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div v-else class=" fw-bold">
                            <p>No One Currently Attending Event</p>
                        </div>
                    </section>
                </div>
            </div>
        </section>
    </section>
    <section v-else class="text-center mt-5 text-white ">
        <h3>Loading Event.... <i class="mdi mdi-loading mdi-spin"></i></h3>
    </section>
</template>


<style lang="scss" scoped>
.commentSection {
    background-color: #42474d;

}



#buttonDiv {
    background-color: #42474d;
}

#attendeesDiv {
    background-color: #42474d;
    max-height: 50dvh;
}

#attendeesDiv {
    max-height: 550px;
    overflow-y: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
}

#attendeesDiv::-webkit-scrollbar {
    display: none;
}



#profileImg {
    border-radius: 50%;
    height: 50px;
    aspect-ratio: 1/1;
}

#commentImg {
    border-radius: 50%;
    height: 50px;
    aspect-ratio: 1/1;
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