import React,{useState,useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Admin() {

  const [allEmployees,setAllEmployees] = useState([])

  const fetchData = async ()=>{
    const result = await axios.get('http://localhost:8000/get-all-employees')
    setAllEmployees(result.data.employees);
  }
  console.log(allEmployees);

  useEffect(()=>{
    fetchData()
  },[])

  // Delete
  const handleDelete = async (id)=>{
    const result =  axios.delete('http://localhost:8000/delete-employee/'+id)
    alert((await result).data.message);
    fetchData()
  }

  return (
    <div>
        <div className='container-fluid mt-5'>
            <h1 style={{fontWeight:'bolder'}} className='text-warning text-center'><i class="fa-solid fa-users"></i>Employee Management App <br></br>

            <Link to={'/add'}><a className='b1 btn btn-light'>Add Employee</a></Link></h1>
        </div>

        {/* Table */}
        <div className='table mt-5'>
        <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Emp Id</th>
          <th className='text-light'>Name</th>
          <th className='text-danger'>Age</th>
          <th className='text-primary'>Designation</th>
          <th className='text-success'>Salary</th>
          <th className='text-warning'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          allEmployees?.map((item)=>(
            <tr>
          <td>{item.id}</td>
          <td>{item.uname}</td>
          <td>{item.age}</td>
          <td>{item.desg}</td>
          <td>{item.salary} $</td>
          <td>
            <Link to={'edit/'+item.id}><button className='btn btn-success me-3'>Edit</button></Link >
            <button onClick={()=>handleDelete(item.id)} className='btn btn-danger me-3'>Delete</button>
          </td>
        </tr>
          ))
        }
      </tbody>
    </Table>
        </div>
    </div>
  )
}

export default Admin