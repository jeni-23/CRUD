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
	const [error,setError]=useState({});
		
const handleChange=(e)=>{
	// setFormData({...formData,[e.target.name]:e.target.value});
		setFormData({...formData,[e.target.name]:e.target.value});
		if(!e.target.value){
			setError({...error,[e.target.name]:`${e.target.name} can not be blank` });

		}else{
			setError("");
		}
}
const handleSubmit=async(e)=>{
	e.preventDefault();
	const regEx= /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
		const phone= /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
		
	let response= await axios.post('http://localhost:4000/posts',formData);
	// if(response){
	// 	alert("data submit successfully");   
	// }else{
	// 	alert("something went wrong");
	// }
	if(!formData.username){
			setError({...error,username:"UserName can not be blank"})
		}
		else if(!formData.email){
			setError({...error,email:"Email can not be blank"})
		}
		else if(!formData.email.match(regEx)){
			setError({...error,email:'invalid Email id'})
		}
		else if(!formData.mobile){
			setError({...error,mobile:'Mobile Can not be blank'})
		}
		else if(!formData.mobile.match(phone)){
			setError({...error,mobile:'Invalid mobile Number'})
		}
		else if(!formData.password){
			setError({...error,password:'City can not be blank'})
		}else if(response){
		alert("data submit successfully");   
	}
	

}
	return(
      <div className='container main'>
      	<div className="row">
      		<div className="col">
      			<h1>Add User Form</h1>
      		</div>
      		<div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label ">UserName</label>
  <input type="text" class="form-control" id="exampleFormControlInput1"value={formData.username} name='username' onChange={(e)=>handleChange(e)}/>
  <span style={{color:"red"}}>{error.username}</span>
</div>
      		
<div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Mobile Number</label>
  <input type="text" class="form-control" id="exampleFormControlInput1" value={formData.mobile}name='mobile' onChange={(e)=>handleChange(e)} />
  <span style={{color:"red"}}>{error.mobile}</span>
</div>
<div class="mb-3">

  <label for="exampleFormControlInput1" class="form-label">Email address</label>
  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" value={formData.email} onChange={(e)=>handleChange(e)} name='email' required/>
  <span style={{color:"red"}}>{error.email}</span>
</div>
<div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Password</label>
  <input type="password" class="form-control" id="exampleFormControlInput1" value={formData.password}name='password' onChange={(e)=>handleChange(e)} />
  <span style={{color:"red"}}>{error.password}</span>
</div>
<div class="mb-3">
<button className='btn btn-success' onClick={(e)=>handleSubmit(e)}>Add User</button>
</div>
      	</div>
      </div>
		)
}
export default AddUser;