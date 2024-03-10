<template>
    <div class="content-container">
        <slot />
    </div>
</template>
<style lang="scss" scoped>

    @import "~/assets/css/usable/index.scss";

    .content-container {
        width: 1190px;
        margin: 0 auto;

        @include break-desk-big {
            width: 1024px;
            padding: 0 10px;
        }

        @include break-desk {
            width: 100%;
        }

    }
</style>