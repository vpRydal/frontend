<template>
    <div class="footer" ref="footer">
        <div class="footer__container container">
            <div class="footer__flex-wrapper flex-wrapper">
                <div class="footer__col footer__col_first">
                    <p class="footer__address">г. Севастополь, ул. Фиолентовское шоссе, 1/2</p>
                    <ul class="contacts-list">
                        <li class="contacts-list__item" v-for="(contact, index) of contacts" :key="index">
                            <span class="contacts-list__name">{{ contact.name }}</span>: <a
                            class="contacts-list__value link link_white" :href="contact.type === 'tel'? `tel:${contact.value}`: `mail-to:${contact.value}`">{{ contact.value }}</a>
                        </li>
                    </ul>
                </div>
                <div class="footer__col footer__col_second">
                    <div class="social-link">
                        <ibg class="" :src="fImg"/>
                        <a href="" class="stretched-link"></a>
                    </div>
                    <div class="social-link">
                        <ibg :src="vkImg"/>
                        <a href="" class="stretched-link"></a>
                    </div>
                </div>
                <div class="footer__col footer__col_third">
                    <div class="departments">
                        <p class="footer__departments">Отдел аренды:</p>
                        <ul class="departments__list">
                            <li class="departments__item">
                                <a class="link link_white" href="tel:+7 (978) 734-58-99">+7 (978) 734-58-99</a><a class="link link_white" href="tel:+7 (918) 473-08-39">+7 (918) 473-08-39</a>
                            </li>
                            <li class="departments__item">
                                <a href="tel:+7 (978) 734-58-55" class="link link_white">+7 (978) 734-58-55</a><a class="link link_white" href="tel:+7 (978) 268-72-55">+7 (978) 268-72-55</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator';
import vkImg from '@/assets/img/vk.png'
import fImg from '@/assets/img/f.png'
import {ScrollTo} from "@/js/mixins/common";
import bus from "@/js/common/bus";

type Contact = {
    name: string;
    value: string;
    type: string;
}

@Component({
    data: () => ({
        vkImg,
        fImg
    })
})
export default class Footer extends Mixins(ScrollTo) {
    contacts: Array<Contact> = [
        {name: 'Менеджер проекта', value: '+7(978) 801-43-83 ', type: 'tel'},
        {name: 'e-mail', value: 'elena@sferos.com, irina@sferos.com', type: 'email'},
    ]

    created():void {
        bus.$on('scroll-to-contacts', () => {
            this.scrollTo(this.$refs['footer'] as HTMLElement)
        })
    }

    beforeDestroy(): void {
        bus.$off('scroll-to-contacts')
    }
}
</script>

<style scoped lang="stylus">
@import "../../../stylus/colors.styl"
.footer
    font-size 1.1rem
    background-color: mainColor

    &__container
        padding 45px 0
        @media (max-width 1200px)
            padding 45px 20px

    &__flex-wrapper
        @media (max-width: 1200px)
            flex-direction column

    &__col
        flex 1 1 34%

        &_first
            @media (max-width: 1200px)
                margin-bottom: 25px

        &_second
            flex 1 1 10%
            display flex
            align-items center
            @media (max-width: 1200px)
                margin-bottom: 25px

        &_third
            flex 1 1 30%

    &__address, &__departments
        font-size 1em
        color white
        font-family Raleway-Regular
        margin-bottom 40px

.contacts-list, .departments
    color white
    font-size 1em

    &__item
        margin-bottom 15px

        &:last-child
            margin-bottom 0

.social-link
    position relative
    width 80px
    height 80px
    margin 0 auto

    &:first-child
        margin-left: 0
    @media (max-width: 1200px)
        margin 0 10px

    & .ibg
        padding 0 0 100% 0

.departments
    max-width 450px
    margin-left auto
    @media (max-width: 1200px)
        margin 0

    &__item
        display flex
        justify-content space-between
        @media (max-width: 430px)
            flex-direction column
            margin-bottom 0
            span
                margin-bottom 15px

</style>
