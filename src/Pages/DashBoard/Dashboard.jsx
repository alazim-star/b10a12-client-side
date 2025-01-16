import React from 'react';
import { FaAd, FaBook, FaCalendar, FaHome, FaList, FaMobile, FaSearch, FaShoppingCart,FaUsers, FaUtensils} from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';



const Dashboard = () => {




    return (
        <div className='flex'>
{/* side bar  */}
            <div className="min-h-screen bg-orange-400 w-64">


                {/* private navbar like hr/user/custom */}
                <ul className='menu '>
                
                 
 
                     <li className='p-2'>
 
 {/* for admin  */}

<NavLink to='/dashboard/adminProfile'>
<FaHome></FaHome>Admin Profile</NavLink>
</li>
<li className='p-2'>

<NavLink to='/dashboard/addScholarship'>
<FaUtensils></FaUtensils>Add Scholarship</NavLink>
</li>
<li className='p-2'>

<NavLink to='/dashboard/manageScholarship'>
<FaList></FaList>Manage Scholarship
</NavLink>
</li>
<li className='p-2'>

<NavLink to='/dashboard/manageAppliedApplication'>
<FaBook></FaBook>Manage Applied Application
</NavLink>
</li>
<li className='p-2'>

<NavLink to='/dashboard/manageUsers'>
<FaUsers></FaUsers>Manage Users
</NavLink>
<NavLink to='/dashboard/manageReview'>
<FaUsers></FaUsers>Manage Review

</NavLink>
</li>

{/* for modaretor  */}

<div className="divider divider-neutral">Moderator</div>
                    <li className='p-2'>

<NavLink to='/dashboard/myProfile'>
<FaHome></FaHome>My Profile</NavLink>
</li>
<li className='p-2'>

<NavLink to='/dashboard/manageScholarships'>
Manage Scholarships</NavLink>
</li>
<li className='p-2'>

<NavLink to='/dashboard/allReviews'>
<FaCalendar></FaCalendar>All reviews</NavLink>
</li>
<li className='p-2'>

<NavLink to='/dashboard/allAppliedScholarship'>
<FaAd></FaAd>All applied Scholarship</NavLink>
</li>
<li className='p-2'>

<NavLink to='/dashboard/addScholarship'>
<FaList></FaList>Add Scholarship
</NavLink>
</li>

                  
{/* for user  */}

                    {/* shared nav link  */}
                        <div className="divider divider-warning">user</div>
                        <li className='p-2'>


<NavLink to='/dashboard/myProfile'>
<FaList></FaList>My Profile
</NavLink>
</li>

<li className='p-2'>

<NavLink to='/dashboard/myApplication'>
<FaSearch></FaSearch>My Application</NavLink>
</li>
<li className='p-2'>

<NavLink to='/dashboard/myReviews'>
<FaMobile></FaMobile>My reviews</NavLink>
</li>

                </ul>

            </div>
            {/* dashboard content  */}
            <div className='flex-1 p-8'>
                <Outlet></Outlet>
            </div>
            </div>
      
    );
};

export default Dashboard;