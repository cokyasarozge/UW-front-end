import React from 'react'
import { FormComponent } from './helpers'

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
  return (
    formComponents.length - 1 === index ? 
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