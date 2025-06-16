import React, {useState, useEffect} from 'react'
import SingleClaim from './SingleClaim';
import ClaimForm from './ClaimForm';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchClaims, submitClaim } from '../../store/claimsSlice';
import RenderStatusMessage from './RenderStatusMessage';
import './styles.css'


const ClaimsContainer = () => {
  const claimsData = useSelector((state : RootState) => state.claims)
  const [claim, setClaim] = useState({id: 0, description: '', date: '', category: ''})

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchClaims())
  }, [dispatch])

  const handleSubmit = async () => {
    await dispatch(submitClaim(claim))
    await dispatch(fetchClaims())
    setClaim({id: 0, description: '', date: '', category: ''})
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setClaim(prev => ({...prev, [name]: value, id: Date.now()}))
  }

  return (
    <div>
      <h1>Claims form</h1>
        <ClaimForm 
          handleSubmit={handleSubmit}
          handleOnChange={handleOnChange}
          claim={claim}
          claims={claimsData.claims}
          postStatus={claimsData.postStatus}
        />

        <RenderStatusMessage 
          requestType={'fetch'}
          status={claimsData.fetchStatus}
          claims={claimsData.claims}
        />

        {claimsData.claims.map(c => {
          return (
            <SingleClaim 
              claim={c}
            />
          )
        })
      }
    </div>
  )
}

export default ClaimsContainer