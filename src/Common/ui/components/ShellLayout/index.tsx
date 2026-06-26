import { Outlet } from 'react-router-dom'

import Navbar from '../Navbar'

const ShellLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default ShellLayout