import { useState } from 'react';
import { questions } from "./constants/QuestionsData"
import FormQuestion from "./components/FormQuestion/FormQuestion";
import './App.scss';
import { useEffect } from 'react';
import { IForm } from './interfaces/Form';
import Stepper from './components/Stepper/Stepper';
import { useAppSelector } from './hooks/useAppSelector';

const initialFormState = {
  firstName: "",
  address: "",
  childrenExist: "",
  occupation: "",
  email: "",
};

function App() {
  const currentStep = useAppSelector((state) => state.stepper.currentStep);
  const [formState, setFormState] = useState<IForm>(initialFormState);
  const onQuestionChange = ( questionId: string, event: React.ChangeEvent<HTMLInputElement> ) => {
    const { value } = event.target;
    setFormState({ ...formState, [questionId]: value });
  };

  useEffect(() => {
    console.log(formState)
  }, [formState])

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
    <div className="App">
      <Stepper currentStep={currentStep}>
        {formSteps}
      </Stepper>
    </div>
  );
}

export default App;
