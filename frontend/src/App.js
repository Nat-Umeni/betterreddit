import React from 'react';
import './App.css';
import Home from './features/Home/Home';
import Header from './features/Header/Header';
import Subreddits from './features/Subreddits/Subreddits';



export default function App() {
  
  async function getCurrentUser(){

    try{
        const response = await fetch("http://localhost:3001/profile", {withCredentials: true}, {
        method: "get",
        headers: {"Content-Type": "application/json"},
    })  

    console.log(response)

    } catch(err){
        console.log(err)
    }        
  }

  const user = getCurrentUser();
  
  return (
    <>
      <Header currentUser={user} />
      <main>        
        <Home />
      </main>

      <aside>
        <Subreddits />
      </aside>
    </>
  );
}

