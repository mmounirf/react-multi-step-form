import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import Stepper from '../Stepper/Stepper';
import FormQuestion from '../FormQuestion/FormQuestion';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { AddQuestion, RemoveQuestion } from '../../slices/StepperSlice';
import { SetUser } from '../../slices/UserSlice';
import { SetErrors } from '../../slices/ErrorsSlice';
import { childrenOptionalQuestion } from '../../constants/QuestionsData';
import { API_POST_USER } from '../../constants/ApiConstants';
import { IForm } from '../../interfaces/Form';
import { IUser } from '../../interfaces/User';
import { stringToBoolean } from '../../utils/common';
import { loadForm, saveForm, saveUser } from '../../utils/localStorage';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
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
    const previouslySavedForm = loadForm();
    const formValues = previouslySavedForm ? previouslySavedForm : initialFormState;
    const [formState, setFormState] = useState<IForm>(formValues);
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
      saveForm(formState);
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
      dispatch(SetErrors([]));
      const { numberOfChildren, firstName, address, occupation, email } = formState;
      const data = {
        firstName,
        address,
        numberOfChildren: Number(numberOfChildren ?? 0),
        occupation,
        email
      }
      setAddUserRequestLoading(true);
      axios.post(API_POST_USER, data).then((response: AxiosResponse<IUser>) => {
        saveUser(response.data);
        dispatch(SetUser(response.data));
        setAddUserRequestLoading(false);
      }).catch(error => {
        if (error.response) {
          dispatch(SetErrors(error.response.data.errors));
        } else {
          const { name, message } = error.toJSON();
          dispatch(SetErrors([{[name]: [message]}]));
        }
        setAddUserRequestLoading(false);
      })
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
              {addUserRequestLoading && <LoadingSpinner size={20}/>}
            </button>
        </div>
    )
}

export default Form;