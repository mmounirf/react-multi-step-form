import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRecommendation } from '../interfaces/Recommendation';


export const initialRecommendations: Array<IRecommendation> = [];

const recommendationsSlice = createSlice({
    name: 'Recommendations',
    initialState: initialRecommendations,
    reducers: {
        SetRecommendations(state: Array<IRecommendation>, action: PayloadAction<Array<IRecommendation>>) {
            return action.payload
        },
        ResetRecommendations(state: Array<IRecommendation>) {
            return initialRecommendations
        }
    }
});

export const recommendationsReducer = recommendationsSlice.reducer;
export const { SetRecommendations, ResetRecommendations } = recommendationsSlice.actions;
export default recommendationsSlice;