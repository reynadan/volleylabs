<template>
  <section class="filters">
    <input v-model="searchLocation" type="text" placeholder="Filtrer par lieu..." />
    <input v-model="searchDate" type="date" />
  </section>

  <transition-group name="fade" tag="section" class="grid-container">
    <div
      v-for="event in filteredEvents"
      :key="event.id"
      class="event-card"
      :style="{'background-image': `url(${event.imageUrl || placeholder})`}"
    >
      <div class="overlay">
        <div class="event-info">
          <h3>{{ event.name }}</h3>
          <p class="date">{{ formatDate(event.startDatetime) }}</p>
          <p class="location">{{ event.location || 'Lieu non précisé' }}</p>
        </div>
      </div>
    </div>
  </transition-group>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { fetchEvents } from '../services/sheetdb'

const events = ref([])
const placeholder = 'https://via.placeholder.com/400x300?text=No+Image'

const searchLocation = ref('')
const searchDate = ref('')

onMounted(async () => {
  try {
    events.value = await fetchEvents()
  } catch (err) {
    console.error(err)
  }
})

const filteredEvents = computed(() => {
  return events.value.filter(event => {
    const locationMatch = event.location?.toLowerCase().includes(searchLocation.value.toLowerCase()) || !searchLocation.value
    const dateMatch = !searchDate.value || event.startDatetime.startsWith(searchDate.value)
    return locationMatch && dateMatch
  })
})

function formatDate(str) {
  const d = new Date(str)
  return d.toLocaleDateString('fr-FR', {
    weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
  })
}
</script>

<style scoped>
.filters {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  justify-content: center;
}
.filters input {
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  padding: 1rem;
}

.event-card {
  position: relative;
  height: 200px;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.event-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
}
.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(0deg, rgba(0,0,0,0.7), transparent);
}
.event-info {
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: #fff;
}
.event-info h3 {
  margin: 0;
  font-size: 1.2rem;
}
.date, .location {
  font-size: 0.9rem;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
