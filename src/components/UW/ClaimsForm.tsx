import React, {useRef} from 'react'
import { Claim, FormErrors, FormComponent } from './types'
import Button from './Button';
import ErrorWarning from './ErrorWarning';
import InputField from './InputField';

interface Props  {
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  formComponents: FormComponent[];
  error: FormErrors;
  claim: Claim;
  handleOnChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
}

const ClaimsForm = ({
  handleSubmit,
  formComponents,
  error,
  claim,
  handleOnChange
} : Props) => {

  const categoryInput = useRef<HTMLSelectElement>(null);
  const dateInput = useRef<HTMLInputElement>(null);
  const descriptionInput = useRef<HTMLInputElement>(null);

  // Function to go to the next input
  const goToNext = (name: string) => {
    if (name === 'date') {
      categoryInput.current?.focus()
    } else if (name === 'category') {
      descriptionInput.current?.focus()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Claim Form</legend>
        {formComponents.map((formItem, index) => (
          <div key={formItem.name}>
            <label htmlFor={formItem.name}>{formItem.inputLabel}</label>
            <ErrorWarning 
              error={error}
              formItem={formItem}
            />
            <div>
              <InputField 
                error={error}
                formItem={formItem}
                categoryInput={categoryInput}
                claim={claim}
                handleOnChange={handleOnChange}
                dateInput={dateInput}
                descriptionInput={descriptionInput}
              />
              <Button 
                goToNext={() => goToNext(formItem.name)}
                index={index}
                formComponents={formComponents}
                formItem={formItem}
              />
            </div>
          </div>
        ))}
      </fieldset>
    </form>
  )
}

export default ClaimsForm