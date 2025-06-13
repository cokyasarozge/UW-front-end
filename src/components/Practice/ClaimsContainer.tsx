import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import ExistingClaims from './ExistingClaims';
import ClaimsForm from './ClaimsForm';
import { Claim, Error, formComponents} from './helpers'
import { useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../../store/store';
import { fetchClaims, submitClaim } from '../../store/claimsSlice';

const ClaimsContainer = () => {
    const claimsData = useSelector((state: RootState) => state.claims.claims);
    
    const [claim, setClaim] = useState<Claim>({date: '', category: '', description: '', id: null})
    const [claims, setClaims] = useState<Claim[]>(claimsData)
    const [error, setError] = useState<Error>({date: false, category: false, description: false})
    const dispatch = useDispatch<AppDispatch>();

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setClaim(prev => ({...prev, [name]: value, id: Date.now() }))
    }

      // GET CLAIMS
    useEffect(() => {
      // setClaims(claimsData) why can't i use this one? explain.
      dispatch(fetchClaims());
    }, [dispatch]); // why use dispatch here?
 

    console.log('claimsData', claimsData)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const newError: Error = {
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
            await dispatch(submitClaim(claim)).unwrap();
            await dispatch(fetchClaims());
            setClaim({ date: '', category: '', description: '', id: null });
          } catch (err) {
            console.error('Submission failed:', err);
          }
  

        } 
    }

  return (
    <div>
        <h1>Claims Form</h1>
        <ClaimsForm 
            handleSubmit={handleSubmit}
            formComponents={formComponents}
            error={error}
            claim={claim}
            handleOnChange={handleOnChange}
        />
        <ExistingClaims setClaims={setClaims} claims={claimsData} />
    </div>
  )
}

export default ClaimsContainer