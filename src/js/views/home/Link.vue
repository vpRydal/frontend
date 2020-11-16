<template>
    <div class="link-wrapper">
        <a href="" class="link-wrapper__link">{{ text }}</a>
        <span class="link-wrapper__line"></span>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component({
        components: {},
        props: {
            text: {
                type: String,
                required: true
            }
        }
    })
    export default class Link extends Vue {
    }
</script>

<style lang="stylus" scoped>
    @import "../../../stylus/colors.styl"

    .link-wrapper
        display inline-block
        font-size 38.5px
        &:hover
            & ^[0]__line
                background-color mainColor
        &_right
            margin-left 65%
        &__link
            display block
            font-family Raleway-Bold
            margin-bottom 5px
        &__line
            display block
            background-color lightgray
            height 5px
            width 100%
            transform translateX(124px)
            transition background-color ease .6s
</style>