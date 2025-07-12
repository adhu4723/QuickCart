import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './layout/Header'
import Layout from './layout/Layout'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Register from './pages/Register'
import Login from './pages/Login'
import NewsPage from './pages/NewsPage'
import NewsLayout from './components/news/NewsLayout'
import NewsDetails from './pages/NewsDetails'
import Collection from './pages/Collection'
import AboutUs from './pages/AboutUs'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route element={<Layout/>}>
        <Route path='/' element={<HomePage/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route element={<NewsLayout/>}>
        <Route path='/news' element={<NewsPage/>} />
         <Route path='/news/:id' element={<NewsDetails/>} />


        </Route>
        <Route path='/:category/:subCategory?' element={<Collection/>}/>
        <Route path='/company/:category' element={<AboutUs/>} />


      </Route>
    </Routes>
     
    
    </>
  )
}

export default App
