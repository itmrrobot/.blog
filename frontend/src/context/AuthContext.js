import {useContext,useState,createContext, useEffect} from 'react';

const AuthContext = createContext();

function AuthProvider({children}) {
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('user'))||null);
    useEffect(() => {
        localStorage.setItem('user',JSON.stringify(user))
    },[user])
    return <AuthContext.Provider value={{user,setUser}}>
        {children}
    </AuthContext.Provider>
}

export default AuthProvider;

export const UserState = () => {
    return useContext(AuthContext);
}

