<template>
    <div class="view-object">
        <Modal
            :show="isShowRentModal"
            @close="onClose"
        >
            <h3 slot="header">Ваша заявка</h3>
            <form action="" slot="content" class="form" ref="form" @submit.prevent="onSubmit">
                <div class="row form__row form__row_no-margin-sm">
                    <div class="form__group col-6 col-12-sm" :class="{ 'invalid': $v.formModels.fio.$invalid && $v.formModels.fio.$dirty }">
                        <label for="fio" class="form__label">ФИО</label>
                        <input type="text" id="fio" class="form__control" v-model="formModels.fio" @input.once="$v.formModels.fio.$touch()">
                      <span class="form__invalid-message">
                        Это поле обязательно для заполнения
                      </span>
                    </div>
                    <div class="form__group col-6 col-12-sm" :class="{ 'invalid': $v.formModels.phone.$invalid && $v.formModels.phone.$dirty }">
                        <label for="phone" class="form__label">Номер телефона</label>
                        <input type="tel" id="phone" class="form__control" v-mask="'+7 (###) ###-##-##'" v-model="formModels.phone" @input.once="$v.formModels.phone.$touch()">
                      <span class="form__invalid-message">
                        Необходимо заполнить поле "Телефон" или "Email"
                      </span>
                    </div>
                </div>
                <div class="form__group" :class="{ 'invalid': $v.formModels.email.$invalid && $v.formModels.email.$dirty }">
                    <label for="email" class="form__label">Email</label>
                    <input type="email" id="email" class="form__control" v-model="formModels.email" @input.once="$v.formModels.email.$touch()">
                  <span class="form__invalid-message">
                    <template v-if="!$v.formModels.email.email && $v.formModels.email.$dirty">
                      Не верный формат email
                    </template>
                    <template v-if="!$v.formModels.email.requiredIf && $v.formModels.email.$dirty">
                      Необходимо заполнить поле "Телефон" или "Email"
                    </template>
                  </span>
                </div>
                <div class="form__group">
                    <label for="message" class="form__label">Сообщение</label>
                    <textarea id="message" class="form__control" rows="4" v-model="formModels.message" @input.once="$v.formModels.message.$touch()"></textarea>
                </div>
            </form>
            <button class="btn btn_primary btn_sm" slot="btn-ok" :disabled="$v.$invalid">Отправить</button>
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
                            <span class="parameters__name">Тип</span>:<span class="parameters__value">{{ viewRealty.realtyTypeName }}</span>
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
                  <h2 class="title">Оснащение</h2>
                  <ul v-if="viewRealty.equipments" class="object-info__parameters parameters fw-600">
                    <li class="parameters__item parameters__item_doted" v-for="(equipment, idx) in viewRealty.equipments"
                        :key="idx"
                    >
                      {{ equipment.display_name }}
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
                        :price="object.price_per_metr"
                        :img-path="object.img_path"
                        :id="object.id"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Mixins, Ref } from "vue-property-decorator";
import Slider from "./Slider.vue";
import Object from "@/js/components/RealtyCard.vue";
import Modal from "@/js/components/widgets/Modal.vue";
import Realty from "@/js/models/Realty";
import { requiredIf, required, email } from 'vuelidate/lib/validators'
import { validationMixin, Validation } from "vuelidate";


@Component({
  data: () => ({
    metaDesc: '',
    metaRealtyTypeName: '',
    metaKeyWords: ''
  }),
  components: {Modal, Object, Slider},

  /* eslint-disable */
  validations(): any {
    return {
      formModels: {
        fio: {
          required
        },
        email: {
          // @ts-ignore
          requiredIf: requiredIf(() => !this.formModels.phone),
          email
        },
        phone: {
          // @ts-ignore
          requiredIf: requiredIf(() => !this.formModels.email)
        },
        message: {

        }
      }
    }
  },

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
export default class ViewObject extends Mixins<Validation>(validationMixin) {
    realities: Array<Realty> = []
    viewRealty: Realty | false = false
    isShowRentModal = false
  @Ref('form') refForm!: HTMLElement
  metaDesc!: string
  metaRealtyTypeName!: string
  metaKeyWords!: string
  formModels = {
    message: '',
    email: '',
    phone: '',
    fio: '',
  }

  onSubmit (): void {
      if (!this.$v.$invalid) {
        console.log(this.formModels)
      }
  }
  onClose (): void {
      this.isShowRentModal = false

    this.formModels = {
      message: '',
      email: '',
      phone: '',
      fio: '',
    }

    this.$v.$reset()
  }

  makeKeywords(): string {
    let keywords = this.viewRealty && this.viewRealty.equipments ? this.viewRealty.equipments.map(equipment => equipment.display_name) : []

    return keywords.length !== 0 ? ', ' + keywords.join(', ').toLowerCase() : ''
  }

    openRentModal(): void {
        this.isShowRentModal = true
    }

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

        &_doted
          padding-left 15px
          display flex
          align-items center
          position relative

          &:before
            position absolute
            content ''
            display block
            background-color mainColor
            width 8px
            height 8px
            border-radius 60%
            left 0

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

.title
  margin-bottom 10px

</style>
