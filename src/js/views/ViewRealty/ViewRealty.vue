<template>
    <div class="view-object">
        <Modal
            :show="isShowRentModal"
            @close="isShowRentModal = false"
        >
            <h3 slot="header">Ваша заявка</h3>
            <form action="" slot="content" class="form">
                <div class="row form__row form__row_no-margin-sm">
                    <div class="form__group col-6 col-12-sm">
                        <label for="fio" class="form__label">ФИО</label>
                        <input type="text" id="fio" class="form__control">
                    </div>
                    <div class="form__group col-6 col-12-sm">
                        <label for="phone" class="form__label">Номер телефона</label>
                        <input type="tel" id="phone" class="form__control">
                    </div>
                </div>
                <div class="form__group">
                    <label for="email" class="form__label">Email</label>
                    <input type="email" id="email" class="form__control">
                </div>
                <div class="form__group">
                    <label for="message" class="form__label">Сообщение</label>
                    <textarea id="message" class="form__control" rows="4"></textarea>
                </div>
            </form>
            <button class="btn btn_primary btn_sm" slot="btn-ok">Отправить</button>
        </Modal>
        <div class="container">
            <nav class="view-object__nav nav">
                <ul class="nav__list">
                    <li class="nav_item">
                        <router-link :to="{name: 'home'}" class="nav__link link">Главная</router-link>
                    </li>
                    <li class="nav_item"><span class="nav__divider">-</span></li>
                    <li class="nav_item"><router-link :to="{name: 'catalog', query: $store.getters['queryParams/queryParams'] || {}}" class="nav__link link">Каталог</router-link></li>
                    <li class="nav_item"><span class="nav__divider">-</span></li>
                    <li class="nav_item"><a class="nav__link link link_disabled">Название</a></li>
                </ul>
            </nav>
            <div v-if="viewRealty" class="view-object__content">
                <div class="view-object__col">
                    <Slider
                        :images="viewRealty.images"
                    />
                </div>
                <div class="view-object__col view-object__object-info object-info">
                    <h1 class="object-info__name">{{ viewRealty.name }}</h1>
                    <ul class="object-info__parameters parameters fw-600">
                        <li class="parameters__item">
                            <span class="parameters__name">Хозяйственное назначение</span>:<span class="parameters__value">Офисы</span>
                        </li>
                        <li class="parameters__item"><span class="parameters__name">Площадь</span>:<span
                            class="parameters__value">{{ viewRealty.area }} кв. м.</span></li>
                        <li class="parameters__item">
                            <span class="parameters__name">Цена: </span><span class="parameters__value">{{
                                viewRealty.price
                            }}</span>
                        </li>
                        <li class="parameters__item">
                            <span class="parameters__name"></span>До 30.12.2020<span class="parameters__value"></span>
                        </li>
                    </ul>
                    <p class="object-info__description fw-600">{{ viewRealty.description }}</p>
                </div>
            </div>
            <div class="view-object__btn-wrapper">
                <button class="btn btn_primary btn_sm" @click="openRentModal">Арендовать</button>
            </div>
            <div class="view-object__offers offers">
                <h2 class="offers__title">Интересные предложения</h2>
                <div class="offers__body">
                    <Object
                        class="offers__object"
                        v-if="realtys.length"
                        v-for="(object, index) in realtys"
                        :key="index"
                        :area="object.area"
                        :title="object.name"
                        :price="object.price"
                        :img-path="object.img_path"

                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import Slider from "./Slider.vue";
import Object from "@/js/components/Realty.vue";
import imgTown from '@/assets/img/town.png'
import Modal from "@/js/components/widgets/Modal.vue";
import Realty from "@/js/api/Realty";


@Component({
    components: {Modal, Object, Slider},
    data: () => ({
        imgTown
    })
})
export default class ViewObject extends Vue {
    realtys: Array<Realty> = []
    viewRealty: Realty | false = false
    isShowRentModal = false

    created(): void {
        Realty.getList().then(({ data }) => {
            this.realtys = data.slice(0, 3)
        })
        Realty.get().then(({ data }) => {
            this.viewRealty = data
        })
    }

    openRentModal(): void {
        this.isShowRentModal = true
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
        margin-bottom 40px
        @media (max-width 1000px)
            margin-bottom 0
            flex-direction column

    &__col
        flex 1 1 50%
        @media (max-width 1000px)
            flex 1 1 100%

    &__btn-wrapper
        display flex
        justify-content center
        margin-bottom 100px

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
        grid-gap 30px
        @media (max-width 1000px)
            grid-template-columns 1fr 1fr
        @media (max-width 650px)
            grid-template-columns 1fr

    &__object
        width 100%
</style>
