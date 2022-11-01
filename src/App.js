import logo from './logo.svg';
import './App.css';
import React, { Component, useState } from 'react'
import Navbar from './components/Navbar';
// import { useState } from 'react';
import News from './components/News';
import NewsItem from './components/NewsItem';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
const App=()=> {
  //class use this c='luck';
  const pageSize=15;
 const [progress,setprogress]=useState(0)

    return (
      <div>
        <Router>
          
          <Navbar/>
          <LoadingBar
        color='#f11946'
        progress={progress}
        height={3}
      />
         <Routes>       
          <Route exact path="/" element={<News setprogress={setprogress}  key="general" pageSize={pageSize} country="in" category="general"/>}></Route>
          <Route exact path="/business" element={<News setprogress={setprogress}  key="business" pageSize={pageSize} country="in" category="business"/>}></Route>
          <Route exact path="/entertainment" element={<News setprogress={setprogress}  key="entertainment" pageSize={pageSize} country="in" category="entertainment"/>}></Route>
          <Route exact path="/general" element={<News setprogress={setprogress}  key="general" pageSize={pageSize} country="in" category="general"/>}></Route>
          <Route exact path="/health" element={<News setprogress={setprogress}  key="health" pageSize={pageSize} country="in" category="health"/>}></Route>
          <Route exact path="/science" element={<News setprogress={setprogress}  key="science" pageSize={pageSize} country="in" category="science"/>}></Route>
          <Route exact path="/sports" element={<News setprogress={setprogress}  key="sports" pageSize={pageSize} country="in" category="sports"/>}></Route>
          <Route exact path="/technology" element={<News setprogress={setprogress}  key="technology" pageSize={pageSize} country="in" category="technology"/>}></Route>
          
        </Routes>
          </Router>
      </div>
    )
  
}
export default App