import axios from "axios";
import { useNavigate } from "react-router-dom";
import UseAuth from "./useAuth";


 const axiosSecure=axios.create({
    baseURL:'https://b10a12-server-side-one.vercel.app'
})
const useAxiosSecure = () => {
    const navigate=useNavigate()
    const {signOutUser}=UseAuth()
    //request interceptors to add authorization header for every secure call to the api 
    axiosSecure.interceptors.request.use(function(config) {
        const token=localStorage.getItem('access-token')
       // console.log('request stopped by interceptors before adding token ',token);
        config.headers.authorization =`Bearer ${token}`
        return config
    },function (error) {
        return Promise.reject(error)
    })

//interceptors 401 and 403 status 
axiosSecure.interceptors.response.use(function(response){
    return response
},async(error)=>{
    const status=error.response.status
    // console.log('status error in the interceptors',status);
    //for 401 or logout the user and move the user to the login page
    if (status===401 || status === 403) {
        await signOutUser()
        navigate('/login')
        
    }
    return Promise.reject(error)
})


return axiosSecure

};

export default useAxiosSecure