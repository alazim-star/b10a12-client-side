
import { useNavigate } from 'react-router-dom';

import UseAuth from '../Hooks/useAuth';
import useAxiosPublic from '../Hooks/axiosPublic';


const SocialLogin = () => {
    const {signInWithGoogle}=UseAuth()
    const axiosPublic=useAxiosPublic()
    const  navigate=useNavigate()
const handleGoogleSignIn=()=>{
    signInWithGoogle()
    .then(result=>{
        console.log(result.user);
        const userInfo={
            email: result.user?.email,
            name:result.user?.displayName
        }
        axiosPublic.post('/users',userInfo)
        .then(res=>{
            console.log(res.data);
          
        })
        navigate('/')
   
    })
}

    return (
        <div>
           <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center p-2 shadow-sm bg-white btn w-full mt-5 ml-10"
        >
          <img className='w-6 h-6 mr-2 ' src="https://i.ibb.co.com/k9sCr1Z/Logo-google-icon-PNG.png" alt="" />
          <span className="text-gray-600 font-medium">Log in with Google</span>
        </button>


            </div>
      
    );
};

export default SocialLogin;