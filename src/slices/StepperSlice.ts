
import { IQuestionProps } from '../interfaces/Question';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { questions } from '../constants/QuestionsData';

interface SetCurrentStepPayload {
    currentStep: number,
}

interface AddQuestionPayload {
    index: number,
    question: IQuestionProps,
}

interface RemoveQuestionPayload {
    questionId: string
}

interface StepperState{
    questions: Array<IQuestionProps>,
    total: number,
    currentStep: number,
    isLast: boolean,
    isFirst: boolean
}
  
const initialState: StepperState = {
    questions: questions,
    total: questions.length,
    currentStep: 1,
    isFirst: true,
    isLast: false,
}

const stepperSlice = createSlice({
    name: 'Stepper',
    initialState,
    reducers: {
        AddQuestion(state: StepperState, action: PayloadAction<AddQuestionPayload>) {
            const { question, index } = action.payload;
            const questions = [...state.questions];
            questions.splice(index, 0, question);
            return {
                ...state,
                total: questions.length,
                questions,
                
            }
        },
        RemoveQuestion(state: StepperState, action: PayloadAction<RemoveQuestionPayload>) {
            return {
                ...state,
                total: questions.length,
                questions: state.questions.filter(question => question.id !== action.payload.questionId)
            }
        },
        SetCurrentStep(state: StepperState, action: PayloadAction<SetCurrentStepPayload>) {
            return {
                ...state,
                isFirst: action.payload.currentStep === 1,
                isLast: action.payload.currentStep === state.questions.length,
                currentStep: action.payload.currentStep
            }
        },
    }
});

export const stepperReducer = stepperSlice.reducer;
export const { AddQuestion, RemoveQuestion, SetCurrentStep } = stepperSlice.actions;

export default stepperSlice;
