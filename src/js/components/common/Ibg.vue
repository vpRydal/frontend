<template>
    <div
        @click="$emit('click')"
        class="ibg"
        :style="{'background-image': `url('${src}')`}"
    >
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';


@Component({
    props: {
        src: {
            type: String,
            required: true
        },
    }
})
export default class Ibg extends Vue {
}
</script>

<style scoped lang="stylus">
.ibg
    background-repeat no-repeat
    background-size cover
    background-position center
</style>
