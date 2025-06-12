import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { ClaimData } from './types'

import './App.css';
import { fetchClaims, submitClaim } from './store/claimsSlice';
import type { AppDispatch, RootState } from './store/store';
import Form from './components/Form';
import ExistingClaims from './components/ExistingClaims';


function App() {
  const [formInput, setFormInput] = useState<ClaimData>({claimDate: '', category: '', description: ''})
  const dispatch = useDispatch<AppDispatch>();
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

  return (
    <div className="App">
      <div className="App-container">
        <h3>
          Claims Handling Form
        </h3>
        <Form 
            formInput={formInput}
            handleSubmit={handleSubmit}
            handleFormChange={handleFormChange}
        />
          <ExistingClaims
            claims={claims}
          />
      </div>
    </div>
  );
}

export default App;