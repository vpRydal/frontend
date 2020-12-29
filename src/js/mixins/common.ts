import $ from 'jquery'
import {Component, Mixins} from "vue-property-decorator";

@Component
export class ScrollTo extends Mixins() {
    scrollTo(target: HTMLElement | number, offset = 0): void {
        setTimeout(() => {
            let scrollEndPoint;
            const $animateTarget = $([document.documentElement, document.body])

            if (target instanceof HTMLElement) {
                scrollEndPoint = $(target).offset()?.top as number
                console.log(scrollEndPoint)
            } else {
                scrollEndPoint = target
            }
            $animateTarget.stop().animate({
                scrollTop: scrollEndPoint + offset
            }, {
                duration: 2000,
            })
        }, 500)
    }
}

