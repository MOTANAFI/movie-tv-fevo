
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import 'swiper/css';

import Layout from './components/Layout'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails';
import TvList from './pages/TvList';
import TvDetails from './pages/TvDetails';

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path='tvList' element={<TvList/>}/>
        <Route path="movie/:movieId" element={<MovieDetails/>}/>
        <Route path="tv-sserie/:tvSeriesId" element={<TvDetails/>}/>

      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
