import { useContext } from 'react'
import { AuthContext } from '../../providers/Auth'

// ----------------------------------------------

const useAuth = () => useContext(AuthContext)
export default useAuth
