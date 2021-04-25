
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { SetCurrentStep } from '../../slices/StepperSlice';
import './Stepper.scss';

interface StepperProps {
    currentStep: number;
    children: Array<JSX.Element>;
}

const Stepper: React.FunctionComponent<StepperProps> = ({ currentStep, children }) => {
    const dispatch = useAppDispatch();
    const questions = useAppSelector((state) => state.stepper.questions);
    const isFirst = useAppSelector((state) => state.stepper.isFirst);
    const isLast = useAppSelector((state) => state.stepper.isLast);
    const nextStep = currentStep + 1;
    const prevStep = currentStep - 1;

    return (
        <div className="stepper">
            <div className="header">
                <p className="header__info">Question <strong>{currentStep}</strong> of <strong>{questions.length}</strong></p>
                <div className="header__navigation">
                    <button className="nav-button" disabled={isFirst} onClick={() => dispatch(SetCurrentStep({currentStep: prevStep}))}>Previous</button>
                    <button className="nav-button" disabled={isLast} onClick={() => dispatch(SetCurrentStep({currentStep: nextStep}))}>Next</button>
                </div>
            </div>
            <div className="stepper__content">
                {children[currentStep - 1  ]}
            </div>
        </div>
    )
}

export default Stepper;