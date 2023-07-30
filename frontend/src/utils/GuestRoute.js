import { Outlet, Navigate } from "react-router-dom"


const GuestRoute = ({token}) => {
    let auth = {'token': token}
  return (
    auth.token ? <Navigate to = {'/'}/>: <Outlet />
  )
}

export default GuestRoute