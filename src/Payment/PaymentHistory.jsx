import { useQuery } from "@tanstack/react-query";
import UseAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";



const PaymentHistory = () => {
    const {user}=UseAuth()
const axiosSecure=useAxiosSecure()



    const {data: payments=[]}=useQuery({
        queryKey:['payments',user.email],
        queryFn:async()=>{
            const res=await axiosSecure.get(`/payments/${user.email}`)
            return res.data
        }
    })

    return (
        <div>
          <h2>Total Payments:{payments.length}</h2>
<div>
<div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>Price</th>
        <th>Transaction Id</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        payments.map((payment,index)=><tr key={payment._id}>
        <th>{index + 1}</th>
        <td>${payment.applicationFees
        }</td>
        <td>{payment.
transactionId}</td>
        <td>{payment.
status}</td>
      </tr>
   
  )
      }
    </tbody>
  </table>
</div>
</div>


        </div>
    );
};

export default PaymentHistory