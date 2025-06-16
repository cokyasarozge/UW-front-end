import React, {useRef, useState} from 'react'
import { Claim } from './types'
import RenderStatusMessage from './RenderStatusMessage';
import { Status } from '../../store/types';
import InputField from './InputField';

interface Props {
	claim: Claim;
	claims: Claim[];
	postStatus: Status;
	handleSubmit: () => void;
	handleOnChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const ClaimForm = ({
	claim, 
	claims,
	handleSubmit,
	handleOnChange,
	postStatus
} : Props) => {

	 const [warnings, setWarnings] = useState<Omit<Claim, 'id'>>({
			date: '',
			description: '',
			category: ''
		})

		const dateRef = useRef<HTMLInputElement>(null)
		const categoryRef = useRef<HTMLSelectElement>(null)
		const descriptionRef = useRef<HTMLInputElement>(null)

		const handleWarnings = () => {
			setWarnings({
				date: claim.date ? '': 'Date field cannot be left empty',
				description: claim.description ? '' : 'Description field cannot be left empty',
				category: claim.category ? '' : 'Category field cannot be left empty'
			})
		}

		const formComponents = [
			{name: 'date', type: 'date', ref: dateRef},
			{name: 'category', type: 'select', ref: categoryRef},
			{name: 'description', type: 'text', ref: descriptionRef}
		] as const;

		const handleNext = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, name: string) => {
			e.preventDefault()
			if (name === 'date') {
				categoryRef.current?.focus()
			} else {
				descriptionRef.current?.focus()
			}
		}

		const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent<HTMLInputElement>) => {
			e.preventDefault()

			if (claim.date && claim.category && claim.description) {
				handleSubmit()
				setWarnings({date: '', description: '', category: ''})
			} else {
				handleWarnings()
			}
		}


  return (
     <form>
        <fieldset>
					<legend id="claim-form-title">Claim form</legend>
          {
            formComponents.map((formField, index) => {
              return (
                <div>
                  <label htmlFor={formField.name}>Claim {formField.name}:</label>
                  <p className='warning'>{warnings[formField.name]}</p>
									<div style={{display: 'flex'}}>
										<InputField 
											formField={formField}
											claim={claim}
											warnings={warnings}
											handleOnChange={handleOnChange}
											onSubmit={onSubmit}
											categoryInput={categoryRef}
											descriptionInput={descriptionRef}
											dateInput={dateRef}
										/>
										{
											formComponents.length === index + 1 ?
											<button type="submit" onClick={e => onSubmit(e)}>Submit</button> :
											<button onClick={(e) => handleNext(e, formField.name)}>Next</button>
										}
									</div>
                </div>
              )
            })
          }
					{!(warnings.date && warnings.category && warnings.description) &&
						<RenderStatusMessage 
							requestType={'post'}
							status={postStatus}
							claims={claims}
						/>
					}
        </fieldset>
      </form>
  )
}

export default ClaimForm