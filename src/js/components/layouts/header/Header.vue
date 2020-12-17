<template>
    <div class="header">
        <div class="header__container container container_big" >
            <ibg class="header__logo" :src="logoPng"/>
            <Burger class="header__burger" @click="handleShowMenu"/>
            <nav class="header__nav nav">
                <ul class="nav__list">
                    <li
                            v-for="(link, index) in links"
                            :key="index"
                            class="nav__link">
                        {{ link.displayName }}
                    </li>
                </ul>
            </nav>
            <span class="header__search">Поиск
      <ibg class="header__icon" :src="searchPng"/>
    </span>
        </div>

    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Burger from "@/js/components/layouts/header/Burger.vue";
    import bus from "@/js/common/bus";
    import {mixinNavLinks} from "@/js/mixins/navLinks";
    import searchPng from '@/assets/img/search.png'
    import logoPng from '@/assets/img/logo.png'

    @Component({
        components: {Burger},
        mixins: [mixinNavLinks],
        data: () =>({
            searchPng,
            logoPng
        })
    })
    export default class Header extends Vue {
        handleShowMenu(): void {
            bus.$emit('nav-bar-show')
        }
    }
</script>

<style scoped lang="stylus">
    @import "../../../../stylus/colors.styl"
    .header
        padding 25px 25px
        font-size 20px
        width 100%
        position fixed
        top 0
        background-color white
        z-index 3

        &__container
            display flex
            align-items center
            padding 0 30px
            @media (max-width 470px)
                padding-left 0
        &__logo
            height 51px
            width 112px

        &__burger
            margin-left 130px
            @media (max-width 1290px)
                margin-left auto
            @media (max-width 1200px)
                margin-left 50px
            @media (max-width 500px)
                margin-left auto

        &__nav
            margin-left 60px
            @media (max-width 1290px)
                margin-left auto

        &__search
            color mainColor
            margin-left auto
            display flex
            align-items center
            justify-content center
            margin-right 25px
            @media (max-width 500px)
                margin-left 0

        &__icon
            margin-left 10px
            margin-top 3px
            width 20px
            height 20px

    .nav
        &__list
            display flex
            @media (max-width 1200px)
                display none

        &__link
            margin 0 50px

</style>