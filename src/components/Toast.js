import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const Toast = ({ cartItems, removeItemFromCart, readOnly }) => {
  return <ToastContainer autoClose={6000} closeButton={false} hideProgressBar />
}

export default Toast
