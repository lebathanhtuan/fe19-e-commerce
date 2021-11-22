import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from "react-bootstrap";

import { ROUTER } from '../../../constants/router'

const AdminDashboardPage = () => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('userInfo')
    history.push(ROUTER.LOGIN)
  }

  return (
    <div>
      Dashboard Page
      <Button onClick={() => handleLogout()}>Logout</Button>
    </div>
  )
}

export default AdminDashboardPage
