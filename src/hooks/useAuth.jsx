import { useEffect, useState} from "react"
import axios from 'axios'

export default function useAuth(){
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        //revisar si hay token
        const token = localStorage.getItem('token')
        if(token){
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            fetchUserData()
        }else{
            setLoading(false)
        }

    }, [])
    
    const fetchUserData = async() => {

        try{
            const response = await axios.get('http://localhost:8080/api/users/me')
            setUser(response.data)
            setIsAuthenticated(true)
        }catch(err){
            console.error('Error fetching user data: ', err)
            localStorage.removeItem('token')
            delete axios.defaults.headers.common['Authorization']
            setIsAuthenticated(false)
        }finally{
            setLoading(false)
        }
    }

    const handleLogout = () =>{
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        setIsAuthenticated(false)
        setUser(null)
    }
    return {isAuthenticated, user, loading, setUser, setIsAuthenticated,  handleLogout}
}

