import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import './App.css';
import { fetchClaims, submitClaim } from './store/claimsSlice';
import type { AppDispatch, RootState } from './store/store';
import Form from './components/Form';


interface formData {
  claimDate: string;
  category: string;
  description: string;
}

function App() {
  const [formInput, setFormInput] = useState<formData>({claimDate: '', category: '', description: ''})
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: RootState) => state.claims.status);
  const error = useSelector((state: RootState) => state.claims.error);
  const claims = useSelector((state: RootState) => state.claims.claims);

  useEffect(() => {
    dispatch(fetchClaims());
  }, [dispatch, formInput]);


  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormInput(prev => ({ ...prev, [name]: value }));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(submitClaim(formInput));
    setFormInput({claimDate: '', category: '', description: ''})
    setTimeout(() => dispatch(fetchClaims()), 3000)
  }

  const disabled = !formInput.description || !formInput.category || !formInput.claimDate

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
          {
            claims.map(claim => {
              return (
                <li>{claim.description}</li>
              )
            })
          }
        </ul>
      </header>
    </div>
  );
}

export default App;