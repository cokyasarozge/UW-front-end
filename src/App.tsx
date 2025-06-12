import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { ClaimData } from './types'

import './App.css';
import { fetchClaims, submitClaim } from './store/claimsSlice';
import type { AppDispatch, RootState } from './store/store';
import Form from './components/Form';


function App() {
  const [formInput, setFormInput] = useState<ClaimData>({claimDate: '', category: '', description: ''})
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: RootState) => state.claims.fetchStatus);
  const error = useSelector((state: RootState) => state.claims.fetchError);
  const claims = useSelector((state: RootState) => state.claims.claims);

  useEffect(() => {
    dispatch(fetchClaims());
  }, [dispatch]);


  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormInput(prev => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(submitClaim(formInput)).unwrap();
      await dispatch(fetchClaims());
      setFormInput({ claimDate: '', category: '', description: '' });
    } catch (err) {
      console.error('Submission failed:', err);
    }
  };

  const disabled = !formInput.description || !formInput.category || !formInput.claimDate

  const statusText =
  status === 'loading'
    ? 'Loading claims...'
    : status === 'failed'
    ? `Error: ${error}`
    : null; 

  return (
    <div className="App">
      <header className="App-header">
        <h3>
          Claims Handling Form
        </h3>
        <Form 
            formInput={formInput}
            handleSubmit={handleSubmit}
            handleFormChange={handleFormChange}
            disabled={disabled}
        />
        {claims.length ? <p>Existing claims:</p> : null}
        <ul>
          {status === 'succeeded' ?
            claims.map(claim => {
              return (
                <li>{claim.description}</li>
              )
            }) : <p>{statusText}</p>
          }
        </ul>
      </header>
    </div>
  );
}

export default App;