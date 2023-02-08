import React,{useState,useEffect} from 'react';
// import {a,a} from 'react-router-dom'
import axios  from 'axios';

const UserDashboard=()=> {
  const [updateData,setUpdateData]=useState({
  username:'',
  mobile:'',
  email:'',
  password:'',
  id:""
});
const handleChange=(e)=>{
  setUpdateData({...updateData,[e.target.name]:e.target.value});
}
const handleUpdate=async()=>{
  
  await axios.put(`http://localhost:4000/posts/${updateData.id}`,updateData)
  .then(()=>{alert("Updated Successfully")});
  loadUser();
  

}
  const[users,setUsers]=useState([]);

  useEffect(()=>{
    loadUser();
  },[])
  const loadUser=async()=>{
    const result= await axios.get('http://localhost:4000/posts');
    setUsers(result.data);
  }
  const handleClick=async(id)=>{
    await axios.delete('http://localhost:4000/posts/'+id)
    .then((res)=> alert("delete Successfully"));
    loadUser();
     
    

  }
  return (
    <>
   <div className='container'>
   <h1 className='text-center'>User Dashboard</h1>
   <a className='btn btn-primary w-40 ' to='/user/add'>Add Users</a>
     <h1>Tables</h1>
     <table class="table">
  <thead class=" table-dark text-white">
    <tr>
      <th scope="col">id</th>
      <th scope="col">UserName</th>
      <th scope="col">Email</th>
      <th scope="col">Mobile Num</th>
      <th scope="col">Password</th>
      <th scope="col" >Actions</th>
    </tr>
  </thead>
  <tbody>
     
{users && users.map((user,index)=>(
  <tr>
  <th scope='row'>{index+1}</th>
    
    <td>{user.username}</td>
    <td>{user.email}</td>
    <td>{user.mobile}</td>
    <td>{user.password}</td>
    <td style={{display:"flex",justifyContent:"space-between"}}>
    <button className='btn btn-primary '><i class="fa fa-eye" aria-hidden="true"></i></button>
    <button className='btn btn-info 'data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>setUpdateData({
      username:user.username,
      email:user.email,
      mobile:user.mobile,
      password:user.password,
      id:user.id
    })}>Edit</button>
    <button className='btn btn-danger'onClick={()=>handleClick(user.id)}>Delete</button>

      
    </td>
  </tr>))} 
   
  </tbody>
</table>
   </div>
   <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Update User</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
       <div className='container'>
        <div className="row text-center">
          <div className="col">
            <h1>Update User Form</h1>
          </div>
          <div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">UserName</label>
  <input type="text" class="form-control" id="exampleFormControlInput1"value={updateData.username} name='username' onChange={(e)=>handleChange(e)}/>
</div>
          
<div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Mobile Number</label>
  <input type="text" class="form-control" id="exampleFormControlInput1" value={updateData.mobile}name='mobile' onChange={(e)=>handleChange(e)} />
</div>
<div class="mb-3">

  <label for="exampleFormControlInput1" class="form-label">Email address</label>
  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" value={updateData.email} onChange={(e)=>handleChange(e)} name='email'/>
</div>
<div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Password</label>
  <input type="password" class="form-control" id="exampleFormControlInput1" value={updateData.password}name='password' onChange={(e)=>handleChange(e)} />
</div>
        </div>
      </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal"onClick={()=>handleUpdate()}>Save changes</button>
      </div>
    </div>
  </div>
</div>
</>
  );
}

export default UserDashboard;