import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch ,useSelector} from 'react-redux';
import { addPosts } from '../store/postSlice';
import { useNavigate } from 'react-router-dom';
import Loading from "../components/Loading"
import Spinner from 'react-bootstrap/Spinner';


const Add = () => {
  const navigate = useNavigate();
   const [title,setTitle]=useState('')
   const [desc,setDesc]=useState('')
   const [err ,setErr]=useState(false)
   const dispatch = useDispatch()
   const {error , loading}=useSelector(state=>state.postSlice)
  const formHandler= (e)=>{
    e.preventDefault();
    if (window.confirm('Are you sure you want to add')) {
      dispatch(addPosts({title:title,description:desc})).unwrap().then(()=>{
        navigate("/",{replace:true})
      }).catch(err => {
        if (err){
          setErr(true)
        }else{
          setErr(false)
        }
      })
    }
    
  }
  console.log(loading)
  return (
    <Form onSubmit={(e)=>{formHandler(e)}}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Enter your title" value={title} onChange={(e)=>{setTitle(e.target.value)}} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>description</Form.Label>
        <Form.Control as="textarea" rows={3} value={desc} onChange={(e)=>{setDesc(e.target.value)}} required/>
      </Form.Group>
      <Button variant="primary" disabled={loading||err} type='submit'>
      <Spinner
        style={{display:loading ?"inline-block":"none",transition:"all 300ms"}} 
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      <span className=""> {loading?"Loading...":"Add"}</span>
    </Button>
     <span className='ps-3 text-danger' style={{display:err?"inline":"none"}}>Error Server</span>
    </Form>
  )
}

export default Add
