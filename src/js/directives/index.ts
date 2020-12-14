import Vue from "vue";
import $ from "jquery";


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

const elementsForAnimate = new Map<HTMLElement, string>()
let isListen = false
const scrollHandler = () => {
    elementsForAnimate.forEach((animEnd, el) => {
        const $el = $(el)

        if (window.scrollY + window.innerHeight > ($el.offset()?.top as number)) {
            $(el).addClass(animEnd)
            elementsForAnimate.delete(el)

            if (!elementsForAnimate.size) {
                removeEventListener('scroll', scrollHandler);
                isListen = false;
            }
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
        elementsForAnimate.set(el, 'anim-slide-from_end')

        if (!isListen) {
            isListen = true;

            addEventListener('scroll', scrollHandler);
        }
    }
});