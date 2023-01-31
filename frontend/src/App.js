import logo from './logo.svg'
import './App.css'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import React, { useState, useEffect } from 'react'

function App() {

  const [input, setInput] = useState({})
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput({ ...input, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Name :", input.name)
    console.log("Email :", input.email)
    console.log("Number :", input.number)
  }

  return (
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
  )
}

export default App
