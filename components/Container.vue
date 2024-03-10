<template>
    <div class="container">
        <slot />
    </div>
</template>
<style lang="scss" scoped>
    .container {
        width: 1190px;
        margin: 0 auto;

        @media (max-width: 1200px) {
            width: 1024px;
            padding: 0 10px;
        }

        @media (max-width: 1023px) {
            width: 100%;
        }

    }
</style>