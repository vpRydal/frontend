<template>
    <div class="footer" ref="footer">
        <div class="footer__container container">
            <div class="footer__flex-wrapper flex-wrapper">
                <div class="footer__col footer__col_first">

                    <p class="footer__address"><a class="link link_white" href="https://yandex.ru/maps/959/sevastopol/?ll=33.482039%2C44.582682&mode=search&oid=243991293869&ol=biz&z=17.92" target="_blank">г. Севастополь, ул. Фиолентовское шоссе, 1/2</a></p>
                    <ul class="contacts-list">
                        <li class="contacts-list__item" v-for="(contact, index) of contacts" :key="index">
                            <span class="contacts-list__name">{{ contact.name }}</span><span class="contacts-list__dote">:</span>
                            <a class="contacts-list__value link link_white"
                               :href="contact.text.includes('@') ? `mail-to:${contact.text}`: `tel:${contact.text}`"
                            >{{ contact.text }}</a>
                        </li>
                        <li
                            v-if="emails.length"
                            class="contacts-list__item"
                        >
                            <span class="contacts-list__name">e-mail</span><span class="contacts-list__dote">:</span>
                            <a
                                v-for="(email, index) in emails"
                                :key="index"
                                class="contacts-list__value link link_white contacts-list__value_email"
                                :href="`mail-to:${email}`"
                                ref="emails"
                            >{{ email }}</a>
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
                            <li
                                v-for="(contacts, index) in rentDepartContacts"
                                :key="index"
                                class="departments__item"
                            >
                                <a
                                    v-for="(contact, index) in contacts"
                                    :key="index"
                                    class="link link_white" :href="`tel:${contact.text}`">{{ contact.text }}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Mixins, Watch} from 'vue-property-decorator';
import vkImg from '@/assets/img/vk.png'
import fImg from '@/assets/img/f.png'
import {ScrollTo} from "@/js/mixins/common";
import bus from "@/js/common/bus";
import Contact from "@/js/api/Contact";
import $ from "jquery";


@Component({
    data: () => ({
        vkImg,
        fImg
    })
})
export default class Footer extends Mixins(ScrollTo) {
    contacts: Array<Contact> = []
    rentDepartContacts: Array<Array<Contact>> = []
    emails: Array<string> = []

    created():void {
        bus.$on('scroll-to-contacts', () => {
            this.scrollTo(this.$refs['footer'] as HTMLElement)
        })

        Contact.getList().then((response) => {
            let counter = 0
            let tempList: Array<Contact> = []

            response.data.forEach(contact => {
                if (contact.is_rent_depart) {
                    tempList.push(contact)

                    if (++counter == 2) {
                        counter = 0
                        this.rentDepartContacts.push(tempList)
                        tempList = []
                    }
                } else {
                    if (contact.text?.includes('@')) {
                        this.emails.push(contact.text)
                    } else {
                        this.contacts.push(contact)
                    }
                }
            })
        })
    }

    @Watch('emails')
    watchEmails(): void {
        this.$nextTick(() => {
            const emails = this.$refs['emails'] as Array<HTMLElement>

            $(emails.slice(0, emails.length - 1))
                .after($('<span>', {text: ','}).css('margin-right', 5))
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
        display flex
        margin-bottom 15px
        flex-wrap wrap

        &:last-child
            margin-bottom 0

.contacts-list
    &__dote, &__comma
        margin-right 5px

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
