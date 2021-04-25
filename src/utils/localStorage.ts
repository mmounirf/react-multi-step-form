import { IForm } from '../interfaces/Form';
import { IUser } from '../interfaces/User';
import { IRecommendation } from '../interfaces/Recommendation';

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
export const loadUser = (): IUser | undefined => getLoclStorage('@mou/user');
export const saveUser = (user: IUser): void => setLocalStorage('@mou/user', user);
export const removeUser = (): void => localStorage.removeItem('@mou/user');
export const loadRecommendations = (): Array<IRecommendation> | undefined => getLoclStorage('@mou/recommendations');
export const saveRecommendations = (recommendations: Array<IRecommendation>): void => setLocalStorage('@mou/recommendations', recommendations);
export const removeRecommendations = (): void => localStorage.removeItem('@mou/recommendations');