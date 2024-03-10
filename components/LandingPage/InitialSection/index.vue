<script lang="ts" setup>
    import { ref, onMounted, onUnmounted } from "vue";
    import { Container, Button } from "~/components";
    import InitialCard from "./InitialCard.vue";

    const interval = ref<null | number>(null);
    const iteration = ref<number>(0);

    const items = [
        {
            isSoon: true,
            src: "yandex-market-logo.png",
            alt: "Yandex market лого"
        },
        {
            isSoon: false,
            src: "wb-logo.png",
            alt: "Wb лого"
        },
        {
            isSoon: false,
            src: "ozon-logo.png",
            alt: "Ozon лого"
        },
        {
            isSoon: true,
            src: "avito-logo.png",
            alt: "Avito лого"
        },
    ];

    const titleStyleHandler = () => {

        if (window.innerWidth < 1023) {
            return "rotate(0)";
        }

        switch(iteration.value) {
            case 1: 
                return "rotate(1deg)";
            case 2:
                return "rotate(-1deg)";
            case 3:
                return "rotate(2deg)";
                
            case 4:
                return "rotate(-2deg)";

            default: 
                return "rotate(0)";
        }
    }

    const valueHandler = () => {

        if (window.innerWidth < 1023) {
            return "marketplace-helper.ru";
        }

        switch(iteration.value) {

            case 1: 
                return "m@rketplace-helper.ru";
            case 2:
                return "marketp/|ace-helper.ru";

            case 3:
                return "$@&*#$*(#$<>><$#)#><$3";
                
            case 4:
                return "^_^ketplace^_^helper^_^";

            default: 
                return "marketplace-helper.ru";
        }

    }

    onMounted(() => {
        interval.value = window.setInterval(() => {

            if (iteration.value > 4) {
                return iteration.value = 0;
            }

            iteration.value += 1;

        }, 600);
    });

    onUnmounted(() => {
        if (interval.value) {
            clearInterval(interval.value);
        }
    })

</script>
<template>
    <section class="bg-[#292929] pt-[200px] md:pt-[260px] pb-[100px] md:pb-[160px] text-white relative">
        <div class="absolute top-0 left-0 w-[100%] h-[100%]">
            <img 
                src="/public/initial-section-bg.png"
                alt="Фон"
                class="w-full h-full object-cover"
            />
        </div>
        <Container class="relative z-[2]">
            <h1 class="text-center text-[32px] md:text-[64px] font-bold transition-all" :style="{ 'transform': titleStyleHandler(), }">
                {{ valueHandler() }}
            </h1>
            <ul class="flex justify-center flex-wrap gap-[16px] mt-[40px] md:mt-[80px]">
                <InitialCard 
                    :isSoon="item.isSoon"
                    :src="`_nuxt/${item.src}`"
                    :alt="item.alt"
                    v-for="item in items"
                />
            </ul>
            <div class="flex flex-col gap-[20px] mt-[40px] md:mt-[80px] max-w-[230px] mx-auto">
                <Button link="/login" buttonClass="!bg-[#3FBAFF]">
                    войти.
                </Button>
                <Button link="/register">
                    зарегистрироваться.
                </Button>
            </div>
        </Container>
    </section>
</template>