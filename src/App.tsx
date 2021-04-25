import { useEffect } from 'react';
import Recommendations from './components/Recommendations/Recommendations';
import Form from './components/Form/Form';
import ErrorsAlert from './components/ErrorsAlert/ErrorsAlert';
import { useAppDispatch } from './hooks/useAppDispatch';
import { useAppSelector } from './hooks/useAppSelector';
import { loadRecommendations, loadUser } from './utils/localStorage';
import './App.scss';
import { SetRecommendations } from './slices/RecommendationsSlice';
import { SetUser } from './slices/UserSlice';

function App() {
  const dispatch = useAppDispatch();
  const savedRecommendations = loadRecommendations();
  const savedUser = loadUser();
  const userJwt = useAppSelector((state) => state.user.jwt);
  useEffect(() => {
    if(savedRecommendations) {
      dispatch(SetRecommendations(savedRecommendations))
    }

    if(savedUser) {
      dispatch(SetUser(savedUser))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main>
      {userJwt ? <Recommendations /> : <Form />}
      <ErrorsAlert/>
    </main>
  );
}

export default App;
