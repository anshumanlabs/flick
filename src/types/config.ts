export interface Config {
    width: number | string;
    height: number | string;
    titleSize: number;
    ratingSize: number;
    fontWeight: string;
    border: string;
    hover: boolean;
}

export const defaultConfig: Config = {
    width: '80%',
    height: '80%',
    titleSize: 20,
    ratingSize: 10,
    fontWeight: 'bold',
    border: '4px solid #f7f7f7',
    hover: true,
};

export const homeConfig: Config = {
    width: '90%',
    height: '90%',
    titleSize: 20,
    ratingSize: 10,
    fontWeight: 'bold',
    border: '4px solid #f7f7f7',
    hover: true,
};
