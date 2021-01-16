<template>
    <div class="catalog">
        <div class="container">
            <div class="catalog__titles text-center">
                <h1 class="catalog__title">Аренда офисов в Севастополе от собственника Технопарк "Маяк"</h1>
                <h2 class="catalog__subtitle text-main-color">При условии внесения предоплаты предоставляется
                    дополнительная скидка!</h2>
                <p>Настройте параметры поиска по желаемым результатам и изучайте каталог предложений с фотографиями.
                    Меняйте стоимость, метраж, планировку, назначение и другие параметры – находите самое лучшее
                    помещение!
                    Кроме того, вы можете воспользоваться услугой «онлайн-консультант» или позвонить по телефону:
                    <a href="tel:+7(978)734-58-55" class="link">+7(978)734-58-55</a>
                </p>
            </div>
            <div class="flex-wrapper flex-wrapper_J-SB">
                <Select
                    multiple
                    :options="realtyTypes"
                    @changedOption="onChangeOption"
                />
                <Range
                    :min="0"
                    :max="1000"
                >
                    <template v-slot:info="{currentMin, currentMax}">
                        {{ currentMin }}Р | {{ currentMax }}Р
                    </template>
                </Range>
            </div>
                <transition-group class="catalog__objects" tag="div" name="realty" :css="false" @before-enter="beforeEnter" @enter="onEnter" @leave="onLeave">
                    <Realty
                        class="realty"
                        v-if="realty.length"
                        v-for="(object, index) in realty"
                        :key="index + object.id"
                        :area="object.area"
                        :title="object.name"
                        :price="object.price"
                        :img-path="object.img_path"
                        :data-index="index"
                    />
                </transition-group>
            <Pagination class="catalog__paginate"/>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Realty from "@/js/components/Realty.vue";
import Realty_ from "@/js/api/Realty";
import RealtyType from "@/js/api/RealtyType";
import imgTown from "@/assets/img/town.png";
import Pagination from "@/js/components/widgets/Paginate.vue";
import Select from "@/js/components/ui/Select.vue";
import {option} from "@/js/common/types";
import $ from "jquery";
import Range from "@/js/components/ui/Range.vue";

@Component({
    components: {Range, Select, Pagination, Realty},
    data: () => ({
        imgTown
    }),
    metaInfo: {
        title: 'Аренда помещений Севастополь',
    }
})
export default class Catalog extends Vue {
    realty: Array<Realty_> = []
    realtyTypes: Array<option> = []
    realtyLength = 0

    created(): void {
        Realty_.getList().then(({data}) => {
            this.realty = data
        })
        RealtyType.getList().then(({data}) => {
            this.realtyTypes = data.map(value => ({value: value.id, label: value.name} as option))
            this.realtyLength = this.realtyTypes.length
            setTimeout(() => {
                this.realty = []
            }, 3000)
        })
    }

    beforeEnter(el: HTMLElement): void {
        $(el).css('opacity', 0)
    }

    onEnter(el: HTMLElement, done: () => void): void {
        if (el) {
            let delay = Number(el.dataset.index) * 150

            setTimeout(() => {
                $(el).animate({
                    opacity: 1
                }, "fast", done)
            }, delay)
        }
    }

    onLeave(el: HTMLElement, done: () => void): void {
        if (el) {
            let delay = (this.realtyLength - Number(el.dataset.index)) * 100

            setTimeout(() => {
                $(el).animate({
                    opacity: 0
                }, "fast", done)
            }, delay)
        }
    }

    onChangeOption(option: option | Array<option>): void {
        console.log(option)
    }
}
</script>

<style scoped lang="stylus">
.catalog
    margin-top 40px
    margin-bottom 75px

    &__titles
        margin-bottom 57px

    &__title
        font-size 28px
        margin-bottom 12px

    &__subtitle
        font-size 19px
        margin-bottom 18px

    &__text
        font-size 19px

    &__objects
        display grid
        grid-template-columns 1fr 1fr 1fr
        margin-bottom 60px
        grid-gap 35px

        @media (max-width 1000px)
            grid-template-columns 1fr 1fr
        @media (max-width 650px)
            grid-template-columns 1fr

        & .object
            margin 15px auto
            width 100%

            & .object__img
                padding 0 0 54% 0

    &__paginate
        margin-bottom 70px

.realty

    &-enter-active, &-leave-active
        transition opacity linear .5s

    &-enter-to, &-leave
        opacity 1

    &-enter, &-leave-to
        opacity 0
</style>
