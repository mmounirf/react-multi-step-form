import { FunctionComponent, memo } from "react";
import { AnswerMode, IQuestion, ISingleChoiceAnswer } from "../../interfaces/Question";

const FormQuestion: FunctionComponent<IQuestion> = ({ id, value, title, answer, onChange }) => {
  const onQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => onChange(id, event);
  const _renderAnswerInput = () => {
    switch (answer.mode) {
      case AnswerMode.SingleLineInput:
        return (
          <input
            type={answer.type}
            placeholder={answer.placeholder}
            value={value}
            onChange={onQuestionChange}
            aria-label={title}
            aria-required="true"
          />
        );
      case AnswerMode.SingleChoiceInput:
        return (
          <div className="formQuestion__radio-group">
            {answer.options.map((option: ISingleChoiceAnswer) => (
              <div key={option.label} className="radio-group__option">
                <input
                  type="radio"
                  id={option.label}
                  value={option.value}
                  name={option.group}
                  onChange={onQuestionChange}
                  checked={value === option.value}
                />
                <label htmlFor={option.label}>{option.label}</label>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="formQuestion">
      <h1>{title}</h1>
      {_renderAnswerInput()}
    </div>
  );
};

export default memo(FormQuestion);
