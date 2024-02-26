<script setup lang="ts">

    const props = defineProps({
        itemsLength: {
            type: Number,
            required: true,
        },
        currentPage: {
            type: Number,
            required: true,
        },
        itemsPerPage: {
            type: Number,
            required: true,
        },
    });

    const emit = defineEmits(["set-page"]);

    const pageHandler = () => {

        const totalPages = Math.ceil(props.itemsLength / props.itemsPerPage);

        const pages = [];

        for (let page = props.currentPage - 2; page <= totalPages - 1; page++) {

            if (pages.length >= 4) {
                return pages;
            }

            if (page <= 0) {
                continue;
            }

            pages.push(page);

        }

        return pages;

    }

    const backButton = () => {

        const backValue = props.currentPage - 1;

        if (backValue === 0) {
            return;
        }

        emit('set-page', backValue);

    }

    const nextButton = () => {

        const totalPages = Math.ceil(props.itemsLength / props.itemsPerPage);

        const nextValue = props.currentPage + 1;

        if (nextValue >= totalPages) {
            return;
        }

        emit('set-page', nextValue);

    }

</script>

<template>
    <div class="flex items-center justify-between mt-[20px]">
        <button class="flex items-center justify-center p-[15px] border-solid border-[1px] border-black rounded-md font-bold" @click="backButton()">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <ul class="flex gap-[10px]">
            <li v-for="(item) in pageHandler()">
                <button :class="{ 'active': item === currentPage }" class="button flex items-center justify-center p-[15px] border-solid border-[1px] border-black rounded-md font-bold" @click="$emit('set-page', item)">
                    {{ item }}
                </button>
            </li>
        </ul>
        <button class="flex items-center justify-center p-[15px] border-solid border-[1px] border-black rounded-md font-bold" @click="nextButton()">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
        </button>
    </div>
</template>
<style lang="scss" scoped>

    .button {
        &.active {
            background-color: #000;
            color: #fff;
        }
    }

</style>