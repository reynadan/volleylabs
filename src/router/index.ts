import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../components/EventList.vue'
import NewEventForm from '../components/NewEventForm.vue'

const routes = [
  { path: '/', component: EventList },
  { path: '/add-event', component: NewEventForm },
]

const router = createRouter({
  history: createWebHistory('/volleylabs/'),
  routes,
})

export default router