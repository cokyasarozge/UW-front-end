// import React from 'react'
// import { useSelector } from 'react-redux'
// import type { RootState } from '../../store/store';

// const ExistingClaimsComponent : React.FC = () => {
//   const claims = useSelector((state: RootState) => state.claims.claims);

// 	const status = useSelector((state: RootState) => state.claims.fetchStatus);
// 	const error = useSelector((state: RootState) => state.claims.fetchError);

// 	const statusText =
//   status === 'loading'
//     ? 'Loading claims...'
//     : status === 'failed'
//     ? `Error: ${error}`
//     : null; 

// 	console.log('render existing claims')
//   return (
//     <div>
// 			<div className='existing-claims-container'>
// 				{claims.length ? <p>Existing claims:</p> : null}
// 				<ul>
// 				{status === 'succeeded' ?
// 						claims.map(claim => {
// 						return (
// 								<li key={`${claim.id}-${claim.claimDate}`}>{claim.description}</li>
// 						)
// 						}) : <p>{statusText}</p>
// 				}
// 				</ul>
//     	</div>
//     </div>
//   )
// }

// const ExistingClaims = React.memo(ExistingClaimsComponent);

// export default ExistingClaims;

import React from 'react'

const ExistingClaims = () => {
  return (
    <div>ExistingClaims</div>
  )
}

export default ExistingClaims