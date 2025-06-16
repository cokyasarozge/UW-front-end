import React from 'react'
import { Claim } from './types'

import './styles.css'
import { Status } from '../../store/types';

interface Props {
  status: Status;
  claims: Claim[];
  requestType: 'post' | 'fetch';
}
const RenderStatusMessage = ({
  claims, 
  requestType,
  status
} : Props) => {
  if (status.error) {
    return <p className='error'>There was a problem {requestType}ing the data</p>
  }

  if (status.isLoading) {
    return <p className='loading'>We are {requestType}ing data...</p>
  }

  if (status.fulfilled) {
    if (claims.length) {
      return <p className='success'>Successfully {requestType}ed the data:</p>
    } else {
      return <p>There is currently no data to show</p>
    }
  }

  return null;
};
export default RenderStatusMessage