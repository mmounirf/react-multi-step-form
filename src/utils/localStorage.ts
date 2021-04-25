import { IForm } from '../interfaces/Form';

export function setLocalStorage<T>(name: string, payload: T): void {
  try {
    const serializedState = JSON.stringify(payload);
    localStorage.setItem(name, serializedState);
  } catch (err) {
    // log errors with something like sentry.io
  }
}

export function getLoclStorage<T>(name: string): T | undefined {
  try {
    const serializedState = localStorage.getItem(name);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState) as T;
  } catch (err) {
    return undefined;
  }
}


export const loadForm = (): IForm | undefined => getLoclStorage('@mou/formAnswers');
export const saveForm = (formAnswers: IForm): void => setLocalStorage('@mou/formAnswers', formAnswers);
