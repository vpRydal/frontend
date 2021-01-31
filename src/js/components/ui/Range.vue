<template>
    <div class="range" ref="range">
        <button class="range__btn range__btn_left" ref="range-btn-left"></button>
        <div class="range__info" ref="range-info">
            <div class="range__info-body">
                <div class="range__info-text">
                    <slot name="info" :currentMin="value.min" :currentMax="value.max">
                        {{ value.min }} | {{ value.max }}
                    </slot>
                </div>
            </div>
        </div>
        <span class="range__info-arrow" ref="range-info-arrow"></span>
        <div class="range__track" ref="range-track" @click="onTrackClick">
            <div class="range__track-left-part" ref="range-track-left"></div>
            <div class="range__track-middle-part" ref="range-track-middle"></div>
            <div class="range__track-right-part" ref="range-track-right"></div>
        </div>
        <button class="range__btn range__btn_right" ref="range-btn-right"></button>
    </div>
</template>

<script lang="ts">
import {Component, Emit, Prop, Ref, Vue, Watch} from "vue-property-decorator";
import $ from "jquery";
import JQuery from "jquery";
import {mapGetters} from "vuex";
import bus from "@/js/common/bus";
import {minMax} from "@/js/common/types";


@Component({
    computed: {
        ...mapGetters('common', {
            $windowWidth: 'windowWidth'
        })
    }
})
export default class Range extends Vue {
    @Prop({
        required: true,
        type: Number
    })
    min!: number

    @Prop({
        required: true,
        type: Number
    })
    max!: number
    @Prop({
        required: false,
        type: Object
    })
    value!: {min: number, max: number}


    @Ref('range-btn-left')
    btnLeft!: HTMLElement

    @Ref('range-btn-right')
    btnRight!: HTMLElement

    @Ref('range')
    range!: HTMLElement

    @Ref('range-track-right')
    trackRight!: HTMLElement

    @Ref('range-track-middle')
    trackMiddle!: HTMLElement

    @Ref('range-track-left')
    trackLeft!: HTMLElement

    @Ref('range-track')
    trackMain!: HTMLElement

    @Ref('range-info')
    rangeInfo!: HTMLElement
    @Ref('range-info-arrow')
    rangeInfoArrow!: HTMLElement

    $btnLeft!: JQuery<HTMLElement>
    $btnRight!: JQuery<HTMLElement>
    $range!: JQuery<HTMLElement>
    $trackRight!: JQuery<HTMLElement>
    $trackMiddle!: JQuery<HTMLElement>
    $trackLeft!: JQuery<HTMLElement>
    $trackMain!: JQuery<HTMLElement>
    $rangeInfo!: JQuery<HTMLElement>
    $rangeInfoArrow!: JQuery<HTMLElement>

    $windowWidth!: number
    maxLeftPos = 0
    maxRightPos = 0
    currentPosRight = 0
    currentPosLeft = 0
    width = 0
    middleTrackWidth = 0
    rangeInfoWidth = 0
    btnLeftWidth = 0
    btnRightWidth = 0

    @Emit('input')
    changed(min: number, max: number): minMax {
        return {min, max}
    }

    @Watch('$windowWidth')
    watchWindowWidth(): void {
        this.updateInfoPosition()
    }

    @Watch('value')
    watchValue(): void {
        this.moveBtnRight(((this.max - this.value.max) / (this.max - this.min)) * this.width)
        this.moveBtnLeft(((this.value.min - this.min) / (this.max - this.min)) * this.width)
    }

    @Watch('currentPosRight')
    watchCurrentPosRight(): void {
        this.$trackRight.css('width', `${Math.floor((this.currentPosRight * 100) / this.width)}%`)
        this.setWidthMiddleTrack()
        this.updateInfoPosition()
    }

    @Watch('currentPosLeft')
    watchCurrentPosLeft(): void {
        this.$trackLeft.css('width', `${Math.floor((this.currentPosLeft * 100) / this.width)}%`)
        this.setWidthMiddleTrack()
        this.updateInfoPosition()
    }

    @Watch('middleTrackWidth')
    watchMiddleTrackWidth(): void {
        let leftP = (this.$trackLeft.width() as number) / this.width
        let rightP = (this.$trackRight.width() as number) / this.width
        let min = Math.ceil(leftP * (this.max - this.min)) + this.min
        let max = (this.max) - Math.ceil(rightP * (this.max - this.min) )

        this.changed(min, max)
    }


    setWidthMiddleTrack(): void {
        let width = (this.width / 2) - this.currentPosLeft + (this.width / 2) - this.currentPosRight
        this.$trackMiddle.css('width', `${Math.ceil((width * 100) / this.width)}%`)
        this.middleTrackWidth = this.$trackMiddle.width() as number
    }

    updateInfoPosition(): void {
        this.middleTrackWidth = this.$trackMiddle.width() as number;
        let pos = ((this.width - this.currentPosRight) - this.middleTrackWidth / 2) - (this.$rangeInfo.width() as number / 2)

        const rangeInfoWidth = this.$rangeInfo.width() as number


        if (0 >= pos) {
            this.$rangeInfo.css('left', 0)
            this.$rangeInfo.css('right', '')
            this.$rangeInfoArrow.css('left', pos + (rangeInfoWidth / 2) - 5)
        } else if (this.width + this.btnRightWidth <= pos + rangeInfoWidth) {
            this.$rangeInfo.css('right', 0)
            this.$rangeInfo.css('left', '')

            this.$rangeInfoArrow.css('left', pos + (rangeInfoWidth / 2) - 5)
        } else {
            this.$rangeInfo.css('right', '')
            this.$rangeInfo.css('left', '')

            this.$rangeInfo.css('left', pos)
            this.$rangeInfoArrow.css('left', pos + (rangeInfoWidth / 2) - 5)
        }
    }

    onTrackClick (event: MouseEvent): void {
        let pos: number = event.x - (this.$trackMain.offset()?.left as number)
        let widthHalf: number = this.width / 2

        if (pos < widthHalf) {
            this.moveBtnLeft(pos)
        }

        if (pos >= widthHalf) {
            this.moveBtnRight(this.width - pos)
        }
    }

    onMouseMoveBtnRight(event: TouchEvent | MouseEvent): void {
        let pos;

        event.stopPropagation()

        if (event.type === 'mousemove') {
            // @ts-ignore
            pos = this.maxRightPos - event.clientX
        } else {
            // @ts-ignore
            pos = this.maxRightPos - (event.changedTouches[0].clientX as number)
        }

        this.moveBtnRight(pos)
    }
    moveBtnRight(pos: number): void {
        if (0 < pos && pos < this.width && this.currentPosLeft < (this.width - pos)) {
            this.currentPosRight = pos

            this.$btnRight.css('right', pos - (this.btnRightWidth))
        }
    }
    onMouseMoveBtnLeft(event: TouchEvent | MouseEvent): void {
        let pos;

        event.stopPropagation()

        if (event.type === 'mousemove') {
            // @ts-ignore
            pos = this.maxLeftPos - event.clientX
        } else {
            // @ts-ignore
            pos = this.maxLeftPos - (event.changedTouches[0].clientX as number)
        }

        this.moveBtnLeft(-pos)
    }
    moveBtnLeft(pos: number): void {

        if (0 < pos && pos < this.width && pos < (this.width - this.currentPosRight)) {
            this.currentPosLeft = pos

            this.$btnLeft.css('left', pos - (this.btnLeftWidth / 2))
        }
    }

    mounted(): void {
        this.$nextTick(() => {
            this.$btnRight = $(this.btnRight)
            this.$btnLeft = $(this.btnLeft)
            this.maxRightPos = ($(this.range).offset()?.left as number) + ($(this.range).innerWidth() as number)
            this.maxLeftPos = ($(this.range).offset()?.left as number)
            this.$range = $(this.range)
            this.$trackRight = $(this.trackRight)
            this.$trackLeft = $(this.trackLeft)
            this.$trackMiddle = $(this.trackMiddle)
            this.$rangeInfo = $(this.rangeInfo)
            this.$trackMain = $(this.trackMain)
            this.$rangeInfoArrow = $(this.rangeInfoArrow)
            this.width = this.$range.width() as number
            this.rangeInfoWidth = this.$rangeInfo.width() as number
            this.btnRightWidth = this.$btnRight.width() as number
            this.btnLeftWidth = this.$btnLeft.width() as number

            this.$btnRight.on('mousedown', this.onMouseMoveStartedRightBtn);
            this.$btnRight.on('touchstart', this.onMouseMoveStartedRightBtn);
            this.$btnLeft.on('mousedown', this.onMouseMoveStartedLeftBtn);
            this.$btnLeft.on('touchstart', this.onMouseMoveStartedLeftBtn);
            $(document).on('touchend', this.onMouseUp);
            $(document).on('mouseup', this.onMouseUp);

            addEventListener('resize', this.onResize)
            bus.$on('update-range', this.onResize)

            this.middleTrackWidth = this.width
            this.$nextTick(() => {
                this.watchCurrentPosLeft()
            })
        })
    }

    onResize(): void {
        this.maxRightPos = ($(this.range).offset()?.left as number) + ($(this.range).innerWidth() as number)
        this.maxLeftPos = ($(this.range).offset()?.left as number)
    }

    onMouseUp(): void {
        // @ts-ignore
        $(document).off('mousemove', this.onMouseMoveBtnLeft)
        // @ts-ignore
        $(document).off('touchmove', this.onMouseMoveBtnLeft)
        // @ts-ignore
        $(document).off('mousemove', this.onMouseMoveBtnRight)
        // @ts-ignore
        $(document).off('touchmove', this.onMouseMoveBtnRight)
    }

    onMouseMoveStartedLeftBtn(): void {
        // @ts-ignore
        $(document).on('mousemove', this.onMouseMoveBtnLeft)
        // @ts-ignore
        $(document).on('touchmove', this.onMouseMoveBtnLeft)
    }

    onMouseMoveStartedRightBtn(): void {
        // @ts-ignore
        $(document).on('mousemove', this.onMouseMoveBtnRight)
        // @ts-ignore
        $(document).on('touchmove', this.onMouseMoveBtnRight)
    }

    beforeDestroy(): void {
        $(document).off('mouseup', this.onMouseUp)
        // @ts-ignore
        $(document).off('touchend', this.onMouseUp)
        removeEventListener('resize', this.onResize)
        bus.$off('update-range', this.onResize)
    }
}

</script>

<style scoped lang="stylus">
@import "~@/stylus/colors.styl"
@import "~@/stylus/mixins.styl"

.range
    position relative
    max-width 200px
    width 100%
    height 10px
    background-color getColorWithOpacity(gray, .4)
    border-radius 50px
    margin 0 10px

    &__info
        position absolute
        background-color gray
        color white
        top -400%
        white-space nowrap

        &-arrow
            position absolute
            content ''
            display block
            border: 5px solid transparent;
            border-top: 5px solid gray;
            bottom 7px

        &-body
            padding 5px 10px

        &-text
            position relative
            width 100%

    &__track
        z-index 1
        position relative
        width 100%
        height 100%
        display flex
        cursor pointer

        &-middle-part
            background-color mainColor
            height 100%
            width 100%

        &-right-part, &-left-part
            height 100%

    &__btn
        position absolute
        width 20px
        height 20px
        border-radius 50%
        background-color mainColor
        border 1px solid white
        top -5px
        z-index 2

        &_left
            left -10px

        &_right
            right -10px
</style>
