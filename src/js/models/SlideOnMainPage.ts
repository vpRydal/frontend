import {AxiosResponse} from "axios";
import api from '../common/myApi.json'
import http from "@/js/common/http";

class SlideOnMainPage {
    image?: string
    content?: string
    header?: string

    static getList(params: { [key: string]: number | string | undefined } = {}): Promise<AxiosResponse<SlideOnMainPage[]>> {

        if (process.env.VUE_APP_USE_LOCAL_API === 'false') {
            return http.get<SlideOnMainPage[]>('slide', { params: params })
        } else {
            return new Promise<AxiosResponse<SlideOnMainPage[]>>((resolve) => {
                resolve({ data: api.sliderSlides } as AxiosResponse<SlideOnMainPage[]>)
            })
        }
    }

}

export default SlideOnMainPage
