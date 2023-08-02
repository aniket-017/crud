
import './App.css';
import Header from "./component/layout/Header.js";
import Page from "./component/layout/Page.js";
import Page1 from "./component/layout/Page1";
import {  BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
import Home from "./component/layout/Home.js";
import Table from "./component/layout/table"
import 'react-datepicker/dist/react-datepicker.css';

function App() {
  return (
    <Router>
      <Routes>
    {/* <Header /> */}
    {/* <Page /> */}
    {/* <Page1 /> */}
         {/* <Home />     */}
         <Route  path="/" element={<Home/>} />
         {/* <Route path="/form" element={<Page1/>} /> */}
  </Routes>
</Router>
  );
}

export default App;
