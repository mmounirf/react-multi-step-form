import { useState } from 'react';
import { questions } from "./constants/QuestionsData"
import FormQuestion from "./components/FormQuestion/FormQuestion";
import './App.scss';
import { useEffect } from 'react';
import { IForm } from './interfaces/Form';

const initialFormState = {
  firstName: "",
  address: "",
  childrenExist: "",
  occupation: "",
  email: "",
};

function App() {
  const [formState, setFormState] = useState<IForm>(initialFormState);
  const onQuestionChange = ( questionId: string, event: React.ChangeEvent<HTMLInputElement> ) => {
    const { value } = event.target;
    setFormState({ ...formState, [questionId]: value });
  };

  useEffect(() => {
    console.log(formState)
  }, [formState])
  
  return (
    <div className="App">
      {
        questions.map(({ id, title, answer }) => (
          <FormQuestion
            key={id}
            id={id}
            title={title}
            answer={answer}
            onChange={onQuestionChange}
            value={formState[id as keyof IForm]}
          />
        ))
      }
    </div>
  );
}

export default App;
