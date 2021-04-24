import { shallow, ShallowWrapper } from "enzyme";
import FormQuestion from "./FormQuestion";
import { questions } from "../../constants/QuestionsData";
import { AnswerType } from "../../interfaces/Question";

describe("<FormQuestion> component", () => {
  const onChange = jest.fn();
  const singleLineInputQuestionProps = questions[0];
  let component: ShallowWrapper;
  const { id } = singleLineInputQuestionProps;
  beforeEach(() => {
    component = shallow(
      <FormQuestion {...singleLineInputQuestionProps} onChange={onChange} />
    );
  });

  describe("Rendering Form Question", () => {
    const onChangeMock = { target: { value: "Input Field Value" } };

    it("should exist", () => {
      expect(component.instance()).toBeDefined();
      expect(component).toHaveLength(1);
    });

    it("should have input field with right type", () => {
      expect(component.find("input")).toBeDefined();
      expect(component.find("input").props().type).toEqual(AnswerType.Text);
    });

    it("should call onchange on keyboard event", () => {
      component
        .find("input")
        .simulate("change", { target: { value: "Input Field Value" } });
      expect(onChange).toBeCalledWith(id, onChangeMock);
    });
  });
});
