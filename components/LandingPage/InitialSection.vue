<script lang="ts" setup>
    import { Container, Button } from "~/components";
    import { ref, onMounted, onUnmounted } from "vue";

    const interval = ref<null | number>(null);
    const iteration = ref<number>(0);

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
                src="/assets/img/initial-section-bg.png"
                alt="Фон"
                class="w-full h-full object-cover"
            />
        </div>
        <Container class="relative z-[2]">
            <h1 class="text-center text-[32px] md:text-[64px] font-bold transition-all" :style="{ 'transform': titleStyleHandler(), }">
                {{ valueHandler() }}
            </h1>
            <ul class="flex justify-center flex-wrap gap-[16px] mt-[40px] md:mt-[80px]">
                <li class="w-[125px] h-[125px] relative rounded-[12px] overflow-hidden">
                    <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-[5px] font-bold bg-[#56565699] text-white text-[16px]">
                        скоро.
                    </div>
                    <img 
                        src="/assets/img/yandex-market-logo.png"
                        alt="Yandex market лого"
                        class="w-full h-full"
                    />
                </li>
                <li class="w-[125px] h-[125px] relative rounded-[12px] overflow-hidden">
                    <img 
                        src="/assets/img/wb-logo.png"
                        alt="Wb лого"
                        class="w-full h-full"
                    />
                </li>
                <li class="w-[125px] h-[125px] relative rounded-[12px] overflow-hidden">
                    <img 
                        src="/assets/img/ozon-logo.png"
                        alt="Ozon лого"
                        class="w-full h-full"
                    />
                </li>
                <li class="w-[125px] h-[125px] relative rounded-[12px] overflow-hidden">
                    <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-[5px] font-bold bg-[#56565699] text-white text-[16px]">
                        скоро.
                    </div>
                    <img 
                        src="/assets/img/avito-logo.png"
                        alt="Avito лого"
                        class="w-full h-full"
                    />
                </li>
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