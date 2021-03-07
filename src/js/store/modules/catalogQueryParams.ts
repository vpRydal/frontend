import {Module, VuexModule, Mutation, Action} from 'vuex-module-decorators'
import {minMax, objectWIthAnyProperties} from "@/js/common/types";
import {Vue} from "vue-property-decorator";


@Module({name: 'queryParams', namespaced: true})
export default class CatalogQueryParams extends VuexModule {
    _params: objectWIthAnyProperties = {}

    get params(): objectWIthAnyProperties {
        return this._params
    }

    @Mutation
    setQueryParams(params: objectWIthAnyProperties): void {
        this._params = params
    }

    @Mutation
    _addParam({name, value}: { name: string, value: string | objectWIthAnyProperties | number | Array<number | string> | minMax }): void {
        Vue.set(this._params, name, value)
    }

    @Action({ commit: '_addParam' })
    addParam(payload: { name: string, value: string | number | Array<number | string> | minMax | objectWIthAnyProperties }): { name: string, value: objectWIthAnyProperties | string | number | Array<number | string> | minMax } {
        return payload
    }
}
