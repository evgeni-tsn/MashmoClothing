import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

export const Toast = () => (
  <ToastContainer closeOnClick autoClose={6000} hideProgressBar />
)
