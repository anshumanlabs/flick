export interface Config {
    width: number | string,
    height: number | string,
    titleSize: number,
    ratingSize: number,
    fontStyle: string,
    border: string,
    hover: boolean
}

export const defaultConfig: Config = {
    width: "80%",
    height: "80%",
    titleSize: 25,
    ratingSize: 15,
    fontStyle: "bold",
    border: "8px solid #f7f7f7",
    hover: true,
};