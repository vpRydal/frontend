<template>
    <div class="nav" ref="nav">
        <div class="nav__body flex-wrapper flex-wrapper_A-C" ref="body">
            <span class="nav__prev" @click="$emit('prev')"></span>
            <ul class="nav__list flex-wrapper" ref="nav-list">
                <li v-for="index in Object.keys(Array(countSlides).fill(0))" :key="index" class="nav__item"
                    :class="{'nav__item_active': currentSlideIndex === Number(index)}" :index="index"></li>
            </ul>
            <span class="nav__next" @click="$emit('next')"></span>
        </div>
        <span class="nav-cursor" ref="nav-cursor"></span>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Prop, Watch} from 'vue-property-decorator';
    import $ from "jquery";

    @Component({})
    export default class SliderNav extends Vue {
        @Prop({
            type: Number,
            required: true
        })
        countSlides!: number;
        @Prop({
            type: Number,
            required: true
        })
        currentSlideIndex!: number;
        @Prop({
            type: Number,
            default: 3
        })
        navItemHeight!: number;
        /* eslint-disable */
        $navList: JQuery<any> = $();
        /* eslint-disable */
        $navCursor: JQuery<any> = $();

        @Watch('currentSlideIndex')
        watchCurrentSlideIndex() {
            this.setCursor()
        }

        handleResize() {
            this.setCursor();
            this.initNav();
        }

        mounted() {
            this.$nextTick(() => {
                this.initNav();
                this.setCursor();
            });

            window.addEventListener('resize', this.handleResize)
        }

        beforeDestroy(): void {
            window.removeEventListener('resize', this.handleResize)
        }

        getTop(): number {
            return this.$navList.find('.nav__item').position().top
        }

        initNav() {
            this.$navList = $(this.$refs['nav-list']);
            const oneItemWidth = this.$navList.width() as number / this.countSlides;

            this.$navList.find('.nav__item').css('max-width', oneItemWidth).height(this.navItemHeight);
            this.$navCursor = $(this.$refs['nav-cursor']).css('max-width', oneItemWidth).height(this.navItemHeight);
        }

        setCursor() {
            const $activeNavItem = this.$navList.find(`li[index="${this.currentSlideIndex}"]`);
            const left = $activeNavItem.position()?.left as number;
            this.$navCursor.css('top', this.getTop());
            this.$navCursor.css('transform', `translateX(${left}px)`);
        }
    }
</script>

<style scoped lang="stylus">
    @import '../../stylus/colors.styl'

    .nav
        position relative
        @media (max-width 675px)
            width 100%
        @media (max-width 675px)
            font-size 30px !important


        &__body
            width 600px
            @media (max-width 675px)
                display flex
            @media (max-width 675px)
                width 100%
        &__list
            width 100%

        &__item
            background-color #d7d7d7
            transition background-color ease .5s
            height 3px
            width 100%

        &__next, &__prev
            color mainColor
            display inline-block
            cursor pointer
            margin 0 25px

        &__prev
            order 1
            &:after
                display block
                content ''
                border-top: 7px solid transparent;
                border-right: 15px solid mainColor;
                border-bottom: 7px solid transparent;
            @media (max-width 675px)
                margin 0
                margin-right 10px
                order 0
        &__next
            order 2
            &:after
                display block
                content ''
                border-top: 7px solid transparent;
                border-left: 15px solid mainColor;
                border-bottom: 7px solid transparent;
            @media (max-width 675px)
                margin 0
                margin-left 10px
                order 0

    .nav-cursor
        position absolute
        top 0
        display block
        background-color mainColor
        height 3px
        width 100%
        transition transform ease .5s
</style>