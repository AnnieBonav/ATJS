<script setup lang="ts">
</script>

<template>
    <div
        class="flex-1 p-6 rounded-lg justify-center items-center shadow-lg bg-primary-900 max-w-sm hover:bg-hovered aspect-square flex">
        
        <div v-if="data.isSelected == true">
            <h5 class="text-gray-800 text-xl leading-tight font-medium mb-4">
                {{ data.type == "author" ? data.info.key : data.info.text }}
            </h5>
        </div>
        <div v-else class="p-6">
            <h5 class="text-gray-200 text-xl leading-tight font-medium mb-4">
                {{ data.type == "author" ? data.info.key : data.info.text }}
            </h5>
        </div>
    </div>

</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { CardData } from '../card-data/types';
import { ref } from 'vue';
const audio = ref<any>(null);
const isPlaying = ref(false);

function playSound() {
  isPlaying.value = true;
  if(audio.value){
      audio.value.play();
  }
}

export default defineComponent({
    props: {
        data: {
            type: Object as PropType<CardData>,
            required: true,
        },
    },
    data(){
        return{
            //isPlaying: false
        };
    },
    playSoundCard(){
        console.log("Annie", this.$refs);
        playSound();
    },
    init() {
        const audioURL = (song: string) =>
            new URL(`../assets/audios/song`, import.meta.url).href;
        return { audioURL }
    }
});
</script>