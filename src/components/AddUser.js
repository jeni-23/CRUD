import React,{useState} from 'react';
import './AddUser.css';
import axios from 'axios';

const AddUser=()=>{
	const [formData,setFormData]=useState({
	username:'',
	mobile:'',
	email:'',
	password:''
});
const handleChange=(e)=>{
	setFormData({...formData,[e.target.name]:e.target.value});
}
const handleSubmit=async(e)=>{
	e.preventDefault();
	let response= await axios.post('http://localhost:4000/posts',formData);
	if(response){
		alert("data submit successfully");
	}else{
		alert("something went wrong");
	}

}
	return(
      <div className='container'>
      	<div className="row text-center">
      		<div className="col">
      			<h1>Add User Form</h1>
      		</div>
      		<div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">UserName</label>
  <input type="text" class="form-control" id="exampleFormControlInput1"value={formData.username} name='username' onChange={(e)=>handleChange(e)}/>
</div>
      		
<div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Mobile Number</label>
  <input type="text" class="form-control" id="exampleFormControlInput1" value={formData.mobile}name='mobile' onChange={(e)=>handleChange(e)} />
</div>
<div class="mb-3">

  <label for="exampleFormControlInput1" class="form-label">Email address</label>
  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" value={formData.email} onChange={(e)=>handleChange(e)} name='email'/>
</div>
<div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Password</label>
  <input type="password" class="form-control" id="exampleFormControlInput1" value={formData.password}name='password' onChange={(e)=>handleChange(e)} />
</div>
<div class="mb-3">
<button className='btn btn-success' onClick={(e)=>handleSubmit(e)}>Add User</button>
</div>
      	</div>
      </div>
		)
}
export default AddUser;