import Home from './pages/Home';
import Client from './pages/Client';
import Artist from './pages/Artist';
import Label from './pages/Label';
import Stream from './pages/Stream';
import PageNotFound from './pages/PageNotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/App.css"
import "./css/Homepage.css"
import "./css/Login.css"
import "./css/Notif.css"
import "./css/Validation.css"

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

document.body.style.background = "#232226";
function App() {
  var role = "client";
  return (
    <div className>
      <BrowserRouter>
        <Routes>
          <Route exact path="/"element={<Home />}/>
          <Route path="/Client"element={<Client />}/>
          <Route path="/Artist"element={<Artist />}/>
          <Route path="/Label"element={<Label />}/>
          <Route path="/Stream"element={<Stream />}/>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
  </div>
  );
}

export default App;
