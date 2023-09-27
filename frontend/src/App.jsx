import React from 'react'
import Header from './components/Header'
import { Home } from './screens/Home'
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
const App = () => {
  return (
    <>
    <Header />
    {/* <ToastContainer /> */}
    <Container className='my-2'>
      <Outlet />
    </Container>
  </>
  )
}

export default App