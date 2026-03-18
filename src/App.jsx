import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import TopScroll from "./components/topscroll";
import Home from "./pages/Home";
import AboutPage from "./pages/About";
import ServicesPage from "./pages/Services";
import BlogPage from "./pages/Blog";
import ContactsPage from "./pages/Contacts";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
      </Routes>
      <Footer />
      <TopScroll />
    </>
  );
}

export default App;