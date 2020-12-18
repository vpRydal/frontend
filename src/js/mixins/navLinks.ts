export type link = {
    displayName: string;
    routeName: string;
}

const links: Array<link> = [
    {displayName: 'О технопарке', routeName: 'home'},
    {displayName: 'Аренда', routeName: 'index'},
    {displayName: 'Новости', routeName: 'index'},
    {displayName: 'Контакты', routeName: 'index'},
];

export const mixinNavLinks = {
    /* eslint-disable */
    data: (): any => ({
        links
    })
};



