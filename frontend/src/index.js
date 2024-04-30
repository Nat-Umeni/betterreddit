import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import App from './App';
import Login from './components/Login/Login';
import store from './store';
import reportWebVitals from './reportWebVitals';
import SignUp from './components/SignUp/SignUp';
import Failure from "./components/Failure/Failure"


const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path="/" element={<App />} />
    <Route path='/login' element={<Login />} />
    <Route path='/sign-up' element={<SignUp />} />
    <Route path='/failure' element={<Failure />} />
    
  </>  
));


ReactDOM.render(
  <React.StrictMode>
    
    <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
    </Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();
