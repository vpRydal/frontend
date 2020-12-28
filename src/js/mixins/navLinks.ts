export type link = {
    displayName: string;
    routeName: string;
    id: number;
    isLink?: boolean
}

const links: Array<link> = [
    {displayName: 'О технопарке', routeName: 'home', id: 1},
    {displayName: 'Аренда', routeName: 'catalog', id: 2, isLink: true},
    {displayName: 'Новости', routeName: 'index', id: 3},
    {displayName: 'Контакты', routeName: 'index', id: 4},
];

export const mixinNavLinks = {
    /* eslint-disable */
    data: (): any => ({
        links
    })
};



