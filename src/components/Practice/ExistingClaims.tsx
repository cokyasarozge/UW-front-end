import React from 'react'
import SingleClaim from './SingleClaim';

interface Claim {
    date: string;
    category: string;
    description: string;
    id: number | null;
}

interface Props {
    claims: Claim[];
    setClaims: React.Dispatch<React.SetStateAction<Claim[]>>;
}

const ExistingClaims : React.FC<Props> = ({claims, setClaims}) => {
  return (
    <div className='existing-claims'>
        <h5>Existing Claims</h5>
        {claims.map((item) => {
            return (
                <SingleClaim
                    key={item.id} 
                    claims={claims} 
                    claim={item} 
                    setClaims={setClaims} 
                />
            )
        })}
    </div>
  )
}

export default ExistingClaims