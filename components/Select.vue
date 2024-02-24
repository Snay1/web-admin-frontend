<script setup lang="ts">

    import type { PropType } from 'vue';

    interface OptionItem {
        text: string;
        value: string;
    }

    defineProps({
        options: {
            type: Array as PropType<OptionItem[]>,
            required: true,
        },
        placeholder: {
            type: String,
            required: true,
        },
        value: {
            type: Object as PropType<OptionItem>,
            required: false,    
        }
    });

    const emit = defineEmits(["select"]);

    const isActive = ref(false);

    const selectOption = (option: OptionItem) => {
        emit("select", option);
        isActive.value = false;
    }

</script>
<template>
    <div class="relative w-full h-[56px]">
        <div class="w-full h-[56px] rounded-md border-solid border-[1px] border-black" @click="isActive = true">
            <p>
                {{ value ? value.text : placeholder }}
            </p>
            <div class="absolute top-1/2 right-[16px] translate-y-[-50%]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down transition-all" :style="{ 'transform': isActive ? 'rotate(180deg)' : '' }"><path d="m6 9 6 6 6-6"/></svg>
            </div>
        </div>
        <div v-if="isActive" class="absolute top-[90px] left-0 z-10 w-full overflow-hidden rounded-md max-h-[150px] border-[1px] border-solid border-black">
            <ul>
                <li v-for="option in options" @click="selectOption(option)">
                    {{ option.text }}
                </li>
            </ul>
        </div>
    </div>
</template>