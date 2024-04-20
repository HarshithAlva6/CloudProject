import './App.css';
//import { useSDK } from "@metamask/sdk-react";
import React from 'react';
import { Route,Routes, Navigate } from 'react-router-dom';
import WatchedList from './Content/WatchedList';
import ImageClassifierApp from './Model';
import SignUp from './login/Signup';
import SignIn from './login/Signin';
import ImagesList from './Users/ImagesList';
import BucketList from './Buckets/BucketList';

export const App = () => {
  const email = localStorage.getItem("email");
    return (
        <div className="App">
          <Routes>        
            <Route path="/customers" element={<ImagesList />}/>
            <Route path="/train" element={<ImageClassifierApp />} />
            <Route path="/content"  element={<WatchedList />}/>
            <Route exact path="/" element={<SignIn />} />
            <Route path="/Signup" element={<SignUp />} />
            <Route path="/bucket" element={<BucketList />} />
            <Route path="/Home" element={email ? <ImagesList /> : <Navigate to="/" />}
          />
          </Routes>
        </div>
    );
  }
export default App;

