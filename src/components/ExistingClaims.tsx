import React from 'react'
import { ClaimData } from '../types'
import { useSelector } from 'react-redux'
import type { RootState } from '../store/store';

interface Props {
    claims: ClaimData[];
}
const ExistingClaimsComponent : React.FC<Props> = ({
    claims
}) => {

	const status = useSelector((state: RootState) => state.claims.fetchStatus);
	const error = useSelector((state: RootState) => state.claims.fetchError);

	const statusText =
  status === 'loading'
    ? 'Loading claims...'
    : status === 'failed'
    ? `Error: ${error}`
    : null; 

  return (
    <div>
			<div className='existing-claims-container'>
				{claims.length ? <p>Existing claims:</p> : null}
				<ul>
				{status === 'succeeded' ?
						claims.map(claim => {
							console.log(claim)
						return (
								<li key={`${claim.id}-${claim.claimDate}`}>{claim.description}</li>
						)
						}) : <p>{statusText}</p>
				}
				</ul>
    	</div>
    </div>
  )
}

const ExistingClaims = React.memo(ExistingClaimsComponent);

export default ExistingClaims;
