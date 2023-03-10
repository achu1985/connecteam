import axios from 'axios';
import React,{useState,useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link , useNavigate} from 'react-router-dom';
import uuid from 'react-uuid';

function Add() {

  const [id,setId] = useState('')
  const [empName,setName] = useState('')
  const [empAge,setAge] = useState('')
  const [empDesg,setDesg] = useState('')
  const [empSalary,setSalary] = useState(0)

  let location = useNavigate()

  useEffect(()=>{
    setId(uuid().slice(0,5));
  },[])

  const handleAdd = async (e)=>{
    // to prevent refresh of page
    e.preventDefault()
    // to generate unique ID
    setId(uuid().slice(0,5));
    // create body to share with backend
    const body = {
      id,
      empName,
      empAge,
      empDesg,
      empSalary
    }
    console.log(body);
    // api call
    const result = await axios.post('http://localhost:8000/add-employee',body)
    alert(result.data.message);
    // rediarect to admin
    location('/')
  }

  return (
    <div>
      <div className='mt-4'>
        <h1 style={{fontFamily:'fantasy'}} className='text-warning text-center'>ADD  AN  EMPLOYEE</h1>
        <h3 style={{lineHeight:'40px', fontFamily:'monospace'}} className='text-success ms-5 mt-4'>If you want to add an employee. You must fill the form given below. All fields are required</h3>
      </div>
      <div className='col-6 mt-4 ms-5'>
        <Form.Group className="mb-2" controlId="formBasicName">
        <Form.Label>NAME</Form.Label>
        <Form.Control type="text" placeholder="Enter Name" 
        onChange={(e)=>setName(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-2 text-light" controlId="formBasicAge">
        <Form.Label>AGE</Form.Label>
        <Form.Control type="text" placeholder="Enter Age"
        onChange={(e)=>setAge(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-2 text-light" controlId="formBasicDesg">
        <Form.Label>DESIGNATION</Form.Label>
        <Form.Control type="text" placeholder="Enter Designation" 
        onChange={(e)=>setDesg(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-2 text-light" controlId="formBasicSalary">
        <Form.Label>SALARY</Form.Label>
        <Form.Control type="text" placeholder="Enter Salary"
        onChange={(e)=>setSalary(e.target.value)} />
        </Form.Group>

        <div className='mt-4'>
          <Button onClick={(e)=>handleAdd(e)} className='me-3' variant="success" type="submit">
          Add
          </Button>

          <Link to={'/'}>
            <Button variant="danger" type="submit">
            Close
            </Button>
          </Link>
        </div >
      </div>
    </div>
  )
}

export default Add