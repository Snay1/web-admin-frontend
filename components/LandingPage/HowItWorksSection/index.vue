<script lang="ts" setup>
    import { Title } from "~/components/LandingPage";
    import { Container, Button } from "~/components";
</script>
<template>
    <section class="bg-[#292929] py-[50px] md:py-[100px] text-white relative overflow-hidden">
        <img 
            src="/how-it-works-bg.png"
            alt="Фон"
            class="how-it-works-bg absolute top-0 left-0 w-full h-full opacity-50 object-cover"
        />
        <div class="absolute top-0 left-0 w-full h-full z-[2] backdrop-blur-[10px]">
        </div>
        <div class="how-it-works-linear-top">
        </div>
        <Container class="relative z-[4]">
            <Title>
                Как это работает?
            </Title>
            <div class="flex flex-col md:flex-row justify-between gap-[20px] md:gap-[40px] mt-[40px]">
                <div class="w-full">
                    <ol class="flex flex-col gap-[16px] font-bold text-[18px] md:text-[24px]">
                        <li>
                            1. Регистрируешься
                        </li>
                        <li>
                            2. Покупаешь доступ
                        </li>
                        <li>
                            3. Добавляешь ключи от маркетплейсов
                        </li>
                        <li>
                            4. Готово! Успешность твоего бизнеса повышена на 50% =).
                        </li>
                    </ol>
                    <div class="w-full justify-center hidden md:flex mt-[40px]">
                        <Button href="https://t.me/snayiii" buttonClass="!bg-[#5DCA82] !w-[200px]">
                            купить.
                        </Button>
                    </div>
                </div>
                <!-- <div class="w-full md:min-w-[350px] md:w-[350px] lg:min-w-[400px] lg:w-[400px] xl:min-w-[600px] xl:w-[600px]">
                    <h3 class="text-[18px] md:text-[24px] uppercase font-bold">
                        Подробное видео
                    </h3>
                    <div class="mt-[20px]">
                        <iframe class="w-full h-[300px] md:h-[400px]" width="560" height="315" src="https://www.youtube.com/embed/xJZa2_aldDs?si=-HFQ9vdSzS6Dr1WB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
                        </iframe>
                    </div>
                </div> -->
                <div class="w-full flex justify-center md:hidden">
                    <Button href="https://t.me/snayiii" buttonClass="!bg-[#5DCA82] !w-[200px]">
                        купить.
                    </Button>
                </div>
            </div>
        </Container>
    </section>
</template>
<style lang="scss" scoped>

    .how-it-works {

        &-bg {
            @keyframes bg-anim {
                
            }
            animation: bg-anim infinite linear 10s;
        }

        &-linear {
            &-top {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100px;
                background: rgb(255,255,255);
                background: linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgb(41 41 41) 100%);
                z-index: 3;
            }
        }
    }

</style>