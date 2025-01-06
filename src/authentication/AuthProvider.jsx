import { createContext, useEffect, useState } from "react";
//import auth from "../firebase/firebase.config";
import { auth } from "./firebase.config";
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import axios from "axios";


export const AuthContext = createContext();



const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const provider = new GoogleAuthProvider();

  const createNewUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const userLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logInWithGoogle = () => {

    return signInWithPopup(auth, provider)

  }

  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  const handlePasswordReset = (email) => {
    return sendPasswordResetEmail(auth, email)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email) {
        const user = { email: currentUser.email };

        axios.post('https://join-marathon-server-site.vercel.app/jwt', user, { withCredentials: true })
          .then(res => {
            console.log('login token', res.data);
            setLoading(false);
          })

      }
      else {
        axios.post('https://join-marathon-server-site.vercel.app/logout', {}, {
          withCredentials: true
        })
          .then(res => {
            console.log('logout', res.data);
            setLoading(false);
          })
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);


  const authInfo = {
    user,
    setUser,
    loading,
    createNewUser,
    userLogin,
    updateUserProfile,
    logInWithGoogle,
    logout,
    handlePasswordReset,

  };



  //console.log(user?.displayName);




  return (
    <div className="sora-font"><AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider></div>

  );
};

export default AuthProvider;