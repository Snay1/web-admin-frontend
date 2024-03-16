<script lang="ts" setup>
    import { Title } from "~/components/LandingPage";
    import { Container, Button } from "~/components";
    import ItemCard from "./ItemCard.vue";
    import SmallTitle from "./SmallTitle.vue";

    const beforeItems = [
        {
            icon: "_nuxt/public/wb-logo.png",
            alt: "Wb icon",
            title: "WIldberries",
            items: [
                'Возможность управлять остатками товаров на любом складе (склады продавца + WB склады).',
                'Возможность менять цены товаров на любом складе (склады продавца  + WB склады).',
            ],
        },
        {
            icon: "_nuxt/public/ozon-logo.png",
            alt: "Ozon icon",
            title: "Ozon",
            items: [
                'Возможность  управлять остатками товаров.',
                'Возможность менять цены товаров.',
            ],
        },
    ];

    const afterItems = [
        {
            icon: "_nuxt/public/wb-logo.png",
            alt: "Wb icon",
            title: "WIldberries",
            items: [
                'Полный контроль над любой карточкой товара.',
                'Управление складами и пропусками.',
            ],
        },
        {
            icon: "_nuxt/public/ozon-logo.png",
            alt: "Ozon icon",
            title: "Ozon",
            items: [
                'Полный контроль над любой карточкой товара.',
            ],
        },
        {
            icon: "_nuxt/public/yandex-market-logo.png",
            alt: "Yandex market icon",
            title: "Яндекс маркет",
            items: [
                'Полный контроль над любой карточкой товара.',
            ],
        },
        {
            icon: "_nuxt/public/avito-logo.png",
            alt: "Avito icon",
            title: "Авито",
            items: [
                'Полный контроль над любой карточкой товара.',
            ],
        },
        {
            icon: "_nuxt/public/megamarket-logo.png",
            alt: "Megamarket icon",
            title: "Мегамаркет",
            items: [
                'Полный контроль над любой карточкой товара.',
            ],
        },
    ];

</script>
<template>
    <section class="py-[50px] md:py-[100px] relative">
        <div class="functionality-linear-top">

        </div>
        <Container class="relative z-[3]">
            <Title>
                Функционал
            </Title>
            <SmallTitle class="mt-[50px]">
                Сейчас:
            </SmallTitle>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-[20px] mt-[20px] md:mt-[40px]">
                <ItemCard 
                    :icon="item.icon"
                    :alt="item.alt"
                    :title="item.title"
                    :items="item.items"
                    v-for="item in beforeItems"
                />   
            </div>
            <SmallTitle class="my-[40px]">
                В будущем:
            </SmallTitle>
            <ItemCard 
                title="marketplace-helper.ru"
                :items="[
                    'Статистика по продажам, остаткам на складе, возможность экспорта и импорта.',
                    'Возможность редактировать одновременно множество карточек, независимо от маркетплейса.',
                    'Возможность выставить шаблон расстановки цен  для каждого маркетплейса отдельно (базовая цена + наценка).',
                ]"
            />
            <div class="grid grid-cols-1 md:grid-cols-2 gap-[20px] mt-[20px]">
                <ItemCard 
                    :icon="item.icon"
                    :alt="item.alt"
                    :title="item.title"
                    :items="item.items"
                    v-for="item in afterItems"
                /> 
            </div>
            <Button link="/register" buttonClass="mt-[50px] md:mt-[100px] !w-[230px] mx-auto">
                зарегистрироваться.
            </Button>
        </Container>
    </section>
</template>
<style lang="scss" scoped>
    .functionality {
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
        }
    }
</style>