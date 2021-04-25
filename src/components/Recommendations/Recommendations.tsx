import { FunctionComponent, useEffect, useState } from "react";
import axios from "axios";
import LoadingSkeleton from "../LoadingSkeleton/LoadingSkeleton";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { SetRecommendations, ResetRecommendations } from "../../slices/RecommendationsSlice";
import { SetErrors } from "../../slices/ErrorsSlice";
import { ResetUser } from "../../slices/UserSlice";
import { IRecommendation } from "../../interfaces/Recommendation";
import { API_GET_RECOMMENDATION } from "../../constants/ApiConstants";
import { InsuranceTypes, Periodicity } from "../../constants/RecommendationConstants";
import { saveRecommendations, removeRecommendations, removeUser } from "../../utils/localStorage";
import { SetCurrentStep } from "../../slices/StepperSlice";
import "./Recommendations.scss";

const Recommendations: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const recommendations = useAppSelector((state) => state.recommendations);
  const userJwt = useAppSelector((state) => state.user.jwt);

  useEffect(() => {
    if (recommendations.length) {
      setLoading(false);
    } else {
      const requestHeaders = {
        Authorization: `Bearer ${userJwt}`,
      };
      axios
        .get(API_GET_RECOMMENDATION, { headers: requestHeaders })
        .then((response) => {
          setLoading(false);
          dispatch(SetRecommendations(response.data));
          saveRecommendations(response.data);
        })
        .catch((error) => {
          if (error.response) {
            dispatch(SetErrors(error.response.data.errors));
          } else {
            const { name, message } = error.toJSON();
            dispatch(SetErrors([{ [name]: [message] }]));
          }
          setLoading(false);
        });
    }
  }, [recommendations, userJwt, dispatch]);

  const recommendationsList = () => {
    return (
      <div className="recommendations__list">
        {recommendations.map((recommendation: IRecommendation) => {
          const { type, price } = recommendation;
          const { amount, periodicity } = price;
          return (
            <div className="recommendations__item" key={`${type}-${price}`}>
              <h4 className="title">
                {InsuranceTypes[type as keyof typeof InsuranceTypes]}
              </h4>
              <p className="price">
                €{amount} per {Periodicity[periodicity as keyof typeof Periodicity]}
              </p>
            </div>
          );
        })}
      </div>
    );
  };


  const reset = () => {
    removeUser();
    removeRecommendations();
    dispatch(ResetRecommendations());
    dispatch(ResetUser());
    dispatch(SetCurrentStep({currentStep: 1}));
  }

  const renderRecommendations = () => {
    if(Boolean(recommendations.length) && !loading) {
      return (
        <>
          <h2 className="recommendations__title">We got your recommendations</h2>
          <p className="recommendations__subtitle">Based on your answers, this is what make snese for you and what you should pay</p>
          {recommendationsList()}
          <button className="recommendations__reset" onClick={reset}>Reset</button>
        </>
      )
    } else {
      return (
        <div className="loadingSkeletons">
          <LoadingSkeleton height="50px" width="100%" />
          <LoadingSkeleton height="50px" width="100%" />
          <LoadingSkeleton height="50px" width="100%" />
        </div>
      )
    }

  }

  return (
    <div className="recommendations">
        {renderRecommendations()}
    </div>
  );
};

export default Recommendations;
