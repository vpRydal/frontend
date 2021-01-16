<template>
    <div class="select" @click.stop>
        <div class="select__head" @click.stop="onShow" :class="{'select__head_active': showBody}">
            <span
                v-if="multiple"
                v-for="(option, index) in selectedOptions"
                :key="index"
                class="select__option select__option_multiple multiple-option"
            >
                <span class="multiple-option__body">
                    <span class="multiple-option__text">{{ option.label }}<span
                        class="multiple-option__cross cross cross_xsm" @click.stop="onPopOption(option)"></span></span>
                </span>
            </span>
            <span v-else class="select__option">{{ selectedOptions[0].label }}</span>
        </div>
        <div v-if="showBody" class="select__body" :class="{'select__body_active': showBody}">
            <ul class="select__options">
                <li
                    v-for="(option, index) in options"
                    :key="index"
                    @click.stop="onSelectOption(option)"
                    class="select__option select__option_body"
                    :class="{'select__option_selected': selectedOptions.includes(option)}"
                >{{ option.label }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue, Watch} from "vue-property-decorator";
import {option} from "@/js/common/types";



@Component({})
export default class Select extends Vue {
    @Prop({
        type: Boolean,
        default: () => false
    })
    multiple!: boolean
    @Prop({
        type: Array
    })
    options!: Array<option>
    @Prop({
        type: Array,
    })
    selected?: option

    selectedOptions: Array<option> = []
    showBody = false

    @Emit('changedOption')
    @Watch('selectedOptions')
    watchSelectedOptions(val: Array<option>): option | Array<option> {
        return this.multiple ? val : val[0]
    }

    @Emit('selectedOption')
    onSelectOption(option: option): option | Array<option> {
        if (!this.multiple) {
            this.selectedOptions = []
            this.selectedOptions.push(option)
        } else {
            if (!this.selectedOptions.includes(option)) {
                this.selectedOptions.push(option)
            }
        }

        return this.multiple ? this.selectedOptions : this.selectedOptions[0]
    }

    onPopOption(option: option): void {
        this.selectedOptions = this.selectedOptions.filter(value => value.value !== option.value)
    }

    onShow(): void {
        this.showBody = true
    }

    onClickOutside(): void {
        this.showBody = false
    }

    created(): void {
        addEventListener('click', this.onClickOutside)
    }

    beforeDestroy(): void {
        removeEventListener('click', this.onClickOutside)
    }

    @Watch('selected', {immediate: true})
    watchSelected(option: option | undefined): void {
        if (option) {
            this.selectedOptions = []
            this.selectedOptions.push(option)
        }
    }
}
</script>

<style scoped lang="stylus">
@import "~@/stylus/colors.styl"
@import "~@/stylus/mixins.styl"

.select
    position relative
    max-width 200px
    width 100%

    &__head
        border lightgray solid 1px
        height 25px
        padding 5px
        display flex
        transition border ease-out .1s
        cursor pointer
        overflow hidden

        &_active
            cursor default
            border mainColorLight 1px solid


    &__option
        font-size 14px
        display flex
        align-items center
        padding 1px 2px
        cursor pointer
        transition color ease-out .2s

        &_multiple
            margin-right 5px
            background-color mainColorLight
            border mainColor solid 1px
            cursor default

        &_body
            font-size 17px
            padding 5px 5px 10px 5px
            border-bottom lightgray solid 1px
            margin 5px 0

            &:hover
                color mainColor

            &:last-child
                padding 5px 5px
                border-bottom unset

        &_selected
            color gray
            cursor not-allowed

            &:hover
                color gray

    &__body
        position absolute
        z-index 1
        background-color white
        width 94%
        border lightgray solid 1px
        padding 5px
        margin-top 5px
        box-shadow getColorWithOpacity(lightgray, .6) 3px 3px 7px


.multiple-option
    &__body
        display flex

    &__text
        position relative
        padding-right 15px
        white-space nowrap

    &__cross
        position absolute
        right 0
        top 0

</style>
