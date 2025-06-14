import React from 'react'
import { Claim} from './types'

interface Props {
  claim: Claim;
}

const SingleClaim = ({claim} : Props) => {

  return (
    <div>
      <p><strong>Category:</strong> {claim.category}</p>
      <p><strong>Description:</strong> {claim.description}</p>
    </div>
  )
}

export default SingleClaim