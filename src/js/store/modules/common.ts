import {Module, VuexModule, Mutation } from 'vuex-module-decorators'

@Module({name: 'common', namespaced: true})
export default class Common extends VuexModule {
    _windowWidth = 0

    get windowWidth(): number {
        return this._windowWidth
    }

    @Mutation
    setWindowWidth():void {
        this._windowWidth = window.innerWidth
    }
}
