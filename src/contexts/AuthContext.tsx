import { useState, useEffect, createContext, useContext } from "react";
import Loading from "../components/general/Loading";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

type ContextState = {
  user: any | null;
  setUser: (user: any) => void;
  token: any | null;
  setToken: any;
};

const initialValues = {
  user: null,
  setUser: () => {},
  token: null,
  setToken: () => {},
};

type IProps = {
  children: React.ReactElement<any, any> & React.ReactNode;
};

export const AuthContext = createContext<ContextState>(initialValues);

export const UserProvider: React.FC<IProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<any>(null);

  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    // Listen authenticated user
    const unsubscriber = onAuthStateChanged(auth, async (userData: any) => {
      try {
        if (userData) {
          setToken(userData.accessToken);
          // User is signed in.
          // You could also look for the user doc in your Firestore (if you have one):
          // const userDoc = await firebase.firestore().doc(`users/${uid}`).get()
          setUser(userData);
        } else setUser(null);
      } catch (error) {
        // Most probably a connection error. Handle appropriately.
      } finally {
        setLoadingUser(false);
      }
    });

    // Unsubscribe auth listener on unmount
    return () => unsubscriber();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
      }}
    >
      {loadingUser ? <Loading /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): ContextState => useContext(AuthContext);
