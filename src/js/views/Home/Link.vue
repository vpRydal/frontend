<template>
    <div class="link-wrapper">
      <router-link v-if="to" :to="to">
        {{ text }}
      </router-link>
        <a v-else href="" class="link-wrapper__link"></a>
        <span class="link-wrapper__line"></span>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

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
      @Prop({ type: Object, required: false, default: null }) to!: null
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
            font-family Inter-Bold
            margin-bottom 5px
        &__line
            display block
            background-color lightgray
            height 5px
            width 100%
            transform translateX(124px)
            transition background-color ease .6s
</style>
