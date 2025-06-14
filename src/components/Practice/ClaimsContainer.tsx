import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ExistingClaims from './ExistingClaims';
import ClaimsForm from './ClaimsForm';
import { Claim, FormErrors, formComponents} from './helpers'
import type { RootState, AppDispatch } from '../../store/store';
import { fetchClaims, submitClaim } from '../../store/claimsSlice';
import './styles.css';

// TO DO
// SUCCESSFULLY SUBMIT CLAIM
// SUBMIT WITH EMPTY FIELDS
// WHEN THERE IS VALIDATION ERRORS I NEED TO GET RID OF SUCCESS MESSAGE

const ClaimsContainer = () => {
  const dispatch = useDispatch<AppDispatch>();

  const claimsData = useSelector((state: RootState) => state.claims);
  const claimReset = {date: '', category: '', description: '', id: null}
  
  const [claim, setClaim] = useState<Claim>(claimReset)
  const [claims, setClaims] = useState<Claim[]>(claimsData.claims)
  const [error, setError] = useState<FormErrors>({date: false, category: false, description: false})
  

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setClaim(prev => ({...prev, [name]: value, id: Date.now() }))
  }

  // GET CLAIMS
  useEffect(() => {
    // setClaims(claimsData) why can't i use this one? explain.
    dispatch(fetchClaims());
  }, [dispatch]); // why use dispatch here?


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newError: FormErrors = {
      date: !claim.date.trim(),
      category: !claim.category.trim(),
      description: !claim.description.trim()
    };

    setError(newError)
    
    const hasError = Object.values(newError).some(Boolean);

    if (!hasError) {
        setClaims([...claims, claim])
        
      // POST CLAIM
      try {
        await dispatch(submitClaim(claim)).unwrap(); // why use unwrap here? what is unwrap?
        await dispatch(fetchClaims());
        setClaim(claimReset);
      } catch (err) {
        console.error('Submission failed:', err);
      }
    } 
  }

  return (
    <div>
      <h3>Claims Form</h3>
      <ClaimsForm 
        handleSubmit={handleSubmit}
        formComponents={formComponents}
        error={error}
        claim={claim}
        handleOnChange={handleOnChange}
      />

      {/* // TO DO: need to store this in a state in useeffect  */}
      {claimsData.postStatus === 'succeeded' && <p className='succeeded'>Claim has been submitted ✅</p>}
      {claimsData.postStatus === 'loading' && <p className='loading'>Submitting claim...</p>}
      {claimsData.postStatus === 'failed' && <p className='error'>Problem with submitting claim, try again</p>}

      <ExistingClaims 
        fetchStatus={claimsData.fetchStatus}
        setClaims={setClaims} 
        claims={claimsData.claims} 
      />
    </div>
  )
}

export default ClaimsContainer