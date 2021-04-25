import { useState, useEffect } from 'react';
import Stepper from '../Stepper/Stepper';
import FormQuestion from '../FormQuestion/FormQuestion';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { AddQuestion, RemoveQuestion } from '../../slices/StepperSlice';
import { childrenOptionalQuestion } from '../../constants/QuestionsData';
import { IForm } from '../../interfaces/Form';
import { stringToBoolean } from '../../utils/common';
import "./Form.scss";


const initialFormState = {
  firstName: "",
  address: "",
  childrenExist: "",
  occupation: "",
  email: "",
};

const Form: React.FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const questions = useAppSelector((state) => state.stepper.questions);
    const currentStep = useAppSelector((state) => state.stepper.currentStep);
    const [formState, setFormState] = useState<IForm>(initialFormState);
    const [addUserRequestLoading, setAddUserRequestLoading] = useState<boolean>(false);

  
    const onQuestionChange = ( questionId: string, event: React.ChangeEvent<HTMLInputElement> ) => {
      const { value } = event.target;
      setFormState({ ...formState, [questionId]: value });
    };
  
    useEffect(() => {
      if (formState.childrenExist !== "") {
        const isChildrenExist = stringToBoolean(formState.childrenExist);
        const isChildrenCountExist = Boolean(questions.find((question) => question.id === "numberOfChildren"));
        if (isChildrenExist && !isChildrenCountExist) {
          dispatch(AddQuestion({ question: childrenOptionalQuestion, index: 3 }));
          setFormState({
            ...formState,
            numberOfChildren: formState.numberOfChildren ?? "",
          });
        }
        if (!isChildrenExist && isChildrenCountExist) {
          dispatch(RemoveQuestion({ questionId: "numberOfChildren" }));
          const newFormState = { ...formState };
          delete newFormState.numberOfChildren;
          setFormState(newFormState);
        }
      }
    }, [formState, questions, dispatch]);

    const isFormValid = () => {
      const { childrenExist, numberOfChildren, firstName, address, occupation, email } = formState;
      const inputFieldsValues = [firstName, address, occupation, email];
      const canSubmit = !inputFieldsValues.includes("");
      if(!canSubmit) {
        return false;
      }
      switch(childrenExist) {
        case "true": 
          return numberOfChildren !== "";
        case "false":
          return numberOfChildren === undefined;
        case "":
            return false;
        default:
          return false;
      }
    }

    const formSubmit = () => {
      const { numberOfChildren, firstName, address, occupation, email } = formState;
      const data = {
        firstName,
        address,
        numberOfChildren: Number(numberOfChildren ?? 0),
        occupation,
        email
      }
      setAddUserRequestLoading(true);
      console.log(data)
    };

    const formSteps = questions.map(({ id, title, answer }) => (
      <FormQuestion
        key={id}
        id={id}
        title={title}
        answer={answer}
        onChange={onQuestionChange}
        value={formState[id as keyof IForm]}
      />
    ));
    
    return (
        <div className="form">
            <Stepper currentStep={currentStep}>
              {formSteps}
            </Stepper>
            <button className="form__submit" disabled={!isFormValid() || addUserRequestLoading} onClick={formSubmit}>
              Submit
            </button>
        </div>
    )
}

export default Form;