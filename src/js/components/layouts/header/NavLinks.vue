<template>
    <ul >
        <li
            v-for="(link, index) in links"
            :key="index"
            @click="onClickNavLink(link.id)"
        >
            <slot name="link" :link="link">
                <router-link v-if="link.isLink" :to="{name: link.routeName}">
                    {{ link.displayName }}
                </router-link>
                <span v-else class="cursor-pointer">{{ link.displayName }}</span>
            </slot>
        </li>
    </ul>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {mixinNavLinks} from "@/js/mixins/navLinks";
import bus from "@/js/common/bus";

@Component({
    mixins: [mixinNavLinks],
})
export default class NavLinks extends Vue {
    onClickNavLink(linkId: number):void {
        if (linkId === 3) {
            if (this.$route.name !== 'home') {
                this.$router.push({name: 'home'}).then(() => {
                    this.$nextTick(() => {
                        bus.$emit('scroll-to-news')
                    })
                })
            } else {
                bus.$emit('scroll-to-news')
            }
        } else if (linkId === 1) {
            if (this.$route.name !== 'home') {
                this.$router.push({name: 'home'})
            } else {
                bus.$emit('scroll-to-info')
            }
        }
    }
}
</script>

<style scoped>

</style>
