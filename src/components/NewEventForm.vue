<template>
  <form @submit.prevent="submitForm" class="form">
    <h2>Créer un nouvel événement</h2>

    <label>
      Nom :
      <input v-model="event.name" required />
    </label>

    <label>
      Date & Heure :
      <input v-model="event.startDatetime" type="datetime-local" required />
    </label>

    <label>
      Prix (€) :
      <input v-model.number="event.price" type="number" step="0.01" />
    </label>

    <label>
      Lieu :
      <input v-model="event.location" />
    </label>

    <label>
      Surface :
      <select v-model="event.surfaceType" required>
        <option value="green">Green</option>
        <option value="indoor">Indoor</option>
        <option value="beach">Beach</option>
        <option value="multiple">Multiple</option>
      </select>
    </label>

    <label>
      Mode tournoi :
      <select v-model="event.tournamentMode" required>
        <option value="2vs2">2 vs 2</option>
        <option value="3vs3">3 vs 3</option>
        <option value="4vs4">4 vs 4</option>
        <option value="6vs6">6 vs 6</option>
      </select>
    </label>

    <label>
      Catégorie :
      <select v-model="event.genderCategory" required>
        <option value="female">Féminin</option>
        <option value="male">Masculin</option>
        <option value="mixed_mandatory">Mixte Obligatoire</option>
        <option value="mixed_optional">Mixte Optionnel</option>
      </select>
    </label>

    <label>
      Max équipes :
      <input v-model.number="event.maxTeams" type="number" />
    </label>

    <label>
      Description :
      <textarea v-model="event.description"></textarea>
    </label>

    <label>
      Organisateur :
      <input v-model="event.organizer" />
    </label>

    <label>
      Email contact :
      <input v-model="event.contactEmail" type="email" />
    </label>

    <label>
      Date limite inscription :
      <input v-model="event.registrationDeadline" type="date" />
    </label>

    <button type="submit">Créer l’événement</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { createEvent } from '../services/sheetdb'
import { useRouter } from 'vue-router';

const router = useRouter();

const event = ref({
  name: '',
  startDatetime: '',
  price: null,
  location: '',
  surfaceType: 'green',
  imageUrl: '',
  tournamentMode: '2vs2',
  genderCategory: 'mixed_optional',
  maxTeams: null,
  description: '',
  organizer: '',
  contactEmail: '',
  registrationDeadline: '',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
})

async function submitForm() {
  try {
    await createEvent(event.value)
    alert('Événement créé avec succès !')
    router.push('/')
  } catch (err) {
    console.error(err)
    alert('Erreur lors de la création.')
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  max-width: 600px;
  gap: 10px;
}
label {
  display: flex;
  flex-direction: column;
}
button {
  margin-top: 1em;
  padding: 10px;
}
</style>