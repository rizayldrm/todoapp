// Imports
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Home from "./Pages/Home";
import Error from "./Pages/Error";
import EditItem from "./Pages/EditItem";

// App
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/editItem/:id" element={<EditItem />}/>
        <Route index path="/" element={<Home />}/>
        <Route path="*" element={<Error message="Page not found"/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
