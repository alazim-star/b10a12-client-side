import React from 'react';
import { FaAd, FaBook, FaCalendar, FaEdit, FaHome, FaList, FaMobile, FaSearch, FaShoppingCart,FaUser,FaUserEdit,FaUserGraduate,FaUserNinja,FaUsers, FaUserTie, FaUtensils} from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import useAdmin from '../../Hooks/useAdmin';
import { MdManageHistory, MdOutlineManageAccounts, MdOutlineRateReview } from 'react-icons/md';
import { FaUsersBetweenLines } from 'react-icons/fa6';


const Dashboard = () => {

const [isAdmin]=useAdmin()


    return (
        <div className='flex'>
{/* side bar  */}
            <div className="min-h-screen bg-orange-400 w-64">


                {/* private navbar like hr/user/custom */}
                <ul className='menu '>
                
                 {
                    isAdmin ?<>
                                      
                                      <li className='p-2'>

{/* for admin  */}

<NavLink to='/dashboard/adminProfile'>
<FaUserTie></FaUserTie>Admin Profile</NavLink>
</li>
<li className='p-2'>

<NavLink to='/dashboard/addScholarshipAdmin'>
<FaEdit></FaEdit>Add Scholarship</NavLink>
</li>
<li className='p-2'>

<NavLink to='/dashboard/manageScholarshipsAdmin'>
<MdManageHistory />Manage Scholarship
</NavLink>
</li>
<li className='p-2'>

<NavLink to='/dashboard/manageAppliedApplication'>
<MdOutlineManageAccounts />Manage Applied Application
</NavLink>
</li>
<li className='p-2'>

<NavLink to='/dashboard/manageUsers'>
<FaUsersBetweenLines></FaUsersBetweenLines>Manage Users
</NavLink>
<NavLink to='/dashboard/manageReview'>
<MdOutlineRateReview />Manage Review

</NavLink>
</li>

                    </>
                    :
                    <>
        {/* for user  */}

                    {/* shared nav link  */}
                    <div className="divider divider-warning">user</div>
                        <li className='p-2'>


<NavLink to='/dashboard/myProfile'>
<FaUserNinja></FaUserNinja>My Profile
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
                    
                    </>
                 }
 

{/* for modaretor  */}

<div className="divider divider-neutral">Moderator</div>
                    <li className='p-2'>

<NavLink to='/dashboard/myProfileModerator'>
<FaUserEdit></FaUserEdit>My Profile</NavLink>
</li>
<li className='p-2'>

<NavLink to='/dashboard/manageScholarshipsModerator'>
<MdManageHistory />Manage Scholarships</NavLink>
</li>
<li className='p-2'>

<NavLink to='/dashboard/allReviewsModerator'>
<MdOutlineRateReview />All reviews</NavLink>
</li>
<li className='p-2'>

<NavLink to='/dashboard/allAppliedScholarship'>
<MdOutlineManageAccounts />All applied Scholarship</NavLink>
</li>
<li className='p-2'>

<NavLink to='/dashboard/addScholarshipModerator'>
<FaEdit></FaEdit>Add Scholarship
</NavLink>
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