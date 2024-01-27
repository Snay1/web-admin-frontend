<script setup lang="ts">
    import { AdminInput } from '~/components/admin';
    import { Button } from '~/components';
    import type { InputEventType } from '~/types/client/InputEventType';

    import axios from "~/axios";
    import { hostURL } from '~/common';
    import type { PropType } from 'vue';

    const props = defineProps({
        id: {
            type: Number,
            required: false,
        },
        nameInitial: {
            type: String,
            required: false,
        },
        descriptionInitial: {
            type: String,
            required: false,
        },
        priceInitial: {
            type: Number,
            required: false,
        },
        imagesInitial: {
            type: Array as PropType<string[]>,
            required: false,
        }
    });

    const router = useRouter();

    const name = ref("");
    const description = ref("");
    const price = ref("");

    const imageInput = ref();
    const images = reactive<string[]>([]);

    const imageLoading = ref(false);

    const loadInitialData = () => {

        if (!props.id) {
            return;
        }

        name.value = props.nameInitial || "";
        description.value = props.descriptionInitial || "";
        price.value = props.priceInitial ? `${props.priceInitial}` : "";

        if (!props.imagesInitial) {
            return;
        }

        for (let i = 0; i < props.imagesInitial.length; i++) {
            const img = props.imagesInitial[i];
            images.push(img);
        }

    }

    const addImages = async (e: Event) => {
        const event = e as InputEventType;

        if (!event.target.files || !event.target.files.length) {
            return;
        }

        const files = event.target.files;

        imageLoading.value = true;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            try {

                const formData = new FormData();

                formData.append("image", file);

                const resData = await axios.post("upload", formData);

                if (!resData.data) {
                    throw Error();
                }

                images.push(resData.data.filename);

            } catch (error) {
                console.warn(e);
            }

            if (props.id) {

                try {
                    const res = await axios.put("products/update", {
                        id: props.id,
                        images,
                    });

                    if (!res.data) {
                        throw Error();
                    }

                } catch (error) {
                    alert("Не удалось отредактировать продукт");
                }

            }
            
        }
        imageLoading.value = false;

    }

    const deleteImage = async (fileName: string) => {

        if (props.id && !window.confirm("Вы действительно хотите удалить данное изображение?")) {
            return;
        }

        try {
            const res = await axios.delete(`upload?image=${fileName}`);

            if (!res.data) {
                throw Error();
            }

            const fileIndex = images.indexOf(fileName);

            if (fileIndex === -1) {
                throw Error();
            }

            images.splice(fileIndex, 1);

            if (props.id) {
                const res = await axios.put("products/update", {
                    id: props.id,
                    images,
                });
            }

        } catch (error) {
            alert("Не удалось удалить изображение");
        }

    }

    const createProduct = async (e: Event) => {

        e.preventDefault();

        if (!name.value || !name.value.trim()) {
            return alert("Введите название товара");
        }

        if (!description.value || !description.value.trim()) {
            return alert("Введите описание товара");
        }

        const priceNumber = Number(price.value);

        if (isNaN(priceNumber) || priceNumber <= 0) {
            return alert("Введите корректную цену товара");
        }

        const mainBody = {
            title: name.value.trim(),
            description: description.value.trim(),
            price: priceNumber,
            images,
            isEnded: false,
        }

        if (props.id) {

            try {
                const res = await axios.put("products/update", {
                    id: props.id,
                    ...mainBody,
                });

                if (!res.data) {
                    throw Error();
                }

                router.push("/admin/products");

            } catch (error) {
                alert("Не удалось отредактировать продукт");
            }

            return;
        }

        try {
            const res = await axios.post("products/create", mainBody);

            if (!res.data) {
                throw Error();
            }

            router.push("/admin/products");

        } catch (error) {
            alert("Не удалось создать продукт");
        }

    }

    onMounted(() => {
        loadInitialData();
    });

</script>
<template>
    <form class="w-full flex flex-col gap-[16px]" @submit="createProduct">
        <AdminInput 
            :value="name"
            @input="(e) => name = e.target.value"
            placeholder="Название продукта"
        />
        <AdminInput 
            :value="description"
            @input="(e) => description = e.target.value"
            placeholder="Описание продукта"
            inputType="textarea"
        />
        <AdminInput
            type="number" 
            :value="price"
            @input="(e) => price = e.target.value"
            placeholder="Стоимость (в рублях)"
        />

        <div class="w-full">
            <h4 class="text-xl font-medium mb-[16px]">Изображения</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[12px] mb-[16px]">
                <div class="relative" v-for="img in images" v-if="images.length">
                    <div class="absolute top-0 left-0 w-full h-full flex items-end md:items-center md:justify-center opacity-1 md:opacity-0 hover:opacity-100 transition-all p-[10px]">
                        <Button buttonClass="w-full" buttonTheme="red" type="button" @click="deleteImage(img)">
                            Удалить
                        </Button>
                    </div>
                    <img 
                        :src="`${hostURL}/uploads/${img}`" 
                        alt="product-image" 
                        class="object-cover rounded-md w-full h-full"
                    />
                </div>
                <button class="flex items-center min-h-[200px] flex-col gap-[10px] justify-center rounded-md border-[1px] border-solid transition-all hover:bg-stone-200" type="button" @click="imageInput.click()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-square"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
                    <span>Добавить</span>
                </button>
            </div>
            <input 
                ref="imageInput" 
                type="file"
                multiple 
                accept=".jpg,.jpeg,.png"
                hidden
                @change="addImages" 
            />
        </div>

        <div class="w-full h-[1px] bg-slate-600"></div>
        <Button type="submit">
            {{ id ? "Обновить" : "Создать"}}
        </Button>
    </form>
</template>