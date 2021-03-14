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
                    <li class="nav_item"><router-link :to="{name: 'catalog', query: { filters: $store.getters['queryParams/getString'] } || {}}" class="nav__link link">Каталог</router-link></li>
                    <li class="nav_item"><span class="nav__divider">-</span></li>
                    <li class="nav_item"><a class="nav__link link link_disabled">{{ viewRealty.name }}</a></li>
                </ul>
            </nav>
            <div v-if="viewRealty" class="view-object__content">
                <div class="view-object__col">
                    <Slider
                        :images="viewRealty.photo"
                    />
                </div>
                <div class="view-object__col view-object__object-info object-info">
                    <h1 class="object-info__name">{{ viewRealty.name }}</h1>
                    <ul class="object-info__parameters parameters fw-600">
                        <li class="parameters__item">
                            <span class="parameters__name">Хозяйственное назначение</span>:<span class="parameters__value">{{ viewRealty.realtyTypeName }}</span>
                        </li>
                        <li class="parameters__item">
                          <span class="parameters__name">Площадь</span>:
                          <span class="parameters__value">{{ viewRealty.area }} кв. м.</span>
                        </li>
                        <li class="parameters__item">
                          <span class="parameters__name">Цена за м. кв.</span>:
                          <span class="parameters__value">{{ viewRealty.price_per_metr }} руб.</span>
                        </li>
                        <li class="parameters__item">
                            <span class="parameters__name">Цена: </span><span class="parameters__value">{{
                                viewRealty.price
                            }} руб.</span>
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
                        v-if="realities.length"
                        v-for="(object, index) in realities"
                        :key="index"
                        :area="object.area"
                        :title="object.name"
                        :price="object.price"
                        :img-path="object.img_path"
                        :id="object.id"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import Slider from "./Slider.vue";
import Object from "@/js/components/RealtyCard.vue";
import Modal from "@/js/components/widgets/Modal.vue";
import Realty from "@/js/models/Realty";


@Component({
  data: () => ({
    metaDesc: '',
    metaRealtyTypeName: '',
    metaKeyWords: '',
  }),

  components: {Modal, Object, Slider},

  metaInfo() {
    return {
      // @ts-ignore
      title: `Аренда ${this.metaRealtyTypeName}`,
      meta: [
        {
          vmid: 'description',
          name: 'description',
          // @ts-ignore
          content: `${this.metaDesc}`,
        },
        {
          vmid: 'keywords',
          name: 'keywords',
          // @ts-ignore
          content: `аренда, недвижимость, севастополь, аренда помещений, аренда недвижимости, помещения, коммерческая недвижимость${this.metaKeyWords}`,
        }
      ]
    }
  },

})
export default class ViewObject extends Vue {
    realities: Array<Realty> = []
    viewRealty: Realty | false = false
    isShowRentModal = false
  metaDesc!: string
  metaRealtyTypeName!: string

  metaKeyWords!: string

  created(): void {
        Realty.getList().then(({ data }) => {
            this.realities = data.data.slice(0, 3)
        })
        Realty.get({ id: this.$route.params.id as unknown as number }).then(({ data }) => {
            this.viewRealty = data
          this.metaDesc = data.description as string
          this.metaRealtyTypeName = (data.realtyTypeName as string || '').toLocaleLowerCase()
          this.metaKeyWords = this.makeKeywords()
        })
    }

  makeKeywords(): string {
    const keywords = [
        'аренда ' + this.metaRealtyTypeName,
        (this.viewRealty as Realty).heating !== 0 ? 'отопление' : '',
        (this.viewRealty as Realty).restroom !== 0 ? 'отдельный санузел' : '',
        (this.viewRealty as Realty).energy !== 0 ? 'индивидуальный узел учёта электроэнергии' : '',
        (this.viewRealty as Realty).access !== 0 ? 'круглосуточный доступ' : '',
        (this.viewRealty as Realty).furniture !== 0 ? 'мебелью укомплектован' : '',
    ].filter(value => value !== '')

      return keywords.length !== 0 ? ', ' + keywords.join(', ') : ''
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
