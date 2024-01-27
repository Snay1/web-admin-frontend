<script setup lang="ts">
    
    import { VFragment } from "~/components";
    import axios from "~/axios";
    import { hostURL } from "~/common";
    import type { InputEventType } from "~/types/client/InputEventType";

    const props = defineProps({
        icon: {
            type: String,
            required: false
        },
        iconName: {
            type: String,
            required: true
        },
        altIcon: {
            type: String,
            required: true,
        }
    });

    const inputRef = ref();

    const loading = ref(false);
    const currentIcon = ref(props.icon ? `${hostURL}/uploads/${props.icon}` : props.altIcon);
    const customIcon = ref(props.icon ? true : false);
    const originalName = ref(props.icon ? props.icon : "");

    const loadImageHandler = async (e: any) => {

        const event = e as InputEventType;

        if (!event.target.files) {
            return;
        }

        const file = event.target.files[0];

        if (loading.value || !file) {
            return;
        }

        try {
            loading.value = true;

            const formData = new FormData();

            formData.append("image", file);

            const resUpload = await axios.post("upload", formData);

            if (!resUpload.data) {
                throw Error();
            }
            
            const res = await axios.post("contacts", {
                [props.iconName]: resUpload.data.filename
            });

            if (!res.data) {
                throw Error();
            }

            currentIcon.value = `${hostURL}/uploads/${resUpload.data.filename}`;
            originalName.value = resUpload.data.filename;
            customIcon.value = true;

        } catch (error) {
            
        } finally {
            loading.value = false;
        }

    }

    const deleteIcon = async (e: Event) => {

        e.stopPropagation();

        if (!originalName.value) {
            return;
        }

        try {
            const res = await axios.post("contacts", {
                [props.iconName]: ""
            });

            if (!res.data) {
                throw Error();
            }

            const resDelete = await axios.delete(`upload?image=${originalName.value}`);

            if (!resDelete.data) {
                throw Error();
            }

            currentIcon.value = props.altIcon;
            customIcon.value = false;

        } catch (error) {
            alert("Не удалось удалить иконку");
        }

    }

</script>
<template>
    <div @click="() => !loading ? inputRef.click() : null" class="relative overflow-hidden border-solid border-2 border-gray-500 rounded-md w-[50px] min-w-[50px] max-w-[50px] h-[50px] min-h-[50px] max-h-[50px] cursor-pointer">
        <img 
            :src="currentIcon" 
            alt="contact-icon"
            class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[25px] h-[25px] object-contain pointer-events-none" 
        />
        <input 
            type="file"
            hidden 
            ref="inputRef"
            accept=".jpeg,.png,.svg,.jpg"
            @change="loadImageHandler"
        />
        <VFragment v-if="customIcon">
            <button @click="deleteIcon" class="absolute z-30 transition-all opacity-0 text-white uppercase font-bold hover:opacity-100 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-full h-full z-20 text-center flex items-center justify-center bg-[#FF0000]">
                Del
            </button>
        </VFragment>
    </div>
</template>~/types/client/InputEventType~/types/client/InputEventType