<script lang="ts" setup>
    import { Title } from "~/components/LandingPage";
    import { Button, Container } from "~/components";
    import PriceCard from "./PriceCard.vue";
    import axios from "~/axios";

    const activeAccounts = ref(0);
    const price = ref(1200);
    const testPrice = ref(300);
    const currentGoal = ref(50);

    const getActiveAccounts = async () => {
        try {
            const res = await axios.get("/users/active-accounts");
            
            if (!res.data) {
                throw Error();
            }

            const value = res.data.result

            activeAccounts.value = value;

            const setInitialValues = () => {

                if (value < 50) {
                    return;
                }

                if (value < 150) {
                    
                    price.value = 1400;
                    testPrice.value = 350;
                    currentGoal.value = 150;
                    
                    return;
                }

                if (value < 300) {
                    price.value = 2000;
                    testPrice.value = 500;
                    currentGoal.value = 600;
                }

            }

            setInitialValues();
            
        } catch (error) {
            
        } 
    }

    onMounted(() => {
        getActiveAccounts();
    });

</script>
<template>
    <section class="bg-[#292929] py-[50px] md:py-[100px] text-white relative">
        <img 
            src="/public/price-section-bg.png"
            alt="Фон"
            class="absolute top-0 left-0 w-full h-full object-cover"
        />
        <div class="absolute top-0 left-0 w-full h-full z-[2] backdrop-blur-[5px]">
        </div>
        <div class="price-linear-top">
        </div>
        <div class="price-linear-bot">
        </div>
        <Container class="relative z-[4]">
            <Title>
                Цена
            </Title>
            <div class="flex items-start md:items-center justify-start md:justify-between flex-col-reverse md:flex-row font-bold mt-[24px] md:mt-[48px] mb-[12px] md:mb-[36px] gap-[36px]">
                <PriceCard 
                    :price="price"
                    title="вечный доступ."
                    description="У вас есть возможность стать одним из первых 50 человек и приобрести полный доступ по сниженной цене. Далее цена будет выше."
                />
                <div class="bg-[#232323] p-[16px] leading-[100%] md:p-[24px] border-solid border-[1px] border-white rounded-[8px] text-[24px] md:text-[36px]">
                    <span class="text-[32px] md:text-[64px]">{{ activeAccounts }}/</span>{{ currentGoal }}
                </div>
            </div>
            <p class="font-bold text-white text-[24px] md:text-[32px] w-full md:w-[600px] text-center mb-[12px] md:mb-[36px]">
                или
            </p>
            <PriceCard 
                :price="testPrice"
                title="тестовая версия."
                description="Перед тем как покупать полную версию, вы можете взять тестовый вариант с полным функционалом на 3 дня, чтобы понять, нужен ли вам данный сервис."
            />
            <div class="flex justify-center w-full md:w-[600px] mt-[36px] md:mt-[48px]">
                <Button href="https://t.me/snayiii" buttonClass="!bg-[#5DCA82] !w-[200px]">
                    купить.
                </Button>
            </div>
        </Container>
    </section>
</template>
<style lang="scss" scoped>
    .price {
        &-linear {
            &-top {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100px;
                background: rgb(255,255,255);
                background: linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgb(32 32 32) 100%);
                z-index: 3;
            }
            &-bot {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 100px;
                background: rgb(255,255,255);
                background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgb(32 32 32) 100%);
                z-index: 3;
            }
        }
    }
</style>