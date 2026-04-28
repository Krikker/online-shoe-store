import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/store";
import { useNavigate } from "react-router-dom";
import { changeSearchField, clearSearchField } from "../services/servicesSlice";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchExpand, setSearchExpand] = useState(false);
  const cart = useAppSelector(state => state.services.cart);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchExpand && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchExpand]);

  const handleSubmitSearch = (e?: React.SubmitEvent) => {
    if (e) {
      e.preventDefault();
    }
    if (searchQuery.trim()) {
      dispatch(changeSearchField(searchQuery));
      navigate(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setSearchExpand(false);
    } 
    else {
      setSearchExpand(false);
    }
  }

  const handleClearSearch = () => {
    setSearchQuery('');
    dispatch(clearSearchField());
  }

  const handleSearchAfterExpand = () => {
    if (searchExpand) {
      handleSubmitSearch();
    } else {
      setSearchExpand(true)
    }
  }

  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <Link to={'/'} className="navbar-brand">
              <img src="/img/header-logo.png" alt="Bosa Noga" />
            </Link>
            <div className="collapse navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <Link to={'/'} className="nav-link">Главная</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/catalog'} className="nav-link">Каталог</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/about'} className="nav-link">О магазине</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/contacts'} className="nav-link">Контакты</Link>
                </li>
              </ul>
              <div>
                <div className="header-controls-pics">
                  <div
                    data-id="search-expander"
                    className="header-controls-pic header-controls-search"
                    onClick={handleSearchAfterExpand}
                  ></div>
                  <div 
                    className="header-controls-pic header-controls-cart"
                    onClick={() => navigate('/cart')}
                  >
                    {cart.length > 0 ? (
                      <div className="header-controls-cart-full">{cart.length}</div>
                      ) : ''
                    }
                  </div>
                </div>
                <form
                  data-id="search-form"
                  className={`header-controls-search-form form-inline ${searchExpand ? '' : 'invisible'}`}
                  onSubmit={handleSubmitSearch}
                >
                  <input
                    ref={inputRef}
                    className="form-control"
                    placeholder="Поиск"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button type="button" onClick={handleClearSearch}>×</button>
                  )}
                </form>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
