import logo from './logo.svg'
import './App.css'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { BASEURL } from './Constent'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TableData from './TableData'


function App() {

  const [input, setInput] = useState({})
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput({ ...input, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await Axios.post(`${BASEURL}api/user/signup`, { name: input.name, email: input.email, phoneno: input.number })
      .then(data => {
        console.log("data", data.data.data)
        if (data.data.errorcode === 0) {
          toast.success(`${data.data.message}`, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setInput({})
        }
        else {
          toast.error(`${data.data.message}`, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      })

  }

  return (
    <>
      <ToastContainer />
      <div className="container">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" placeholder="Enter Name" name="name" id="name" value={input.name || ""} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter Email" name="email" id="email" value={input.email || ""} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control type="number" placeholder="Enter Number" name="number" id="number" value={input.number || ""} onChange={handleChange} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
      <div className='container mt-5'>
        <TableData />
      </div>
    </>
  )
}

export default App
