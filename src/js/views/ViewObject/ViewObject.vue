<template>
    <div class="view-object">
        <div class="container">
            <nav class="view-object__nav nav">
                <ul class="nav__list">
                    <li class="nav_item"><router-link :to="{name: 'home'}" class="nav__link link">Главная</router-link></li>
                    <li class="nav_item"><span class="nav__divider">-</span></li>
                    <li class="nav_item"><a href="" class="nav__link link">Тип</a></li>
                    <li class="nav_item"><span class="nav__divider">-</span></li>
                    <li class="nav_item"><a href="" class="nav__link link">Название</a></li>
                </ul>
            </nav>
            <div class="view-object__content">
                <div class="view-object__col">
                    <Slider/>
                </div>
                <div class="view-object__col view-object__object-info object-info">
                    <h1 class="object-info__name">{{ name }}</h1>
                    <ul class="object-info__parameters parameters fw-600">
                        <li class="parameters__item"><span class="parameters__name">Хозяйственное назначение</span>:<span class="parameters__value">Офисы</span></li>
                        <li class="parameters__item"><span class="parameters__name">Площадь</span>:<span class="parameters__value">19.80 кв. м.</span></li>
                        <li class="parameters__item"><span class="parameters__name"></span>Цена<span class="parameters__value">:</span></li>
                        <li class="parameters__item"><span class="parameters__name"></span>До 30.12.2020<span class="parameters__value"></span></li>
                    </ul>
                    <p class="object-info__description fw-600">{{ description }}</p>
                </div>
            </div>
            <div class="view-object__offers offers">
                <h2 class="offers__title">Интересные предложения</h2>
                <div class="offers__body">
                    <Object class="offers__object" area="32.5" title="Нежилое помещение" price="550" :img-path="imgTown"/>
                    <Object class="offers__object" area="32.5" title="Нежилое помещение" price="550" :img-path="imgTown"/>
                    <Object class="offers__object" area="32.5" title="Нежилое помещение" price="550" :img-path="imgTown"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import Slider from "./Slider";
import Object from "@/js/components/Object.vue";
import imgTown from '@/assets/img/town.png'


@Component({
    components: {Object, Slider},
    data: () => ({
        imgTown
    })
})
export default class ViewObject extends Vue {
    name: string
    description: string


    constructor() {
        super();
        this.name = 'Офисное помещение'
        this.description = 'Офисное помещение общей площадью 19,8 м2 расположено на 2-м этаже 3-х-этажного офисного здания. В помещении установлен с/у площадью 2,6 м2. Также установлен кондиционер зима-лето. Отдельный узел учёта электроэнергии. Возможно подключение интернета и IP-телефонии. Круглосуточный доступ. Охраняемая территория, видео наблюдение.'
    }
}
</script>

<style scoped lang="stylus">
@import "~@/stylus/colors.styl"
.view-object
    &__nav
        margin-bottom 40px
    &__content
        display flex
        margin-bottom 100px
        @media (max-width 1000px)
            flex-direction column
    &__col
        flex 1 1 50%
        @media (max-width 1000px)
            flex 1 1 100%
.nav
    color mainColor
    &__list
        display flex
    &__divider
        margin 0 5px

.object-info
    padding-top 55px
    &__name
        margin-bottom 30px
        font-size 30px
    &__description
        font-size 18px
        margin-bottom 60px
    &__parameters
        margin-bottom 25px

.parameters
    &__item
        margin-bottom 20px
        &:last-child
            margin-bottom 0
    &__value
        margin-left 10px

.offers
    &__title
        font-size 30px
        margin-bottom 31px
    &__body
        margin-bottom 90px
        display grid
        grid-template-columns 1fr 1fr 1fr
        @media (max-width 1200px)
            grid-template-columns 1fr 1fr
        @media (max-width 800px)
            grid-template-columns 1fr

    &__object
        margin 15px auto
        width 371px
        @media (max-width 800px)
            width 80%
</style>