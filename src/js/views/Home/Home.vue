<template>
    <div class="home">
        <PageHeader/>
        <Categories/>
        <News/>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import PageHeader from "@/js/views/Home/PageHeader/PageHeader.vue";
import Categories from "@/js/views/Home/Categories.vue";
import News from "@/js/views/Home/News/News.vue";


@Component({
    components: {News, Categories, PageHeader},
    metaInfo: {
        title: 'Аренда помещений Севастополь',
    },
    created(): void {
        console.log(this.$route.query)
    }
})
export default class Home extends Vue {

}
</script>
