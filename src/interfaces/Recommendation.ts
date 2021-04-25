export interface IRecommendation {
    type: string;
    price: {
        amount: number,
        periodicity: string
    }
}