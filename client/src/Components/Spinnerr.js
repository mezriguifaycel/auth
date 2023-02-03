import React from 'react'
import Spinner from 'react-bootstrap/Spinner';
import { useSelector } from 'react-redux';


const Spinnerr = () => {
    const isLoading = useSelector(state=> state.Post.isLoading)
  return (
    <div>
       {isLoading && <Spinner animation="grow" variant="info" />}
    </div>
  )
}

export default Spinnerr