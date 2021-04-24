export enum AnswerMode {
  SingleLineInput = "single-line-input",
  SingleChoiceInput = "single-choice-input",
}

export enum AnswerType {
  Text = "text",
  Number = "number",
}

export type IAnswer<T> = T extends AnswerMode.SingleLineInput
  ? { mode: AnswerMode.SingleLineInput; type: AnswerType; placeholder?: string; }
  : { mode: AnswerMode.SingleChoiceInput; options: Array<ISingleChoiceAnswer> };

  export interface ISingleChoiceAnswer {
    readonly group: string;
    readonly label: string;
    readonly value: string;
  }

export type IQuestion = {
  readonly id: string;
  readonly title: string;
  readonly answer:
    | IAnswer<AnswerMode.SingleLineInput>
    | IAnswer<AnswerMode.SingleChoiceInput>;
  readonly value?: string | number | undefined;
  optional?: boolean;
  onChange: (id: string, event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type IQuestionProps = Omit<IQuestion, 'onChange'>;
