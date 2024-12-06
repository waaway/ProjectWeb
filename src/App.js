import React from 'react';
import './style/App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Overview from './Overview';
import Booknow from './Booknow';
import Suites from './Suites' ;
import Standard from './Standard';
import Grandstandard from './Grandstandard' ;
import Cafe from './Cafe' ;
import Clubs from './Clubs' ;
import Register from './Register';
import Profile from './Profile';


function App() {
  return (

      <div>      
        <Routes>
          <Route path='/' element={<Overview/>} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Overview' element={<Overview />} />
          <Route path='/Booknow' element={<Booknow />} />
          <Route path='/Suites' element={<Suites />} />
          <Route path='/Standard' element={<Standard />} />
          <Route path='/Grandstandard' element={<Grandstandard />} />
          <Route path='/Cafe' element={<Cafe />} />
          <Route path='/Clubs' element={<Clubs />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Profile' element={<Profile/>} />








        </Routes>
      </div>
  );
}

export default App;
