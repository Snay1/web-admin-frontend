<script setup lang="ts">
    import { Logo, Button, Container } from "~/components";
</script>
<template>
    <header class="header absolute top-[24px] left-[50%] translate-x-[-50%] md:w-full z-50">
        <Container class="header-content backdrop-blur-[10px]">
            <Logo />
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

        @include break-mobile {
            width: calc(100% - 24px);
        }

        &-content {
            @include fcb;
            background-color: rgba(18, 18, 18, 0.25);
            border-radius: 12px;
            padding: 20px 24px !important;
            gap: 20px;

            @include break-mobile {
                flex-direction: column;
            }

        }

    }
</style>