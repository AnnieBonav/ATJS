<script setup>
import { sounds } from '@/scripts/sounds';
import AudioButton from '@/components/AudioButton.vue';
</script>

<template>
  <AudioButton v-for="sound in sounds" :sound="sound" />
</template>

<style>
button {
  appearance: none;
  background: none;
  padding: 1rem;
  margin: 1rem;
}

button.playing {
  background: #bada55;
}
</style>
