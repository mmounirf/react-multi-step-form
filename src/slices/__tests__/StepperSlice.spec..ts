import store from "../../store";
import { AddQuestion, RemoveQuestion, SetCurrentStep } from "../StepperSlice";
import { childrenOptionalQuestion } from "../../constants/QuestionsData";

test('Stepper State Helpers', () => {
    let stepperState = store.getState().stepper;
    const { isFirst, isLast, total, questions } = stepperState;
    expect(isFirst).toEqual(!isLast);
    expect(total).toEqual(questions.length);
});

test('Move to step 2', () => {
    store.dispatch(SetCurrentStep({currentStep: 2}));
    let stepperState = store.getState().stepper;
    const { currentStep } = stepperState;
    expect(currentStep).toEqual(2);
});

test('Add quesiton', () => {
    let prevState = store.getState().stepper;
    store.dispatch(AddQuestion({ question: childrenOptionalQuestion, index: 3 }));
    let nextState = store.getState().stepper;
    expect(nextState.questions).toHaveLength(prevState.questions.length + 1);
    expect(nextState.total).toEqual(prevState.total + 1);
    const addedQuestion = nextState.questions.find(question => question.id === childrenOptionalQuestion.id);
    expect(addedQuestion).toBeDefined();
});

test('Remove quesiton', () => {
    let prevState = store.getState().stepper;
    store.dispatch(RemoveQuestion({ questionId: "firstName" }));
    let nextState = store.getState().stepper;
    expect(nextState.questions).toHaveLength(prevState.questions.length - 1)
    expect(nextState.total).toEqual(prevState.total - 1);
    const removedQuestion = nextState.questions.find(question => question.id === "firstName");
    expect(removedQuestion).toBeUndefined();
});