<script lang="ts" setup>
    import { Section, Title } from "~/components/LandingPage";
    import { Container } from "~/components";
</script>
<template>
    <Section class="py-[50px] md:py-[100px] text-white">
        <Container>
            <Title>
                Цена
            </Title>
            <div class="flex items-start md:items-center justify-start md:justify-between flex-col-reverse md:flex-row font-bold mt-[24px] md:mt-[48px] mb-[36px] gap-[36px]">
                <div class="bg-[#232323] p-[16px] border-solid border-[1px] border-white rounded-[8px] w-full md:w-[600px]">
                    <p class="text-[16px] md:text-[24px]">
                        1200р.
                    </p>
                    <h3 class="my-[16px] text-[24px] md:text-[36px]">
                        вечный доступ.
                    </h3>
                    <p class="text-[14px] md:text-[18px]">
                        У вас есть возможность стать одним из первых 50 человек и приобрести полный доступ по сниженной цене. Далее цена будет выше.
                    </p>
                </div>
                <div class="bg-[#232323] p-[16px] leading-[100%] md:p-[24px] border-solid border-[1px] border-white rounded-[8px] text-[24px] md:text-[36px]">
                    <span class="text-[32px] md:text-[64px]">20/</span>50
                </div>
            </div>
        </Container>
    </Section>
</template>