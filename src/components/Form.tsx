import React, {useRef, useState} from 'react'
import { formData } from '../types'

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
  const [formErrors, setFormErrors] = useState<Partial<formData>>({});


  const validate = () => {
    const errors: Partial<formData> = {};
    if (!formInput.claimDate) errors.claimDate = 'Claim date is required.';
    if (!formInput.category) errors.category = 'Category is required.';
    if (!formInput.description || formInput.description.length < 10) {
      errors.description = 'Description must be at least 10 characters.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

	const wrappedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      handleSubmit(e);
      setFormErrors({});
    }
  };

	const goToCategoryInput = (e: React.MouseEvent) => {
		e.preventDefault();
		categoryRef.current?.focus();
	}

	const goToDescriptionInput = (e: React.MouseEvent) => {
		e.preventDefault();
		descriptionRef.current?.focus();
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name } = e.target;
		if (formErrors[name as keyof formData]) {
			setFormErrors(prev => ({ ...prev, [name]: undefined }));
		}
		handleFormChange(e);
	};

  return (
    <div className='form-container'>
			<form onSubmit={wrappedSubmit}>

					<div>
						<span>
							<label htmlFor="claimDate">Claim Date</label>
							<p className='errormessage'>{formErrors.claimDate ? formErrors.claimDate : ''}</p>
							<input className={formErrors.claimDate && 'error'} type="date" name="claimDate" value={formInput.claimDate} onChange={handleChange} />
						</span>
						<button type="button" onClick={goToCategoryInput}>Next</button>
					</div>

					<div>
						<span>
							<label htmlFor="category">Category</label>
							<p className='errormessage'>{formErrors.category ? formErrors.category : ''}</p>
							<input className={formErrors.category && 'error'} ref={categoryRef} name="category" value={formInput.category} onChange={handleChange} />
						</span>
							<button type="button" onClick={goToDescriptionInput}>Next</button>
					</div>

					<div>
						<span>
							<label htmlFor="description">Description</label>
							<p className='errormessage'>{formErrors.description ? formErrors.description : ''}</p>
							<input className={formErrors.description && 'error'} ref={descriptionRef} name="description" value={formInput.description} onChange={handleChange} />
						</span>
						<button type="submit">Submit</button>
					</div>

			</form>
    </div>
  )
}

export default Form