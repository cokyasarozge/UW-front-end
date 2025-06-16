import { Claim } from './types'

interface Props {
  claim: Claim;
}

const SingleClaim = ({
  claim
} : Props) => {

  return (
    <div className='single-claim'>
			<p>Date: {claim.date}</p>
			<p>Id: {claim.id}</p>
			<p>Description: {claim.description}</p>
			<p>Category: {claim.category}</p>
    </div>
  )
}

export default SingleClaim