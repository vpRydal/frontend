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
                            :img-path="slide.image_path"
                    />
                </transition>
            </div>
            <div class="flex-wrapper flex-wrapper_J-FE">
                <SliderNav
                    v-if="slides.length"
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
import {Component, Mixins} from 'vue-property-decorator';
    import Slide from "@/js/views/Home/PageHeader/Slide.vue";
    import SliderNav from "@/js/components/SliderNav.vue";
    import SlideOnMainPage from "@/js/api/SlideOnMainPage";
    import bus from "@/js/common/bus";
    import {ScrollTo} from "@/js/mixins/common";

    @Component({
        components: {SliderNav, Slide},
        data: () => ({
        }),
        metaInfo: {
            title: 'Аренда помещений Севастополь',
            meta: [
                {
                    vmid: 'description',
                    name: 'description',
                    content: "Аренда помещений в севастополь",
                },
                {
                    vmid: 'keywords',
                    name: 'keywords',
                    content: 'аренда, недвижимость, севастополь, аренда помещений, аренда недвижимости, помещения, коммерческая недвижимость',
                }
            ]
        }
    })

    export default class PageHeader extends Mixins(ScrollTo) {
        currentSlideIndex = -1;
        slides: Array<SlideOnMainPage> = [];

        idInterval = 0;
        mounted():void {
          SlideOnMainPage.getList().then(({data}) => {
            this.slides = data
          })
            this.$nextTick(() => {
                this.initSlider()
            })
        }

        prevHandler():void {
            clearInterval(this.idInterval);
            this.setInterval();
            if (this.currentSlideIndex === 0)
                this.currentSlideIndex = this.slides.length - 1;
            else
                this.currentSlideIndex--
        }

        nextHandler():void {
            clearInterval(this.idInterval);
            this.setInterval();
            if (this.currentSlideIndex === this.slides.length - 1)
                this.currentSlideIndex = 0;
            else
                this.currentSlideIndex++
        }

        setInterval():void {
            this.idInterval = setInterval(() => {
                if (this.currentSlideIndex && this.currentSlideIndex + 1 === this.slides.length) {
                    this.currentSlideIndex = 0
                } else {
                    this.currentSlideIndex++
                }
            }, 5000)
        }

        initSlider():void {
            setTimeout(() => {
                this.currentSlideIndex = 0;
                this.setInterval();
            }, 500)
        }

        created():void {
            bus.$on('scroll-to-info', () => {
                this.scrollTo(0)
            })
        }

        beforeDestroy(): void {
            bus.$off('scroll-to-info')

            if (this.idInterval) {
                clearInterval(this.idInterval)
            }
        }
    }
</script>

<style scoped lang="stylus">
    @import '~@/stylus/colors.styl'

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
