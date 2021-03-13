import Vue from "vue";
import $ from "jquery";
import {DirectiveBinding} from "vue/types/options";


Vue.directive('scroll-to', {
    inserted: function (el, binding) {
        let coled = false;
        const f = function () {
            if (window.scrollY + window.innerHeight > $(el).position().top) {
                binding.value(el);
                coled = true;
            }

            if (coled)
                window.removeEventListener('scroll', f);
        };
        window.addEventListener('scroll', f);
    }
});

const elementsForAnimate = new Map<HTMLElement, { anim: string, binding: DirectiveBinding }>()
let isListen = false
const scrollHandler = () => {
    elementsForAnimate.forEach((payload, el) => {
        const $el = $(el)

        if (window.scrollY + window.innerHeight > ($el.offset()?.top as number)) {
            setTimeout(() => {
                $(el).addClass(payload.anim)
                elementsForAnimate.delete(el)

                if (!elementsForAnimate.size) {
                    removeEventListener('scroll', scrollHandler);
                    isListen = false;
                }
            }, payload.binding.value || 0)
        }
    })
}

Vue.directive('animate-to-on-scroll', {
    bind: function(el, binding) {
        const $el = $(el)

        if (binding.arg?.includes('right')){
            $el.addClass('anim-slide-from-right')
        } else if (binding.arg?.includes('left')) {
            $el.addClass('anim-slide-from-left')
        } else if (binding.arg?.includes('top')) {
            $el.addClass('anim-slide-from-top')
        } else if (binding.arg?.includes('bot')) {
            $el.addClass('anim-slide-from-bot')
        }
        $el.addClass('anim-slide')
        elementsForAnimate.set(el, { anim: 'anim-slide-from_end', binding })

        if (!isListen) {
            isListen = true;

            addEventListener('scroll', scrollHandler);
            scrollHandler()
        }
    }
});
