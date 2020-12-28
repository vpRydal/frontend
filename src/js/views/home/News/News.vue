<template>
    <div class="news" ref="news">
        <div class="news__container container">
            <div class="news__flex-wrapper flex-wrapper flex-wrapper_J-SB flex-wrapper_A-FE">
                <Link text="Смотреть все предложения" class="news__link" v-animate-to-on-scroll:left/>
                <BigHeader :texts="['Новости', 'технопарка']" class="news__title" v-animate-to-on-scroll:right/>
            </div>
            <Slider class="news__slider"/>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator';
    import Link from "@/js/views/home/Link.vue";
    import BigHeader from "@/js/components/BigHeader.vue";
    import Slider from "./Slider.vue";
    import bus from "@/js/common/bus";
    import {ScrollTo} from "@/js/mixins/common";

    @Component({
        components: {Slider, BigHeader, Link},
    })
    export default class News extends Mixins(ScrollTo) {
        created():void {
            bus.$on('scroll-to-news', () => {
                this.scrollTo(this.$refs['news'] as HTMLElement, -100)
            })
        }

        beforeDestroy(): void {
            bus.$off('scroll-to-news')
        }
    }
</script>

<style lang="stylus" scoped>
    .news
        overflow hidden
        &__flex-wrapper
            margin-bottom 80px
            @media(max-width 1500px)
                flex-direction column
            @media(max-width 675px)
                margin-bottom 35px
            @media(max-width 430px)
                margin-bottom 10px
        &__title
            @media(max-width 1500px)
                width 100%
                text-align center
                align-self flex-start
                margin-bottom 80px
            @media(max-width 675px)
                margin-bottom 70px
            @media(max-width 570px)
                margin-bottom 30px
                font-size 90px
            @media(max-width 430px)
                font-size 70px
            @media(max-width 430px)
                font-size 60px
        &__link
            font-size 40px
            @media(max-width 1500px)
                align-self flex-end
                order 1
            @media(max-width 675px)
                font-size 40px
                margin-bottom 20px
            @media(max-width 500px)
                font-size 30px
            @media(max-width 440px)
                font-size 25px
            @media(max-width 375px)
                font-size 20px
        &__slider
            margin-bottom 90px
</style>
