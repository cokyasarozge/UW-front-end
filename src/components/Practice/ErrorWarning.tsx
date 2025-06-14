import { FormErrors, FormComponent} from './helpers'

interface Props {
    error: FormErrors;
    formItem: FormComponent;
}

const ErrorWarning = ({
  error,
  formItem,
} : Props) => {
  return (
    error[formItem.name as keyof FormErrors] ?
    <p 
			id={`${formItem.name}-error`}			
			className='error' 
			aria-describedby={error[formItem.name as keyof FormErrors] ? `${formItem.name}-error` : undefined}
		>
			Error: missing field
    </p> : null
	)
}

export default ErrorWarning