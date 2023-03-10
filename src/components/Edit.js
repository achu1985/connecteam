import axios from 'axios';
import React, { useEffect,useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate, useParams } from 'react-router-dom';

function Edit() {

  const params = useParams()
  const location = useNavigate()

  const [id,setId] = useState('')
  const [empName,setName] = useState('')
  const [empAge,setAge] = useState('')
  const [empDesg,setDesg] = useState('')
  const [empSalary,setSalary] = useState(0)

  // api call to get details of a particular employee from server
  const fetchEmployee = async ()=>{
    const result = await axios.get('http://localhost:8000/get-an-employee/'+params.id)
    setId(result.data.employee.id);
    setName(result.data.employee.uname);
    setAge(result.data.employee.age);
    setDesg(result.data.employee.desg);
    setSalary(result.data.employee.salary);
  }
  
  const handleUpdate = async (e)=>{
    e.preventDefault()
    // create body to share with backend
    const body = {
      id,
      empName,
      empAge,
      empDesg,
      empSalary
    }
    // api call
    const result = await axios.post('http://localhost:8000/update-employee',body)
    alert(result.data.message)
    location('/')
  }

  useEffect(()=>{
    fetchEmployee()
  },[])

  return (
    <div>
      <div className='mt-4'>
        <h1 style={{fontFamily:'fantasy'}} className='text-warning text-center'>EDIT  AN  EMPLOYEE</h1>
        <h3 style={{lineHeight:'40px', fontFamily:'monospace'}} className='text-success ms-5 mt-4'>If you want to edit an employee. You must fill the form given below. All fields are required</h3>
      </div>
      <div className='col-6 mt-4 ms-5'>
        <Form.Group className="mb-2" controlId="formBasicName">
        <Form.Label>NAME</Form.Label>
        <Form.Control type="text" placeholder="Enter Name" value={empName}
        onChange={(e)=>setName(e.target.value)}
        />
        </Form.Group>

        <Form.Group className="mb-2 text-light" controlId="formBasicAge">
        <Form.Label>AGE</Form.Label>
        <Form.Control type="text" placeholder="Enter Age" value={empAge}
        onChange={(e)=>setAge(e.target.value)}
        />
        </Form.Group>

        <Form.Group className="mb-2 text-light" controlId="formBasicDesg">
        <Form.Label>DESIGNATION</Form.Label>
        <Form.Control type="text" placeholder="Enter Designation"  value={empDesg}
        onChange={(e)=>setDesg(e.target.value)}
        />
        </Form.Group>

        <Form.Group className="mb-2 text-light" controlId="formBasicSalary">
        <Form.Label>SALARY</Form.Label>
        <Form.Control type="text" placeholder="Enter Salary" value={empSalary}
        onChange={(e)=>setSalary(e.target.value)}
        />
        </Form.Group>

        <div className='mt-4'>
          <Button onClick={(e)=>handleUpdate(e)} className='me-3' variant="success" type="submit">
          Update
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

export default Edit