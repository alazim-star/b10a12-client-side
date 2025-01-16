import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "./useAxiosSecure";
import UseAuth from "./useAuth";


const useScholarship = () => {
    // use tran stack query 
    const axiosSecure=useAxiosSecure()
    const {user}=UseAuth()
const {refetch,data:scholarship=[]}=useQuery({
queryKey:['scholarship',user?.email],
queryFn:async()=>{
    const res=await axiosSecure.get(`/applications?email=${user.email}`)
    return res.data
}
})

return[scholarship,refetch]

};

export default useScholarship;