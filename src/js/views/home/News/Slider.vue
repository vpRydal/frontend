<template>
    <div class="slider">
        <Slick :options="slickOptions" @beforeChange="handleBeforeChange" ref="slick" class="slider__slick-slider">
            <Slide v-for="(slide, index) in slides"
                   :key="index + 123"
                   :title="slide.title"
                   :text="slide.text"
                   :img="slide.img"
            />
        </Slick>
        <SliderNav
                class="slider__nav"
                :current-slide-index="currentSlideIndex"
                :countSlides="slides.length"
                :nav-item-height="7"
                @next="handleNextSlide"
                @prev="handlePrevSlide"
        />
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Slide from "./Slide.vue";
    import Slick from "vue-slick";
    import SliderNav from "@/js/components/SliderNav.vue";

    type slide = { img: string; title: string; text: string }

    @Component({
        components: {SliderNav, Slide, Slick},
    })
    export default class Slider extends Vue {
        currentSlideIndex = 0;
        slickOptions = {
            slidesToShow: 1,
            autoplay: true,
            delay: 5000,
            arrows: false
        };
        slides: Array<slide> = [
            {
                img: '/img/logo.png',
                title: 'Как правильно \n' +
                    'составить обращение \n' +
                    'к чиновнику',
                text: 'По данным регионального управления Росстата, граждане довольно активно обращаются в органы государственной власти, местного самоуправления и к их должностным лицам.\n' +
                    '\n' +
                    'Подавляющее большинство составляют обращения о нарушениях прав граждан в сферах трудового, жилищного законодательства, ЖКХ, здравоохранения, образования, по пенсионным вопросам, на нарушения земельного законодательства, прав малого и среднего бизнеса.'
            },
            {
                img: '/img/logo.png',
                title: 'Как правильно \n' +
                    'составить обращение \n' +
                    'к чиновнику',
                text: 'По данным регионального управления Росстата, граждане довольно активно обращаются в органы государственной власти, местного самоуправления и к их должностным лицам.\n' +
                    '\n' +
                    'Подавляющее большинство составляют обращения о нарушениях прав граждан в сферах трудового, жилищного законодательства, ЖКХ, здравоохранения, образования, по пенсионным вопросам, на нарушения земельного законодательства, прав малого и среднего бизнеса.'
            },
            {
                img: '/img/logo.png',
                title: 'Как правильно \n' +
                    'составить обращение \n' +
                    'к чиновнику',
                text: 'По данным регионального управления Росстата, граждане довольно активно обращаются в органы государственной власти, местного самоуправления и к их должностным лицам.\n' +
                    '\n' +
                    'Подавляющее большинство составляют обращения о нарушениях прав граждан в сферах трудового, жилищного законодательства, ЖКХ, здравоохранения, образования, по пенсионным вопросам, на нарушения земельного законодательства, прав малого и среднего бизнеса.'
            }
        ];

        handleNextSlide() {
            /* eslint-disable */
            //@ts-ignore
            this.$refs['slick'].next()
        }

        handlePrevSlide() {
            /* eslint-disable */
            //@ts-ignore
            this.$refs['slick'].prev()
        }
        /* eslint-disable */
        handleBeforeChange(event: Event, slick: any, currentSlide: number, nextSlide: number) {
            this.currentSlideIndex = nextSlide;
        }
    }
</script>

<style scoped lang="stylus">
    .slider
        &__slick-slider
            margin-bottom 90px
        &__nav
            margin-left 10%
            @media (max-width 675px)
                margin-left 0
</style>