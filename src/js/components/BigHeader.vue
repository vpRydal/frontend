<template>
    <transition-group :tag="tag" class="title title_font-size-one">
        <span class="title__first-word" key="1">{{ texts[0]}} </span>
        <span class="title__second-word" key="2">{{ texts[1] }}</span>
        <span v-if="texts[2]" class="title__third-word" key="3">{{ texts[2] }}</span>
    </transition-group>
</template>

<script>
    import {Component, Vue} from 'vue-property-decorator';

    @Component({
        components: {},
        props: {
            texts: {
                type: Array,
                required: true
            },
            tag: {
                type: String,
                default: 'h2'
            }
        }
    })
    export default class BigHeader extends Vue {
    }
</script>

<style scoped lang="stylus">
    .title
        display flex
        flex-direction column
        text-align right
        font-size 127px
        &__first-word
            line-height 1em
            font-size 1em
        &__second-word
            line-height .9em
        &__third-word
            line-height .8em
        &__first-word, &__second-word, &__third-word
            font-weight 800
        &__second-word, &__third-word
            font-size .8em
            & ^[0]_font-size-one
                font-size 1em

</style>