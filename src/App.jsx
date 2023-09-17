import React from 'react';
import {Route, Routes} from "react-router-dom"

// Components
import SignUp from './components/SignUp';
import SignIn from './components/SignIn'
import Landing from './components/Landing';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="signin" element={<SignIn />}/>
        <Route path='/' element={<Landing />}/>
      </Routes>
    </>
  );
};

export default App;