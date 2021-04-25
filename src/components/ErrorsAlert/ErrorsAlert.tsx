import { useAppSelector } from "../../hooks/useAppSelector";
import "./ErrorsAlert.scss";

const ErrorsAlert: React.FunctionComponent = () => {
  const errors = useAppSelector((state) => state.errors);
  const errorsList = Object.entries(errors);
    if(!errorsList.length) {
        return null
    }
 
    const errorListElements = errorsList.map(error => {
        const scope = error[0];
        const message = error[1].toString();
        return (
        <p role="alert" className="message" key={scope}>
            {scope}: {message}
          </p>
        )
    })
    return <div className="errors">{errorListElements}</div>
};

export default ErrorsAlert;
