<template>
    <main v-touch:swipe.right="handleSwipeRight" v-touch:swipe.left="handleSwipeLeft">
        <NavBar/>
        <Header/>
        <router-view class="view"/>
        <Footer/>
    </main>
</template>

<script lang="ts">
import Header from "./components/layouts/header/Header.vue";
import Footer from "./components/layouts/Footer.vue";
import NavBar from "./components/layouts/NavBar.vue";
import {Component, Vue} from 'vue-property-decorator';
import bus from "./common/bus";
import {mapGetters} from "vuex";

@Component({
    components: {NavBar, Footer, Header},
    metaInfo: {
        title: 'Аренда помещений Севастополь',
        titleTemplate: '%s | Ассоциация Технопарк Маяк',
        meta: [
            {
                vmid: 'keywords',
                name: 'keywords',
                content: 'Технопарк Маяк, Ассоциация Технопарк Маяк',
            }
        ]
    },
    computed: {
        ...mapGetters('common', {
            $windowWidth: 'windowWidth'
        })
    }
})
export default class App extends Vue {
    $windowWidth!: number

    handleSwipeRight(): void {
        if (this.$windowWidth <= 1200) {
            bus.$emit('nav-bar-show')
        }
    }

    handleSwipeLeft(): void {
        bus.$emit('nav-bar-hide')
    }
}

</script>

<style lang="stylus" scoped>
.view
    padding-top 110px
</style>
