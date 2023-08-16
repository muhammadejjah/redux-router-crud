import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { getPost } from '../store/postSlice'


const useGetRecord = () => {
    const dispatch = useDispatch()
    const {id}=useParams();
    // console.log(id)
    useEffect(()=>{
      dispatch(getPost(id))
    },[dispatch,id])
    const {record , error ,loading}=useSelector(state=>state.postSlice)
    return{record , error ,loading}
  
}

export default useGetRecord
