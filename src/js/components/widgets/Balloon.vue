<template>
    <div class="balloon" ref="balloon" :id="balloonId">
        <img class="balloon__img" :src="img_path" alt="">
        <h3 class="balloon__name">{{ name }}</h3>
        <span class="balloon__area">Площадь {{ area }} м2</span>
        <p class="balloon__desc">{{ descriptionValue }}</p>
        <div class="balloon__footer">
            <span></span>
            <div class="balloon__price-wrapper">
                <span class="balloon__price">р {{ price }} м2</span>
            </div>
            <button class="btn btn_primary btn_sm balloon__btn">
                Подробнее
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import $ from 'jquery'
import {Component, Prop, Ref, Vue} from 'vue-property-decorator'
import bus from "@/js/common/bus";

@Component({})
export default class Balloon extends Vue {
    @Ref('balloon')
    refBalloon!: HTMLElement
    @Prop({ required: true })
    img_path!: string
    @Prop({ required: true })
    name!: string
    @Prop({ required: true })
    area!: number
    @Prop({ required: true })
    description!: string
    @Prop({ required: true })
    price!: number
    @Prop({ required: true })
    id!: number

    get balloonId (): string {
        return `yandex-map-balloon-${ this.id }`
    }

    get descriptionValue (): string {
        return this.description.slice(0, 165) + '...'
    }

    onClick (): void {
        this.$router.push({name: 'viewRealty', params: {category: 'category-name', id: this.id + ''}})
    }
    onOpenBalloon (): void {
        $(`ymaps #${ this.balloonId }`).find('button').on('click', this.onClick)
    }
    onCloseBalloon (): void {
        $(`ymaps #${ this.balloonId }`).find('button').off('click', this.onClick)
    }

    mounted (): void {
        bus.$on('yandex-map::open-balloon-' + this.id, this.onOpenBalloon)
        bus.$on('yandex-map::close-balloon-' + this.id, this.onCloseBalloon)
    }

    beforeDestroy (): void {
        bus.$off('yandex-map::open-balloon-' + this.id, this.onOpenBalloon)
        bus.$off('yandex-map::close-balloon-' + this.id, this.onCloseBalloon)
    }
}
</script>

<style scoped lang="stylus">
@import "~@/stylus/blocks/yandex-map-balloon.styl"
</style>
