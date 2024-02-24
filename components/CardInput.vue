<script lang="ts" setup>

    import { Input } from "~/components";

    defineProps({
        type: {
            type: String,
            required: true,
        },
        value: {
            type: String,
            required: true,
        },
        placeholder: {
            type: String,
            required: true,
        },
    });

    defineEmits(["input"]);

</script>
<template>
    <div>
        <h4 class="mb-[10px] font-bold text-lg">{{ placeholder }}</h4>
        <Input 
            :type="type"
            :value="value"
            :placeholder="placeholder"
            @input="(e) => $emit('input', e)"
        />
    </div>
</template>