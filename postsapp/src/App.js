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
            <Route path="/Fav" element={<ImagesList />}/>
            <Route path="/Train" element={<ImageClassifierApp />} />
            <Route path="/Block"  element={<WatchedList />}/>
            <Route exact path="/" element={<SignIn />} />
            <Route path="/Signup" element={<SignUp />} />
            <Route path="/Home" element={email ? <BucketList /> : <Navigate to="/" />}
          />
          </Routes>
        </div>
    );
  }
export default App;

