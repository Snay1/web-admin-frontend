<script setup lang="ts">
import type { PropType } from 'vue';

    type AdminInputType = "input" | "textarea"; 

    defineProps({
        value: {
            type: String,
            required: true,
        },
        placeholder: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: false,
        },
        inputType: {
            type: String as PropType<AdminInputType>,
            required: false,
        },
    });
    defineEmits(["input"]);
</script>
<template>
    <textarea
        v-if="inputType === 'textarea'" 
        :type="type || 'text'"
        :value="value"
        :placeholder="placeholder"
        @input="(e) => $emit('input', e)"
        class="w-full h-[100px] rounded-md border-solid border-[1px] border-stone-600 outline-none py-[10px] px-[12px] resize-y min-h-[100px] max-h-[200px]"
    >
    </textarea>
    <input 
        v-else
        :type="type || 'text'"
        :value="value"
        :placeholder="placeholder"
        @input="(e) => $emit('input', e)"
        class="w-full h-[50px] rounded-md border-solid border-[1px] border-stone-600 outline-none py-[10px] px-[12px]"
    />
</template>