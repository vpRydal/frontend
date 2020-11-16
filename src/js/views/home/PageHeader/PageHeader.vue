<template>
    <div class="page-header container container_big">
        <div class="page-header__slider slider">
            <div class="slider__container">
                <transition name="slide" duration="800" mode="out-in">
                    <Slide
                            v-for="(slide, index) of slides"
                            v-if="currentSlideIndex === index"
                            :key="index" class="slider__slide"
                            :title="slide.title"
                            :text="slide.text"
                            :img-path="slide.imgPath"
                    />
                </transition>
            </div>
            <div class="flexWrapper flexWrapper_J-FE">
                <SliderNav
                        class="slider__nav"
                        @prev="prevHandler"
                        @next="nextHandler"
                        :count-slides="slides.length"
                        :current-slide-index="currentSlideIndex"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Slide from "@/js/views/home/PageHeader/Slide.vue";
    import SliderNav from "@/js/components/SliderNav.vue";

    type ISlide = { text: string; title: string; imgPath: string }


    @Component({
        components: {SliderNav, Slide},
    })

    export default class PageHeader extends Vue {
        currentSlideIndex = -1;
        slides: Array<ISlide> = [
            {
                imgPath: '/img/town.png',
                text: 'Производственные помещения, цеха, бизнес центр и много других дополнительных зданий и  сооружений в совокупности создают технопарк со всей инфраструктурой.',
                title: 'Аренда офисов и производсвенных помещений'
            },
            {
                imgPath: '/img/town.png',
                text: 'Производственные помещения, цеха, бизнес центр и много других дополнительных зданий и  сооружений в совокупности создают технопарк со всей инфраструктурой.',
                title: 'Аренда офисов и производсвенных помещений'
            },
            {
                imgPath: '/img/town.png',
                text: 'Производственные помещения, цеха, бизнес центр и много других дополнительных зданий и  сооружений в совокупности создают технопарк со всей инфраструктурой.',
                title: 'Аренда офисов и производсвенных помещений'
            },
            {
                imgPath: '/img/town.png',
                text: 'Производственные помещения, цеха, бизнес центр и много других дополнительных зданий и  сооружений в совокупности создают технопарк со всей инфраструктурой.',
                title: 'Аренда офисов и производсвенных помещений'
            }
        ];
        idInterval = 0;

        mounted() {
            this.$nextTick(() => {
                this.initSlider()
            })
        }

        prevHandler() {
            clearInterval(this.idInterval);
            this.setInterval();
            if (this.currentSlideIndex === 0)
                this.currentSlideIndex = this.slides.length - 1;
            else
                this.currentSlideIndex--
        }

        nextHandler() {
            clearInterval(this.idInterval);
            this.setInterval();
            if (this.currentSlideIndex === this.slides.length - 1)
                this.currentSlideIndex = 0;
            else
                this.currentSlideIndex++
        }

        setInterval() {
            this.idInterval = setInterval(() => {
                if (this.currentSlideIndex && this.currentSlideIndex + 1 === this.slides.length) {
                    this.currentSlideIndex = 0
                } else {
                    this.currentSlideIndex++
                }
            }, 5000)
        }

        initSlider() {
            setTimeout(() => {
                this.currentSlideIndex = 0;
                this.setInterval();
            }, 500)
        }
    }
</script>

<style scoped lang="stylus">
    @import '../../../../stylus/colors.styl'

    .page-header
        background-color mainColor
        padding 200px 110px 0 110px
        color white
        display flex
        margin-top 200px
        justify-content space-between
        margin-bottom 220px
        @media (max-width 1600px)
            padding 200px 25px 0 25px
        @media (max-width 1180px)
            padding-top 100px
            margin-top 0

    .slider
        width 100%

        &__container
            width 100%

        &__nav
            transform translateY(50px)
            margin-bottom -24px
            margin-left auto
            @media (max-width 675px)
                margin-bottom -54px

</style>