<template>
    <div class="preloader" :style="{width: size, height: size}">
        <div class="preloader__loader" :style="{width: size, height: size}"></div>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component({})
export default class Preloader extends Vue {
    @Prop({
        type: Boolean,
        default: () => false,
        required: false
    })
    md!: boolean
    @Prop({
        type: Boolean,
        default: () => false,
        required: false
    })
    sm!: boolean
    @Prop({
        type: Boolean,
        default: () => false,
        required: false
    })
    xs!: boolean
    @Prop({
        type: Boolean,
        default: () => false,
        required: false
    })
    lg!: boolean

    get size(): string {
        if (this.lg) {
            return `100px`
        } else if (this.md) {
            return `75px`
        } else if (this.sm) {
            return `50px`
        } else if (this.xs) {
            return `25px`
        }

        return ''
    }
}
</script>

<style scoped lang="stylus">
@import "~@/stylus/colors.styl"

.preloader
    width: 100%;
    height: 100%;

    &__loader
        display: block;
        width: 150px;
        height: 150px;
        border-radius: 50%;
        border: 3px solid transparent;
        border-top-color: mainColor;
        animation: spin 2s linear infinite;

        &:before
            content: "";
            position: absolute;
            top: 5px;
            left: 5px;
            right: 5px;
            bottom: 5px;
            border-radius: 50%;
            border: 3px solid transparent;
            border-top-color: mainColor;
            animation: spin 3s linear infinite;

        &:after
            content: "";
            position: absolute;
            top: 15px;
            left: 15px;
            right: 15px;
            bottom: 15px;
            border-radius: 50%;
            border: 3px solid transparent;
            border-top-color: mainColor;
            animation: spin 1.5s linear infinite;

@-webkit-keyframes spin {
    0% {
        -webkit-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

@keyframes spin {
    0% {
        -webkit-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {

        -webkit-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

</style>
