<script lang="ts" setup>

    defineProps({
        src: {
            type: String,
            required: true,
        },
        alt: {
            type: String,
            required: true,
        }
    })

</script>
<template>
    <div class="w-full min-w-[300px] lg:max-w-[450px] h-[300px] xl:min-w-[450px] xl:h-[450px] bg-slate-200 rounded-lg border-solid border-[1px] border-slate-400">
        <img 
            :src="src"
            :alt="alt"
            class="w-full h-full object-cover rounded-lg"
        />
    </div>
</template>