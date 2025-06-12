import React, {useRef} from 'react'

interface formData {
	claimDate: string;
	category: string;
	description: string;
}

interface Props {
	handleSubmit: (e: React.FormEvent) => void;
	handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	formInput: formData;
	disabled: boolean;
}

const Form : React.FC<Props> = ({
	formInput,
	handleSubmit,
	handleFormChange,
	disabled
}) => {
	const categoryRef = useRef<HTMLInputElement>(null);
	const descriptionRef = useRef<HTMLInputElement>(null);

	const goToCategoryInput = (e: React.MouseEvent) => {
		e.preventDefault();
		categoryRef.current?.focus();
	}

	const goToDescriptionInput = (e: React.MouseEvent) => {
		e.preventDefault();
		descriptionRef.current?.focus();
	};
  return (
    <div>
			<form onSubmit={handleSubmit}>
				<div>
					<label>
						Claim Date
						<input type="date" name="claimDate" value={formInput.claimDate} onChange={handleFormChange} />
					</label>
					<button onClick={goToCategoryInput}>Next</button>
				</div>
				<div>
				<label>
					Category
					<input ref={categoryRef} name="category" value={formInput.category} onChange={handleFormChange} />
					</label>
					<button onClick={goToDescriptionInput}>Next</button>
				</div>
				<div>
					<label>
						Description
						<input ref={descriptionRef} name="description" value={formInput.description} onChange={handleFormChange} />
					</label>
					<button 
						disabled={disabled} 
						type="submit"
					>
						Submit
					</button>
				</div>
			</form>
    </div>
  )
}

export default Form