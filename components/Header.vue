<script setup lang="ts">
    import { Logo, Button, Container } from "~/components";

    const navItems = [
        // {
        //     link: "/guide",
        //     text: "Гайд"
        // },
        {
            link: "/privacy",
            text: "Политика"
        },
    ];

</script>
<template>
    <header class="header absolute top-[24px] w-full z-50 flex justify-center">
        <Container class="header-content backdrop-blur-[10px]">
            <Logo />
            <nav class="w-full md:w-fit md:mr-auto md:ml-[20px] text-2xl font-medium">
                <ul class="flex gap-[20px] flex-col items-center md:flex-row md:items-start">
                    <li v-for="item in navItems">
                        <NuxtLink :to="item.link" class="flex items-center justify-center transition-all hover:text-[#3FBAFF]">
                            {{ item.text }}
                        </NuxtLink>
                    </li>
                </ul>
            </nav>
            <Button link="/login" buttonClass="!bg-[#3FBAFF] text-[20px] w-full md:w-[150px]">
                войти.
            </Button>
        </Container>
    </header>
</template>
<style lang="scss" scoped>
    
    @import "~/assets/css/usable/index.scss";
    
    .header {
        color: #fff;

        &-content {
            @include fcb;
            background-color: rgba(18, 18, 18, 0.25);
            border-radius: 12px;
            padding: 20px 24px !important;
            gap: 20px;

            margin: 0 10px !important;

            @include break-desk {
                margin: 0;
            }

            @include break-mobile {
                flex-direction: column;
            }

        }

    }
</style>