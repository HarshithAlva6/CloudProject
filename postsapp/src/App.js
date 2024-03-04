import './App.css';
import React, { Component } from 'react';
import { Route,Routes } from 'react-router-dom';
import ImagesList from './ImagesList';
import Navi from './Navi';
import WatchedList from './WatchedList';

//function App() {
//  return (
//    <div className="App">
//      <UsersList />
//    </div>
//  );
//}
class App extends Component {

  render() {
    return (
        <div className="App">
          <Navi />
          <Routes>        
            <Route path="/customers"  element={<ImagesList/>} />
            <Route path="/content"  element={<WatchedList />}/>
          </Routes>
        </div>
    );
  }
}
export default App;

