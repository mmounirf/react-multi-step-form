import { Provider } from 'react-redux';
import { shallow, ShallowWrapper } from "enzyme";
import Stepper from "./Stepper";
import { questions } from "../../constants/QuestionsData";
import FormQuestion from "../FormQuestion/FormQuestion";
import store from '../../store';

describe("<Stepper> component", () => {
  let component: ShallowWrapper;
  const onQuestionChange = jest.fn();
  const formSteps = questions.map(({ id, title, answer, value }) => (
    <FormQuestion
      key={id}
      id={id}
      title={title}
      answer={answer}
      onChange={onQuestionChange}
      value={value}
    />
  ));
  beforeEach(() => {
    component = shallow(
        <Provider store={store}>
            <Stepper currentStep={1}>{formSteps}</Stepper>
        </Provider>
    ).dive();
  });

  describe("Rendering Stepper", () => {
    it("should exist", () => {
      expect(component.instance()).toBeDefined();
      expect(component).toHaveLength(1);
    });

    it("should have children equals to total number of questions", () => {
        let stepperState = store.getState().stepper;
        expect(component.children().length).toEqual(stepperState.total);
        expect(component.children().length).toEqual(stepperState.questions.length);
    });

  });
});
