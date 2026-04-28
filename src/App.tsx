import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Catalog from './pages/Catalog';
import Item from './pages/Item';
import About from './pages/About';
import Contacts from './pages/Contacts';
import Cart from './pages/Cart';
import ErrorPage from './pages/ErrorPage';
import Header from './pages/Header';
import Footer from './pages/Footer';
import './App.css'

function App() {
  return (
    <Router>
      <Header />
      <main className="container">
        <div className="row">
          <div className="col">
            <div className="banner">
              <img src="/img/banner.jpg" className="img-fluid" alt="К весне готовы!" />
              <h2 className="banner-header">К весне готовы!</h2>
            </div>
            <Routes>
              <Route path='/' element={ <MainPage /> } />
              <Route path='/catalog' element={ <Catalog pos={'catalog'} /> } />
              <Route path='/catalog/:id' element={ <Item /> } />
              <Route path='/about' element={ <About /> } />
              <Route path='/contacts' element={ <Contacts /> } />
              <Route path='/cart' element={ <Cart /> } />
              <Route path='*' element={ <ErrorPage /> } />
            </Routes>
          </div>
        </div>
      </main>
      <Footer />
    </Router>
  )
}

export default App
