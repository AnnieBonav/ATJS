<script setup>
import {ref} from 'vue'
import { soundObj } from "./scripts/sounds"

function playSound(id){
    alert(id)
}

</script>

<template>
    <audio v-for="sound in soundObj" :src="sound.filename" controls :id="sound.id"></audio>
    <button v-for = "sound in soundObj" @click="playSound"> {{ sound.name }}</button>
</template>

<style>
        button {
            appearance: none;
            background: none;
            padding: 1rem;
            margin: 1rem;
        }

        button.playing {
            background: #059992;
        }
        
    </style>