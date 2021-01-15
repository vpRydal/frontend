import {AxiosResponse} from "axios";
import api from './myApi.json'

class SlideOnMainPage {
    image?: string
    content?: string
    header?: string

    /* eslint-disable */
    static getList(options?:any): Promise<AxiosResponse<SlideOnMainPage[]>> {
        return new Promise<AxiosResponse<SlideOnMainPage[]>>((resolve) => {
            resolve({ data: api.sliderSlides } as AxiosResponse<SlideOnMainPage[]>)
        })
        /*http.get<SlideOnMainPage[]>('slides')*/
    }
}

export default SlideOnMainPage
