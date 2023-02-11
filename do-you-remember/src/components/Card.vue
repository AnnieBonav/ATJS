<script setup lang="ts">
</script>

<template>
    <div class="flex justify-center">
        <div class="block p-6 rounded-lg shadow-lg bg-primary-900 max-w-sm hover:bg-hovered">
            <h5 class="text-gray-800 text-xl leading-tight font-medium mb-4">
                {{ data.type == "author" ? data.card.key : data.card.text }}
            </h5>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { CardData } from '../card-data/types';

export default defineComponent({
    props: {
        data: {
            type: Object as PropType<CardData>,
            required: true,
        },
    }
});
</script>