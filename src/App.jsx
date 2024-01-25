import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/home";
import { AddAccount } from "./pages/AddAccount";
import AccountConsultation from "./pages/AccountConsultation";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
          <Route path="/accounts/add" element={<AddAccount />} />
          <Route path="/accounts/consulter" element={<AccountConsultation />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
