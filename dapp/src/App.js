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
  return (
    <div className>
      <BrowserRouter>
        <Routes>
          <Route exact path="/"element={<Home />}/>
          <Route path="/Client"element={<Client />} caseSensitive={false} />
          <Route path="/Artist"element={<Artist />} caseSensitive={false}/>
          <Route path="/Label"element={<Label />} caseSensitive={false}/>
          <Route path="/Stream"element={<Stream />} caseSensitive={false}/>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
  </div>
  );
}

export default App;
