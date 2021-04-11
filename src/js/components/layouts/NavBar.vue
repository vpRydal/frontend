<template>
    <transition name="nav-bar" direction="1500">
        <aside v-if="visible" class="nav-bar" @click="handleClick" ref="nav-bar">
            <div class="nav-bar__body" ref="body">
                <div class="nav-bar__header header">
                    <div class="flex-wrapper flex-wrapper_J-SB">
                        <ibg :src="logoImg" class="header__logo"/>
                        <span class="header__cross cross cross_md" @click="handleClose"></span>
                    </div>
                </div>
                <NavLinks class="nav-bar__links-list" @click="handleClose">
                    <template v-slot:link="{link}" >
                        <router-link :to="{ name: link.routeName, hash: link.hash ? `#${link.hash}` : '' }" class="nav-bar__link">
                            {{ link.displayName }}
                        </router-link>
                    </template>
                </NavLinks>
            </div>
        </aside>
    </transition>
</template>

<script lang="ts">
import {Component, Watch, Vue} from 'vue-property-decorator';
import $ from 'jquery'
import bus from "../../common/bus";
import {mixinNavLinks} from "@/js/mixins/navLinks";
import logoImg from '@/assets/img/logo.png'
import NavLinks from "@/js/components/layouts/header/NavLinks.vue";
import Search from "@/js/components/layouts/header/Search.vue";
import {mapGetters} from "vuex";

@Component({
    components: {Search, NavLinks},
    mixins: [mixinNavLinks],
    data: () => ({
        logoImg
    }),
    computed: {
        ...mapGetters('common', {
            $windowWidth: 'windowWidth'
        })
    }
})
export default class NavBar extends Vue {
    visible = false;

    mounted(): void {
        bus.$on('nav-bar-hide', () => {
            this.hide();
        });

        bus.$on('nav-bar-show', () => {
            this.show()
        });
    }

    show(): void {
        this.visible = true
    }

    hide(): void {
        this.visible = false
    }

    handleClick(event: Event): void {
        const $body = $(this.$refs['nav-bar']);

        if ($body.get(0) === event.target) {
            this.hide()
        }
    }

    handleClose(): void {
        this.hide()
    }

    @Watch('visible')
    watchShow(val: boolean): void {
        if (val) {
            $('body').css('overflow', 'hidden')
        } else {
            $('body').css('overflow', '')
        }
    }

    @Watch('$route')
    watchRoute(): void {
        this.hide()
    }
}
</script>

<style scoped lang="stylus">
@import "~@/stylus/colors.styl"

.nav-bar
    background-color rgba(0, 0, 0, .6)
    position fixed
    width 100%
    height 100%
    z-index 6
    top 0
    left 0

    &__search
        margin-bottom 10px

    &__header
        margin-bottom 80px

    &__links-list
        display flex
        flex-direction column
        text-transform uppercase
        margin-bottom 30px


    &__link
        display block
        margin 17px 0
        padding-bottom 3px
        &.router-link-active

          border-bottom 3px solid mainColor

    &__body
        background-color: white;
        width 30%
        height 100%
        padding 25px
        padding-left 50px
        overflow-y auto

        @media (max-width 750px)
            width 50%
        @media (max-width 450px)
            width 60%

    &-enter, &-leave-to
        opacity 0

        & ^[0]__body
            transform translateX(-100%)

    &-enter-active, &-leave-active
        transition opacity ease .5s

        & ^[0]__body
            transition transform ease .5s

    &-enter-to, &-leave
        opacity 1

        & ^[0]__body
            transform translateX(0)

.header
    &__logo
        height 80px
        width 80px
</style>
