import React, {useState} from 'react'
import ClaimsForm from './ClaimsForm';
import { useDispatch } from 'react-redux'
import { Claim, formComponents} from './helpers'
import type { AppDispatch } from '../../store/store';
import { deleteClaim, editClaim as editClaimAction, fetchClaims } from '../../store/claimsSlice';


interface Props {
    claim: Claim;
    claims: Claim[];
    setClaims: React.Dispatch<React.SetStateAction<Claim[]>>;
}

const SingleClaim = ({claim, claims, setClaims} : Props) => {
    const [editMode, setEditMode] = useState(false)
    const [editClaim, setEditClaim] = useState({date: claim.date, category: claim.category, description: claim.description, id: claim.id})
    const dispatch = useDispatch<AppDispatch>();


    const handleDelete = (id: number | null) => {
        setClaims(claims.filter(item => item.id !== id))
        // DELETE CLAIM
        dispatch(deleteClaim(id))
    }   

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, id: number | null) => {
        const { name, value } = e.target
        setEditClaim(prev => ({...prev, [name]: value}))
    }

    const handleSubmitEdit = (e: React.FormEvent, id: number | null) => {
        e.preventDefault()
        setClaims(claims.map(item => item.id === id ? editClaim : {...item}))
        setEditMode(false)

        // PATCH CLAIM
        dispatch(editClaimAction(editClaim));
    }

  return (
    <div>
        <p>category: {claim.category}</p>
        <p>description: {claim.description}</p>
        <button onClick={() => handleDelete(claim.id)}>Delete</button>
        {editMode ? 
        <ClaimsForm 
            handleSubmit={(e) => handleSubmitEdit(e, claim.id)}
            formComponents={formComponents}
            error={{date: false, category: false, description: false}}
            claim={editClaim}
            handleOnChange={(e) => handleChange(e, claim.id)}
        />
        : <button onClick={() => setEditMode(true)}>Edit</button>}
    </div>
  )
}

export default SingleClaim