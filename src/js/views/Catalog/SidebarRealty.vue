<template>
    <div class="sidebar-realty">
        <Realty v-for="(realty, idx) in $realty"
                :key="idx"
                :id="realty.id"
                :price="realty.price"
                :area="realty.area"
                :img-path="realty.img_path"
                :title="realty.name"
                class="sidebar-realty__realty"
        />
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import Realty from "../../components/Realty.vue";
import {mapGetters} from "vuex";

@Component({
    components: {Realty},
    computed: {
        ...mapGetters('catalog', {
            $realty: 'realty'
        })
    }
})
export default class SidebarRealty extends Vue {

}
</script>

<style scoped lang="stylus">
.sidebar-realty
    display flex
    flex-direction column
    justify-content center

    &__realty
        max-width 100%
        height 150px
        min-height 150px
        margin-bottom 15px

        &:last-child
            margin-bottom 0
</style>
