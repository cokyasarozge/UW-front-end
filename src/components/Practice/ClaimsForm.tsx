import React from 'react'
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
  return (
    <form onSubmit={handleSubmit}>
        {formComponents.map(item => (
            <div key={item.name}>
                <label>{item.formLabel}</label>
                {
                    error[item.name as keyof Error] &&
                    <p>Error: missing field</p>
                }
                {item.type === 'select' ? 
                <select value={claim[item.name as keyof Claim] || ''} name={item.name} onChange={handleOnChange}>
                    <option value="" disabled selected>Select your option</option>
                    {
                        categories.map(cat => <option>{cat}</option>)
                    }
                </select>
                : 
                <input
                    value={claim[item.name as keyof Claim] || ''}
                    onChange={handleOnChange}
                    type={item.type}
                    name={item.name}
                />}
                {item.name !== 'description' ? 
                <button>Next</button> :
                <button>Submit</button>
                }
            </div>
        ))}
    </form>
  )
}

export default ClaimsForm