import React, {useRef} from 'react'
import { Claim, Error, FormComponent, categories } from './helpers'

interface Props  {
    handleSubmit: React.FormEventHandler<HTMLFormElement>;
    formComponents: FormComponent[];
    error: Error;
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
      {formComponents.map((item, index) => (
        <div key={item.name}>
          <label>{item.inputLabel}</label>
          {
            error[item.name as keyof Error] &&
            <p className='error'>Error: missing field</p>
          }
          <div>
            {
              item.type === 'select' ? 
                <select 
                  className={error[item.name as keyof Error] ? 'inputerror' : ''}
                  ref={categoryInput}
                  value={claim[item.name as keyof Claim] || ''} 
                  name={item.name} 
                  onChange={handleOnChange}
                >
                  <option value="" disabled selected>Select your option</option>
                  {
                    categories.map(cat => <option>{cat}</option>)
                  }
                </select>
              : 
                <input
                  className={error[item.name as keyof Error] ? 'inputerror' : ''}
                  ref={item.name === 'date' ? dateInput : descriptionInput}
                  value={claim[item.name as keyof Claim] || ''}
                  onChange={handleOnChange}
                  type={item.type}
                  name={item.name}
                />
            }
            {
              item.name !== 'description' ? 
                <button type="button" onClick={() => goToNext(item.name)}>Next</button> :
                <button type="submit">Submit</button>
            }
          </div>
        </div>
      ))}
    </form>
  )
}

export default ClaimsForm