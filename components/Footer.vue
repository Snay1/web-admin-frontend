<script lang="ts" setup>
    import { Container } from "~/components";

    const year = new Date().getFullYear();


</script>
<template>
    <footer class="py-[20px] border-t border-l-stone-900 border-solid bg-[#292929] text-white">
        <Container class="flex flex-col md:flex-row md:items-center justify-between gap-[20px]">
            <p class="text-xl font-bold uppercase">
                Все права защищены © {{ year }}
            </p>
            <ul>
                <!-- <li>Самозанятый Тропин Степан Васильевич</li> -->
                <li>ИНН 291401505660</li>
                <li>Почта для связи: <a href="mailto:marketplacehelpercall@gmail.com" class="underline">marketplacehelpercall@gmail.com</a></li>
                <li>
                    <NuxtLink to="/privacy" class="underline">
                        Политика конфиденциальности
                    </NuxtLink>
                </li>
            </ul>
        </Container>
    </footer>
</template>