// import React, {useRef, useState, useEffect} from 'react'
// import { useDispatch } from 'react-redux'
// import { ClaimData } from '../types'
// import { useSelector } from 'react-redux'
// import type { RootState } from '../store/store';
// import { fetchClaims, submitClaim } from '../store/claimsSlice';
// import type { AppDispatch } from '../store/store';


// const FormComponent : React.FC = () => {
//   const status = useSelector((state: RootState) => state.claims.postStatus);
//   const error = useSelector((state: RootState) => state.claims.postError);

// 	const categoryRef = useRef<HTMLInputElement>(null);
// 	const descriptionRef = useRef<HTMLInputElement>(null);
	
// 	const [formErrors, setFormErrors] = useState<Partial<ClaimData>>({});

// 	const [formInput, setFormInput] = useState<ClaimData>({claimDate: '', category: '', description: ''})
  
// 	const dispatch = useDispatch<AppDispatch>();

//   useEffect(() => {
//     dispatch(fetchClaims());
//   }, [dispatch]);

//   const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormInput(prev => ({ ...prev, [name]: value }));
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await dispatch(submitClaim(formInput)).unwrap();
//       await dispatch(fetchClaims());
//       setFormInput({ claimDate: '', category: '', description: '' });
//     } catch (err) {
//       console.error('Submission failed:', err);
//     }
//   };

//   const validate = () => {
//     const errors: Partial<ClaimData> = {};
//     if (!formInput.claimDate) errors.claimDate = 'Claim date is required.';
//     if (!formInput.category) errors.category = 'Category is required.';
//     if (!formInput.description || formInput.description.length < 10) {
//       errors.description = 'Description must be at least 10 characters.';
//     }
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

// 	const wrappedSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (validate()) {
//       handleSubmit(e);
//       setFormErrors({});
//     }
//   };

// 	const goToNext = (e: React.MouseEvent, btn: React.RefObject<HTMLInputElement | null>) => {
// 		e.preventDefault();
// 		btn.current?.focus();
// 	};

	
// 	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		const { name } = e.target;
// 		if (formErrors[name as keyof ClaimData]) {
// 			setFormErrors(prev => ({ ...prev, [name]: undefined }));
// 		}
// 		handleFormChange(e);
// 	};

// 	console.log('render form')
//   return (
//     <div className='form-container'>
// 			<form onSubmit={wrappedSubmit}>

// 					<div>
// 						<span>
// 							<label htmlFor="claimDate">Claim Date</label>
// 							<p className='errormessage'>{formErrors.claimDate ? formErrors.claimDate : ''}</p>
// 							<input className={formErrors.claimDate && 'error'} type="date" name="claimDate" value={formInput.claimDate} onChange={handleChange} />
// 						</span>
// 						<button type="button" onClick={(e) => goToNext(e, categoryRef)}>Next</button>
// 					</div>

// 					<div>
// 						<span>
// 							<label htmlFor="category">Category</label>
// 							<p className='errormessage'>{formErrors.category ? formErrors.category : ''}</p>
// 							<input className={formErrors.category && 'error'} ref={categoryRef} name="category" value={formInput.category} onChange={handleChange} />
// 						</span>
// 							<button type="button" onClick={(e) => goToNext(e, descriptionRef)}>Next</button>
// 					</div>

// 					<div>
// 						<span>
// 							<label htmlFor="description">Description</label>
// 							<p className='errormessage'>{formErrors.description ? formErrors.description : ''}</p>
// 							<input className={formErrors.description && 'error'} ref={descriptionRef} name="description" value={formInput.description} onChange={handleChange} />
// 						</span>
// 						{error && <p>{error}</p> }
// 						<button type="submit">{status === 'loading' ? 'Loading' : 'Submit'}</button>
// 					</div>

// 			</form>
//     </div>
//   )
// }

// const Form = React.memo(FormComponent);

// export default Form;

import React from 'react'

const Form = () => {
  return (
    <div>Form</div>
  )
}

export default Form