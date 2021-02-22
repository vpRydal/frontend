<template>
  <div :id="balloonId">
    <RealtyCard2
        :description="description"
        :name="name"
        :area="area"
        :id="id"
        :img-path="imgPath"
        :price="price"
    />
  </div>

</template>

<script lang="ts">
import $ from 'jquery'
import {Component, Prop, Ref, Vue} from 'vue-property-decorator'
import bus from "@/js/common/bus";
import RealtyCard2 from "@/js/components/RealtyCard2.vue";

@Component({
  components: {RealtyCard2}
})
export default class Balloon extends Vue {
    @Ref('balloon')
    refBalloon!: HTMLElement
    @Prop({ required: true })
    imgPath!: string
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
</style>
