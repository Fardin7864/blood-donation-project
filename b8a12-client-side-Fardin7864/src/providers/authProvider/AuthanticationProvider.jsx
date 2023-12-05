import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";
import auth from "../../firebase/Firebase";
import { toast } from "react-toastify";
import useAxiosPublic from "../../hooks/useAxiosPublic/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
// import useDataUser from "../../hooks/useUser/useDataUser";


export const AuthContext = createContext();

const AuthanticationProvider = ({children}) => {
    
    // states
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();
    const [rerender, setrerender] = useState(false);
    // const {userDataLoader} = useDataUser();

    // auth provider
    const google = new GoogleAuthProvider();

    // create user with email
    const creatUres =(emial, password) => { 
        setLoading(true)
        return createUserWithEmailAndPassword(auth, emial, password)
     }

    // Login with email and pass
    const login = (email, password) => { 
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // Social login
    const socilaLogin = (provider) => { 
        setLoading(true)
        return signInWithPopup(auth, provider)
     }

    // toasts
    const successToast = (message) => { 
        toast.success(`${message}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
     }
    const errorToast = (message) => { 
        toast.error(`${message}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
     }
      //  sign out
    const logOut = () => { 
        setLoading(true)
        signOut(auth)
     }

     

     const updateUserProfile = (name,img) => {
        updateProfile(auth.currentUser, {
           displayName: name,
           photoURL: img,
         })
        //  userDataLoader()
         setrerender(!rerender)
       }

     const updateUserName = (name) => {
        updateProfile(auth.currentUser, {
           displayName: name,
         })
        //  userDataLoader()
         setrerender(!rerender)
       }
    

    const { refetch: loadUser} = useQuery({
        queryKey: ['user'],
        queryFn: () => { 
            const unsebscribe = onAuthStateChanged(auth, currentUser =>{
                setLoading(true)
                setUser(currentUser);
                setLoading(false)
                const email = currentUser?.email;
                // console.log(res.user.email)
                axiosPublic.post('/jwt',{email})
                .then()
                .catch(err => console.log(err))
            })
    
            return () => {
                unsebscribe();
            }
         }
    })


    //  context info
     const authInfo = {
        user,
        successToast,
        google,
        creatUres,
        login,
        socilaLogin,
        logOut,
        isLoading,
        errorToast,
        updateUserProfile,
        loadUser,
        updateUserName,
     }



    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthanticationProvider;