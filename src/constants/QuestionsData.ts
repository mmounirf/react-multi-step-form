import { AnswerMode, AnswerType, IQuestionProps } from "../interfaces/Question";

export const childrenOptionalQuestion: IQuestionProps = {
  id: "numberOfChildren",
  title: "How many childreen do you have?",
  answer: { mode: AnswerMode.SingleLineInput, type: AnswerType.Number, placeholder: 'Number of Childreen' },
}

export const questions: Array<IQuestionProps> = [
  {
    id: "firstName",
    title: "What's your first name?",
    answer: { mode: AnswerMode.SingleLineInput, type: AnswerType.Text, placeholder: 'Your first name' },
  },
  {
    id: "address",
    title: "What's your address",
    answer: { mode: AnswerMode.SingleLineInput, type: AnswerType.Text, placeholder: 'Your home address' },
  },
  {
    id: "childrenExist",
    title: "Do you have children?",
    answer: {
      mode: AnswerMode.SingleChoiceInput,
      options: [
        { group: "childrenExist", label: "Yes", value: "true" },
        { group: "childrenExist", label: "No", value: "false" },
      ],
    },
  },
  {
    id: "occupation",
    title: "What's your occupation?",
    answer: {
      mode: AnswerMode.SingleChoiceInput,
      options: [
        { group: "occupation", label: "Employed", value: "EMPLOYED" },
        { group: "occupation", label: "Self-Employed", value: "SELF_EMPLOYED" },
        { group: "occupation", label: "Student", value: "STUDENT" },
      ],
    },
  },
  {
    id: "email",
    title: "What's your email?",
    answer: { mode: AnswerMode.SingleLineInput, type: AnswerType.Text, placeholder: 'Your email address' },
  },
];