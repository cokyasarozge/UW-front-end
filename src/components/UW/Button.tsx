import React from 'react'
import { FormComponent } from './types'

interface Props {
    goToNext: React.MouseEventHandler<HTMLButtonElement>;
    index: number;
    formComponents: FormComponent[];
    formItem: FormComponent;
}

const Button = ({
    goToNext,
    index,
    formComponents,
    formItem
} : Props) => {
  const isLast = formComponents.length - 1 === index
  return (
    isLast ? 
      <button type="submit">Submit</button>
    :
    <button 
      type="button" 
      onClick={goToNext}
      aria-label={`Go to next field after ${formItem.name}`}
    >
      Next
    </button>
              
  )
}

export default Button