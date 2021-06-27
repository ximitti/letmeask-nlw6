// hooks
import { useContext } from 'react'

// providers
import { AuthContext } from '../../providers/Auth'

// ----------------------------------------------

const useAuth = () => useContext(AuthContext)
export default useAuth
