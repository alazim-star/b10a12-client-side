import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';

import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';



import { AuthContext } from '../AuthProvider/AuthProvider';
import useAxiosPublic from '../Hooks/axiosPublic';
import SocialLogin from '../Component/SocialLogin';
import Lottie from "lottie-react";
import lottie from '../../src/assets/lottie.json'



const Register = () => {
  const axiosPublic=useAxiosPublic()
  const {register,handleSubmit,reset,formState: { errors }} =useForm();
const {createUser,updateUserProfile}=useContext(AuthContext)
const navigate=useNavigate()
const onSubmit=data=>{
  // console.log(data);
  createUser(data.email,data.password)
  .then(result=>{
    const loggedUser=result.user 
    // console.log(loggedUser);
    updateUserProfile(data.name,data.photoURL)
    .then(()=>{
// create user entry in the database 
const userInfo={
  name: data.name,
  email:data.email,
 photoURL:data.photoURL
}
axiosPublic.post('https://b10a12-server-side-one.vercel.app/users',userInfo)
.then(res=>{
  if (res.data.insertedId) {
    // console.log('user added successfully');
          // console.log("user profile updated");
          reset()
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User Create Successfully ",
            showConfirmButton: false,
            timer: 1500
          });
          navigate("/")
  }
})

    })
    .catch(error=>console.log(error))
  })
}



    return (
 <>
  <Helmet>
         <title>SCHOLAR | Sign Up </title>
        
       </Helmet>
 <div>
<div className="hero bg-base-200 min-h-screen w-full">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Register Now ! </h1>
     
      <Lottie
  animationData={lottie}
  loop={true}
  autoplay={true}
  style={{ width: "100%", height: "auto", maxWidth: "400px" }}
/>

 
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>

{/* name field */}
          <input {...register('name',{ required: true })} name='name' type="text" placeholder="your name" className="input input-bordered"/>
          {errors.name && <span className='text-red-600'>Name is required</span>}



        </div>
 {/*photo url field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Your Photo URL</span>
          </label>
       <input {...register('photoURL',{ required: true })} type="url" placeholder="photoURL " className="input input-bordered"/>
          {errors.photoURL && <span className='text-red-600'>Photo Url is required</span>}
        </div>

{/* email field  */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input {...register('email',{ required: true })} name="email" type="email" placeholder="email" className="input input-bordered"/>
          {errors.email && <span className='text-red-600'>Email is required</span>}

        </div>
 {/* password field  */}

        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
<input 
  {...register('password', { 
    required: "Password is required", 
    minLength: { value: 6, message: "Password must be at least 6 characters" },
    maxLength: { value: 20, message: "Password cannot exceed 20 characters" },
    pattern: { 
      value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/, 
      message: "Password must include at least one uppercase letter, one lowercase letter, and one number" 
    }
  })} 
  name="password" 
  type="password" 
  placeholder="Password" 
  className="input input-bordered" 
/>
{errors.password && <span className='text-red-600'>{errors.password.message}</span>}



          <label className="label">
            <a href="" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">

          {/* button  */}
          <input className="btn btn-primary"  type="submit" name="" value="Sign up"/>
        

        </div>
        <p className='ml-14'><small>All Ready Have An Account<Link
       to="/login"><span className='text-red-600 underline '>Log In</span></Link></small></p>

       <SocialLogin></SocialLogin>
      </form>
     
     
    </div>
  </div>
</div>
        </div>
 </>
    );
};

export default Register;