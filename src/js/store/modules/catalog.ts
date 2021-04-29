import {Module, VuexModule, Mutation, Action} from 'vuex-module-decorators'
import Realty from "@/js/models/Realty";


@Module({ name: 'catalog', namespaced: true })
export default class Catalog extends VuexModule {
    _realty: Array <Realty> = []
    _onlyMap = false

    get realty(): Array <Realty> {
        return this._realty
    }
    get onlyMap(): boolean {
        return this._onlyMap
    }

    @Mutation
    _setRealty(realty: Array <Realty>): void {
        this._realty = realty
    }
    @Mutation
    _setOnlyMap(onlyMap: boolean): void {
        this._onlyMap = onlyMap
    }

    @Action({commit: '_setOnlyMap'})
    setOnlyMap(onlyMap: boolean): boolean {
        return onlyMap
    }
    @Action({commit: '_setRealty'})
    setRealty(realty: Array <Realty>): Array <Realty> {
        return realty
    }
}
