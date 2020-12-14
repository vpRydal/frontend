import axiosInstance from "@/js/common/axiosInstance";
import {AxiosResponse} from "axios";
import newsImage from '@/assets/img/town.png'

export type Slide = {
    title: string;
    text: string;
    imgPath: string;
}


class SliderOnMainPage {

    /* eslint-disable */
    static get(options?:any): Promise<AxiosResponse<Slide[]>> {
        return new Promise<AxiosResponse<Slide[]>>((resolve) => {
            resolve({
                    data: [
                        {
                            imgPath: newsImage,
                            text: 'Производственные помещения, цеха, бизнес центр и много других дополнительных зданий и  сооружений в совокупности создают технопарк со всей инфраструктурой.',
                            title: 'Аренда офисов и производсвенных помещений'
                        },
                        {
                            imgPath: newsImage,
                            text: 'Производственные помещения, цеха, бизнес центр и много других дополнительных зданий и  сооружений в совокупности создают технопарк со всей инфраструктурой.',
                            title: 'Аренда офисов и производсвенных помещений'
                        },
                        {
                            imgPath: newsImage,
                            text: 'Производственные помещения, цеха, бизнес центр и много других дополнительных зданий и  сооружений в совокупности создают технопарк со всей инфраструктурой.',
                            title: 'Аренда офисов и производсвенных помещений'
                        },
                        {
                            imgPath: newsImage,
                            text: 'Производственные помещения, цеха, бизнес центр и много других дополнительных зданий и  сооружений в совокупности создают технопарк со всей инфраструктурой.',
                            title: 'Аренда офисов и производсвенных помещений'
                        }
                    ]
                } as AxiosResponse<Slide[]>
            )
        })
    }
}

export default SliderOnMainPage
