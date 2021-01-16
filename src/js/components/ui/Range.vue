<template>
    <div class="range" ref="range">
        <button class="range__btn range__btn_left" ref="range-btn-left"></button>
        <div class="range__info" ref="range-info">
            <div class="range__info-body">
                <div class="range__info-text">
                    <slot name="info" :currentMin="currentMin" :currentMax="currentMax">
                        {{ currentMin }} | {{ currentMax }}
                    </slot>
                </div>
            </div>
        </div>
        <div class="range__track" ref="range-track">
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
import {mapGetters} from "vuex";


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

    @Ref('range-info')
    rangeInfo!: HTMLElement

    $btnLeft = $(this.btnLeft)
    $btnRight = $(this.btnRight)
    $range = $(this.range)
    $trackRight = $(this.trackRight)
    $trackMiddle = $(this.trackMiddle)
    $trackLeft = $(this.trackLeft)
    $rangeInfo = $(this.rangeInfo)
    $windowWidth!: number

    maxLeftPos = 0
    maxRightPos = 0
    startPos = 0
    blocked = false
    currentPosRight = 0
    currentPosLeft = 0
    width = 0
    middleTrackWidth = 0
    currentMax = 0
    currentMin = 0

    @Emit('onChangedRange')
    changedRange(): {max: number, min: number, currentMax: number, currentMin: number} {
        const {min, max, currentMax, currentMin} = this;

        return {min, max, currentMax, currentMin}
    }

    @Watch('$windowWidth')
    watchWindowWidth(): void {
        this.updateInfoPosition()
    }

    @Watch('currentPosRight')
    watchCurrentPosRight(val: number): void {
        this.$trackRight.css('width', `${Math.floor((val * 100) / this.width)}%`)
        this.setWidthMiddleTrack()
        this.updateInfoPosition()
    }

    @Watch('currentPosLeft')
    watchCurrentPosLeft(val: number): void {
        this.$trackLeft.css('width', `${Math.floor((val * 100) / this.width)}%`)
        this.setWidthMiddleTrack()
        this.updateInfoPosition()
    }

    @Watch('middleTrackWidth')
    watchMiddleTrackWidth(): void {
        let leftP = 100 * (this.$trackLeft.width() as number) / this.width
        let left = leftP / 100
        let rightP = 100 * (this.$trackRight.width() as number) / this.width
        let right = rightP / 100

        this.currentMax = right > .01 ? Math.round(this.max - this.max * right ) : this.max
        this.currentMin = left > .01 ? Math.round(this.max * left) : this.min
    }


    setWidthMiddleTrack(): void {
        let width = (this.width / 2) - this.currentPosLeft + (this.width / 2) - this.currentPosRight
        this.$trackMiddle.css('width', `${Math.ceil((width * 100) / this.width)}%`)
    }

    updateInfoPosition(): void {
        this.middleTrackWidth = this.$trackMiddle.width() as number;
        let pos = ((this.width - this.currentPosRight) - this.middleTrackWidth / 2) - (this.$rangeInfo.width() as number / 2)
        this.$rangeInfo.css('left', pos)

    }

    onMouseMovBtnRight(event: TouchEvent | MouseEvent): void {
        let pos;
        event.stopPropagation()

        if (event.type === 'mousemove') {
            // @ts-ignore
            pos = this.maxRightPos - event.clientX
        } else {
            // @ts-ignore
            pos = this.maxRightPos - (event.changedTouches[0].clientX as number)
        }


        if (0 < pos && pos < this.width && this.currentPosLeft < (this.width - pos) ) {
            this.currentPosRight = pos

            this.$btnRight.css('right', pos - ((this.$btnRight.width() as number) / 2))
        }
    }

    onMouseMovBtnLeft(event: TouchEvent | MouseEvent): void {
        let pos;
        event.stopPropagation()

        if (event.type === 'mousemove') {
            // @ts-ignore
            pos = this.maxLeftPos - event.clientX
        } else {
            // @ts-ignore
            pos = this.maxLeftPos - (event.changedTouches[0].clientX as number)
        }

        pos = -pos

        if (0 < pos && pos < this.width && pos < (this.width - this.currentPosRight)) {
            this.currentPosLeft = pos

            this.$btnLeft.css('left', pos - ((this.$btnLeft.width() as number) / 2))
        }
    }

    mounted(): void {
        this.$nextTick(() => {
            this.$btnRight = $(this.btnRight)
            this.$btnLeft = $(this.btnLeft)
            this.maxRightPos = ($(this.range).offset()?.left as number) + ($(this.range).innerWidth() as number)
            this.maxLeftPos = ($(this.range).offset()?.left as number)
            this.startPos = this.maxRightPos
            this.$range = $(this.range)
            this.$trackRight = $(this.trackRight)
            this.$trackLeft = $(this.trackLeft)
            this.$trackMiddle = $(this.trackMiddle)
            this.$rangeInfo = $(this.rangeInfo)
            this.width = this.$range.width() as number

            this.$btnRight.on('mousedown', this.onMouseMoveStartedRightBtn);
            this.$btnRight.on('touchstart', this.onMouseMoveStartedRightBtn);
            this.$btnLeft.on('mousedown', this.onMouseMoveStartedLeftBtn);
            this.$btnLeft.on('touchstart', this.onMouseMoveStartedLeftBtn);
            $(document).on('touchend', this.onMouseUp);
            $(document).on('mouseup', this.onMouseUp);

            this.updateInfoPosition()
        })
    }

    onMouseUp(): void {
        // @ts-ignore
        $(document).off('mousemove', this.onMouseMovBtnLeft)
        // @ts-ignore
        $(document).off('touchmove', this.onMouseMovBtnLeft)
        // @ts-ignore
        $(document).off('mousemove', this.onMouseMovBtnRight)
        // @ts-ignore
        $(document).off('touchmove', this.onMouseMovBtnRight)
    }
    onMouseMoveStartedLeftBtn (): void {
        // @ts-ignore
        $(document).on('mousemove', this.onMouseMovBtnLeft)
        // @ts-ignore
        $(document).on('touchmove', this.onMouseMovBtnLeft)
    }
    onMouseMoveStartedRightBtn (): void {
        // @ts-ignore
        $(document).on('mousemove', this.onMouseMovBtnRight)
        // @ts-ignore
        $(document).on('touchmove', this.onMouseMovBtnRight)
    }
    beforeDestroy(): void {
        $(document).off('mouseup', this.onMouseUp)
        // @ts-ignore
        $(document).off('touchend', this.onMouseUp)
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

    &__info
        position absolute
        background-color gray
        color white
        top -400%
        white-space nowrap

        &-body
            padding 5px 10px

        &-text
            position relative
            width 100%

            &:after
                position absolute
                content ''
                border: 5px solid transparent;
                border-top: 5px solid gray;
                left calc(50% - 5px)
                bottom -15px

    &__track
        z-index 1
        position relative
        width 100%
        height 100%
        display flex

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
