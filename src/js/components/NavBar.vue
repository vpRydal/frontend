<template>
    <transition name="nav-bar" direction="1500">
        <aside v-if="visible" class="nav-bar" @click="handleClick" ref="nav-bar">
            <div class="nav-bar__body" ref="body">
                <div class="nav-bar__header header">
                    <div class="flexWrapper flexWrapper_J-SB">
                        <ibg src="/img/logo.png" class="header__logo"/>
                        <span class="header__cross" @click="handleClose"></span>
                    </div>
                </div>
                <ul class="nav-bar__links-list">
                    <li
                            v-for="(link, index) in links"
                            :key="index"
                            class="nav-bar__link">{{ link.displayName }}
                    </li>
                </ul>
            </div>
        </aside>
    </transition>
</template>

<script lang="ts">
    import {Component, Watch, Vue} from 'vue-property-decorator';
    import $ from 'jquery'
    import bus from "../bus";
    import {mixinNavLinks} from "@/js/mixins/navLinks";

    @Component({
        mixins: [mixinNavLinks],
    })
    export default class NavBar extends Vue {
        visible = false;

        mounted() {
            bus.$on('nav-bar-hide', () => {
                this.hide();
            });

            bus.$on('nav-bar-show', () => {
                this.show()
            });
        }

        show() {
            this.visible = true
        }

        hide() {
            this.visible = false
        }

        handleClick(event: Event) {
            const $body = $(this.$refs['nav-bar']);

            if ($body.get(0) === event.target) {
                this.hide()
            }
        }

        handleClose() {
            this.hide()
        }

        @Watch('visible')
        watchShow(val: boolean) {
            if (val) {
                $('body').css('overflow', 'hidden')
            } else {
                $('body').css('overflow', '')
            }
        }
    }
</script>

<style scoped lang="stylus">
    .nav-bar
        background-color rgba(0, 0, 0, .6)
        position fixed
        width 100%
        height 100%
        z-index 4
        top 0
        left 0

        &__header
            margin-bottom 80px

        &__links-list
            display flex
            flex-direction column
            text-transform uppercase
            font-size 25px

        &__link
            margin 20px 0

        &__body
            background-color: white;
            width 30%
            height 100%
            padding 25px
            padding-left 50px
            @media (max-width 750px)
                width 50%
            @media (max-width 450px)
                width 83%

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
            height 51px
            width 112px

        &__cross
            display block
            position relative
            height 50px
            width 50px
            cursor pointer

            &:before, &:after
                top 50%
                content ''
                background-color black
                position absolute
                display block
                width 40px
                height 2px
                transform rotate(45deg)

            &:after
                transform rotate(-45deg)
</style>