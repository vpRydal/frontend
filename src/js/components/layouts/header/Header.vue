<template>
    <div class="header">
        <div class="header__container container container_big">
            <router-link :to="{name: 'home'}">
                <ibg class="header__logo" :src="logoPng"/>
            </router-link>
            <Burger class="header__burger" @click="handleShowMenu"/>
            <nav v-if="!isXSM" class="header__nav nav">
                <NavLinks class="nav__links">
                    <template v-slot:link="{link}">
                        <router-link v-if="link.isLink" :to="{name: link.routeName}" class="nav__link">
                            {{ link.displayName }}
                        </router-link>
                        <span v-else class="cursor-pointer nav__link">{{ link.displayName }}</span>
                    </template>
                </NavLinks>
            </nav>
            <Search v-if="!isXSM" class="header__search"/>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Burger from "@/js/components/layouts/header/Burger.vue";
import logoPng from '@/assets/img/logo.png'
import bus from "@/js/common/bus";
import NavLinks from "@/js/components/layouts/header/NavLinks.vue";
import Search from "@/js/components/layouts/header/Search.vue";
import {mapGetters} from "vuex";

@Component({
    components: {Search, NavLinks, Burger},
    data: () => ({
        logoPng
    }),
    computed: {
        ...mapGetters('common', {
            $windowWidth: 'windowWidth'
        })
    }
})
export default class Header extends Vue {
    $windowWidth!: number

    handleShowMenu(): void {
        bus.$emit('nav-bar-show')
    }

    get isXSM(): boolean {
        return this.$windowWidth <= 500;
    }
}
</script>

<style scoped lang="stylus">
@import "../../../../stylus/colors.styl"
.header
    font-size 20px
    width 100%
    position fixed
    top 0
    background-color white
    z-index 3

    &__container
        display flex
        align-items center
        margin 0 auto
        padding-top 5px
        padding-bottom 5px
        @media (max-width 1200px)
            padding 5px 40px

    &__logo
        height 50px
        width 50px

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
        margin-left auto
        margin-right 130px
        @media (max-width 1240px)
            margin-right 0

    &__icon
        margin-left 10px
        margin-top 3px
        width 20px
        height 20px

.nav
    &__links
        display flex
        @media (max-width 1200px)
            display none

    &__link
        margin 0 50px
</style>
