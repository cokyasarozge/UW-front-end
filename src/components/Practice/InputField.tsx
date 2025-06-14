import React from 'react'
import { FormComponent, Claim, categories, FormErrors } from './helpers'

interface Props {
  formItem: FormComponent;
  error: FormErrors;
  claim: Claim;
  handleOnChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  categoryInput: React.RefObject<HTMLSelectElement | null>;
  dateInput: React.RefObject<HTMLInputElement | null>;
  descriptionInput: React.RefObject<HTMLInputElement | null>;
}

const InputField = ({
  formItem,
  error,
  categoryInput,
  claim,
  handleOnChange,
  dateInput,
  descriptionInput
} : Props) => {
  return (
    formItem.type === 'select' ? 
      <select 
        aria-describedby={error[formItem.name as keyof FormErrors] ? `${formItem.name}-error` : undefined}
        id={formItem.name}
        className={error[formItem.name as keyof FormErrors] ? 'inputerror' : ''}
        ref={categoryInput}
        value={claim[formItem.name as keyof Claim] || ''} 
        name={formItem.name} 
        onChange={handleOnChange}
      >
        <option value="" disabled>Select your option</option>
        {
          categories.map(cat => <option key={cat}>{cat}</option>)
        }
      </select>
    : 
      <input
        aria-describedby={error[formItem.name as keyof FormErrors] ? `${formItem.name}-error` : undefined}
        id={formItem.name}
        className={error[formItem.name as keyof FormErrors] ? 'inputerror' : ''}
        ref={formItem.name === 'date' ? dateInput : descriptionInput}
        value={claim[formItem.name as keyof Claim] || ''}
        onChange={handleOnChange}
        type={formItem.type}
        name={formItem.name}
      />
  )
}

export default InputField