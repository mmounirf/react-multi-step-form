import { FunctionComponent } from "react";
import "./LoadingSpinner.scss";

interface LoadingSpinnerProps {
    size?: number;
}

const LoadingSpinner: FunctionComponent<LoadingSpinnerProps> = ({size = 25}) => {
    const dimensions = {width: `${size}px`, height: `${size}px`};
    return (
        <span className="loadingSpinner" style={{...dimensions}}></span>
    )
}

export default LoadingSpinner
