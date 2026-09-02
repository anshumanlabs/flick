export interface Config {
    width: number | string;
    height: number | string;
    titleSize: number;
    ratingSize: number;
    fontWeight: string;
    border: string;
    hover: boolean;
    borderRadius: string;
}

export const layoutConfig: Config = {
    width: '90%',
    height: '80%',
    titleSize: 20,
    ratingSize: 10,
    fontWeight: 'bold',
    border: '4px solid rgba(255, 255, 255, 0.5)',
    hover: true,
    borderRadius: '10px',
};
