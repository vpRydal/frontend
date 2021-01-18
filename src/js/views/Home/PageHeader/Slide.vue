<template>
    <div class="slide">
        <div class="slide__body">
            <h1 class="slide__title">{{ header }}</h1>
            <p class="slide__text">{{ content }}</p>
            <div class="slide__learn-more learn-more">Узнать подробнее
                <span class="learn-more__arrow"></span>
                <span class="learn-more__circle"></span></div>
        </div>
        <ibg class="slide__town" :src="image"/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component({
        props: {
            header: {
                type: String,
                required: true
            },
            content: {
                type: String,
                required: true
            },
            image: {
                type: String,
                required: true
            }
        }
    })
    export default class Slide extends Vue {
    }
</script>

<style scoped lang="stylus">
    .slide
        display flex
        font-size 36px
        position relative
        z-index 5

        @media (max-width 900px)
            font-size 25px
        @media (max-width 300px)
            font-size 20px

        &__body
            max-width 886px
            margin-right 15px
            @media (max-width 900px)
                width 100%

        &__title
            text-align right
            margin-bottom 20px
            font-size 1em
            @media (max-width 1460px)
                text-align left

        &__text
            max-width 500px
            margin-left auto
            font-size .57em
            margin-right 10px
            margin-bottom 80px
            @media (max-width 1460px)
                margin-left 0

        &__town
            width 552px
            height 812px
            margin-top -330px
            margin-left auto
            @media (max-width 1460px)
                width 0
                height 0
                padding 0 0 71% 50%
            @media (max-width 1180px)
                margin-top 0
                padding: 0 0 53% 36%;
            @media (max-width 900px)
                display none

        &__learn-more
            color black
            font-size 18px
            width 509px
            margin-left auto
            @media (max-width: 560px)
                width 100%

    .learn-more
        position relative
        display flex
        align-items center
        margin-bottom 96px
        word-spacing 5px
        font-size 14px
        @media (max-width: 560px)
            flex-direction column
            align-items unset

        &__arrow
            position relative
            display block
            background-color black
            width 240px
            height 1px
            margin-left 10px
            z-index 2
            &:after
                content ''
                position absolute
                right -6px
                top: -7px;
                border-top: 7px solid transparent;
                border-left: 15px solid #000;
                border-bottom: 7px solid transparent;
            @media (max-width: 560px)
                margin-top 20px


        &__circle
            position absolute
            background-color #b6e0f1
            width: 118px;
            height: 119px;
            border-radius 50%
            right 40px
            top -40px
            @media (max-width 500px)
                display none


    .slide-enter, .slide-leave-to
        & .slide
            &__title, &__text
                transform translateX(-100%)
                opacity 0

            &__town
                opacity 0
                transform translateY(-100%)

    .slide-enter-active, .slide-leave-active
        & .slide
            &__town
                transition all ease .6s

            &__title, &__text
                transition all ease .6s
                transition-delay .2s

            &__text
                transition-delay .2s

    .slide-enter-to, .slide-leave
        & .slide
            &__title, &__text
                transform translateX(0%)
                opacity 1

            &__town
                opacity 1
                transform translateY(0%)
</style>
