
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { AuthContext } from './AuthContext'
import { auth } from '../../firebase/firebase.init'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useEffect,useState } from 'react';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const registerUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const singInUser = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }
    const singInGoogle = () =>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }
    const logOut = ()=>{
        setLoading(true);
        return signOut(auth);
    }
    const updateUserProfile = (profile) =>{
        return updateProfile(auth.currentUser, profile);
    }
    //observe user s tate
    useEffect(() =>{
        const unSubscribe = onAuthStateChanged(auth, (currentState) =>{
            setUser(currentState);
            setLoading(false);
        })
        return() =>{
            unSubscribe();
        }
    },[])
    const authInfo ={
        user,
        loading,
        registerUser,
        singInUser,
        singInGoogle,
        logOut,
        updateUserProfile,
    }
  return (
    <AuthContext value={authInfo}>
       {children}
    </AuthContext>)

}

export default AuthProvider