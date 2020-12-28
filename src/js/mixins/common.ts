import $ from 'jquery'


export const scrollTo = {
    methods: {
        scrollTo(target: HTMLElement | number, offset= 0): void {
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
};



