
import {createContext, useEffect, useState } from "react";
import {createUserWithEmailAndPassword, getAuth,GoogleAuthProvider,onAuthStateChanged,signInWithEmailAndPassword,signInWithPopup, signOut, updateProfile} from "firebase/auth";


import { app } from "../Firebase/firebase.config";
import useAxiosPublic from "../Hooks/axiosPublic";






export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider=new GoogleAuthProvider()
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const axiosPublic=useAxiosPublic()


   
   
    // for loading 
    const [loading,setLoading]=useState(true)
   
// create user 
const createUser=(email,password)=>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth,email,password)
}

// signin 
const signIn =(email,password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
}


// sign out 
const signOutUser=()=>{
    setLoading(true)
    return signOut(auth)

}




// for loading 
useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth,currentUser=>{
        setUser(currentUser)
        // console.log("currentUser",currentUser);
    if (currentUser) {
//get token and store client
const userInfo={ email: currentUser.email}
    axiosPublic.post('/jwt',userInfo)
    .then(res=>{
        if (res.data.token) {
            localStorage.setItem('access-token',res.data.token)
            setLoading(false)
        }
     
    })
        
    }
    else{
       localStorage.removeItem('access-token')
       setLoading(false)
    }
      
    })
return()=>{
    return unsubscribe()
}
  
},[axiosPublic])

const updateUserProfile=(updatedData)=>{
    return updateProfile(auth.currentUser,  updatedData)


}
// google sign in 
const signInWithGoogle=()=>{
    setLoading(true)
    return signInWithPopup(auth,googleProvider)
}



const authInfo = {
    user,
   loading,
   createUser,
   signIn,
   signOutUser,
   updateUserProfile,
   signInWithGoogle

   
 
};
  



    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
