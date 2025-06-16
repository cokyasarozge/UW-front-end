import React from 'react'
import { Claim, categories } from './types';

interface Props {
	formField: {
		name: string;
		type: string;
	};
	claim: Claim;
	warnings: Omit<Claim, "id">;
	handleOnChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
	onSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent<HTMLInputElement>) => void;
	categoryInput: React.RefObject<HTMLSelectElement | null>;
	dateInput: React.RefObject<HTMLInputElement | null>;
	descriptionInput: React.RefObject<HTMLInputElement | null>;
}

const InputField = ({
	formField,
	claim,
	warnings,
	handleOnChange,
	onSubmit,
	categoryInput,
	descriptionInput,
	dateInput
} : Props) => {

  return (
    <div>
			{formField.type === 'select' ?
				<select 
					aria-describedby={`${formField.name} select field`}
					id={formField.name}
					ref={categoryInput}
					className={warnings[formField.name as keyof Omit<Claim, 'id'>] !== '' ? 'error-input' : ''}
					name={formField.name} 
					value={claim[formField.name as keyof Claim]}
					onChange={e => handleOnChange(e)}
				>
					<option value="">Choose an option</option>
					{categories.map(cat => <option value={cat}>{cat}</option>)}
				</select>
			: <input
					aria-describedby={`${formField.name} input field`}
					id={formField.name}
					className={warnings[formField.name as keyof Omit<Claim, 'id'>] !== '' ? 'error-input' : ''}
					ref={formField.name === 'date' ? dateInput : descriptionInput}
					name={formField.name}
					type={formField.type}
					value={claim[formField.name as keyof Claim]}
					onChange={e => handleOnChange(e)}
					onKeyDown={(e) => {
						if (e.key === 'Enter' && formField.name === 'description') {
							onSubmit(e)
						}
					}}

				/>}
    </div>
  )
}

export default InputField