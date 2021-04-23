import { createContext, useEffect, useState } from 'react';
import netlifyIdentity from 'netlify-identity-widget'
const AuthContext = createContext({
	user: null,
	login: () => {},
	logout: () => {},
	authReady: false,
});

export const AuthContextProvider = ({children})=>{
    const [user, setUser] = useState(null)
    
    useEffect(() => {
        netlifyIdentity.on('login',(user)=>{
            setUser(user)
            netlifyIdentity.close()
        })
        netlifyIdentity.init()
    }, [])

    const login = ()=>{
        netlifyIdentity.open()
    }



    const context ={ user, login}

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext