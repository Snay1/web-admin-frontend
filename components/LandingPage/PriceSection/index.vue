<script lang="ts" setup>
    import { Section, Title } from "~/components/LandingPage";
    import { Button, Container } from "~/components";
    import PriceCard from "./PriceCard.vue";
</script>
<template>
    <Section class="py-[50px] md:py-[100px] text-white relative">
        <img 
            src="/public/price-section-bg.png"
            alt="Фон"
            class="absolute top-0 left-0 w-full h-full object-cover"
        />
        <div class="absolute top-0 left-0 w-full h-full z-[2] backdrop-blur-[5px]">
        </div>
        <div class="price-linear">

        </div>
        <Container class="relative z-[4]">
            <Title>
                Цена
            </Title>
            <div class="flex items-start md:items-center justify-start md:justify-between flex-col-reverse md:flex-row font-bold mt-[24px] md:mt-[48px] mb-[12px] md:mb-[36px] gap-[36px]">
                <PriceCard 
                    :price="1200"
                    title="вечный доступ."
                    description="У вас есть возможность стать одним из первых 50 человек и приобрести полный доступ по сниженной цене. Далее цена будет выше."
                />
                <div class="bg-[#232323] p-[16px] leading-[100%] md:p-[24px] border-solid border-[1px] border-white rounded-[8px] text-[24px] md:text-[36px]">
                    <span class="text-[32px] md:text-[64px]">20/</span>50
                </div>
            </div>
            <p class="font-bold text-white text-[24px] md:text-[32px] w-full md:w-[600px] text-center mb-[12px] md:mb-[36px]">
                или
            </p>
            <PriceCard 
                :price="300"
                title="тестовая версия."
                description="Перед тем как покупать полную версию, вы можете взять тестовый вариант с полным функционалом на 3 дня, чтобы понять, нужен ли вам данный сервис."
            />
            <div class="flex justify-center w-full md:w-[600px] mt-[36px] md:mt-[48px]">
                <Button href="https://t.me/snayiii" buttonClass="!bg-[#5DCA82] !w-[200px]">
                    купить.
                </Button>
            </div>
        </Container>
    </Section>
</template>
<style lang="scss" scoped>
    .price {
        &-linear {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100px;
            background: rgb(255,255,255);
            background: linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgb(32 32 32) 100%);
            z-index: 3;
        }
    }
</style>