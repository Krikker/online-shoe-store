import {useState, useEffect} from 'react';
import { useAppSelector, useAppDispatch } from '../app/store';
import { useGetCategoriesQuery, useGetProductsQuery, changeSearchField } from '../services/servicesSlice';
import ProductsList from './ProductsList';
import type { SmallInfo, Categories } from '../types';

const Catalog = ({pos} : {pos: string}) => {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [offset, setOffset] = useState(0);
  const [catalogItems, setCatalogItems] = useState<SmallInfo[]>([]);
  const query = useAppSelector(state => state.services.query);
  const [searchQuery, setSearchQuery] = useState(query);
  const dispatch = useAppDispatch();

  const { 
    data: categories, 
    isLoading: isLoadingCategories, 
    error: errorCategories,
    refetch: refetchCategories,
    isFetching: isFetchingCategories
  } = useGetCategoriesQuery();
  
  const { 
    currentData: products = [],
    isLoading: isLoadingProducts, 
    error: errorProducts,
    refetch: refetchProducts,
    isFetching: isFetchingProducts
  } = useGetProductsQuery({ categoryId: currentCategory, offset, q: searchQuery });

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  useEffect(() => {
    setCatalogItems([]);
    setOffset(0);
  }, [currentCategory, searchQuery]);

  useEffect(() => {
    if (products) {
      if (offset === 0) {
        setCatalogItems(products);
      } else {
        setCatalogItems(prevItems => [...prevItems, ...products]);
      }
    }
  }, [products, offset]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    dispatch(changeSearchField(e.target.value));
    setOffset(0);
  };

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {pos === 'catalog' && (
        <form
          className="catalog-search-form form-inline"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className="form-control"
            placeholder="Поиск"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </form>
        )
      }
      {errorCategories ? (
        <div className='error-modal'>
          <p className='error-text'>Произошла ошибка при загрузке категорий, попробуйте еще раз!</p>
          <button type='button' className='error-btn' onClick={refetchCategories} disabled={isFetchingCategories}>
            {isFetchingCategories ? 'Повторная попытка...' : 'Попробовать снова'}
          </button>
        </div>
        ) : isLoadingCategories ? (
          <div className="preloader">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        ) : (
          <ul className="catalog-categories nav justify-content-center">
            <li className="nav-item">
              <button 
                className={`nav-link ${currentCategory === 0 ? 'active' : ''}`} 
                onClick={() => setCurrentCategory(0)}
              >Все</button>
            </li>
            {categories?.map((category: Categories) => (
              <li className="nav-item" key={category.id}>
                <button 
                  className={`nav-link ${currentCategory === category.id ? 'active' : ''}`} 
                  onClick={() => setCurrentCategory(category.id)}
                >{category.title}</button>
              </li>
            ))}
          </ul>
        )
      }
      <div className="row">
        {errorProducts ? (
          <div className='error-modal'>
            <p className='error-text'>Произошла ошибка при загрузке каталога, попробуйте еще раз!</p>
            <button type='button' className='error-btn' onClick={refetchProducts} disabled={isFetchingProducts}>
              {isFetchingProducts ? 'Повторная попытка...' : 'Попробовать снова'}
            </button>
          </div>
          ) : isLoadingProducts ? (
            <div className="preloader">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          ) : catalogItems.length > 0 ? (
            catalogItems?.map((product: SmallInfo) => (
              <ProductsList key={product.id} item={product} pos={'catalog'} />
            ))
          ) : <p className='empty-catalog'>
              Похоже, что ничего не найдено, попробуйте найти другой товар!
            </p>
        }
      </div>
      {products.length === 6 && (
        <div className="text-center">
          <button
            className="btn btn-outline-primary"
            onClick={() => {
              setOffset(prevOffset => prevOffset + 6);
            }}
            disabled={isFetchingProducts}
          >{isFetchingProducts ? 'Загрузка...' : 'Загрузить ещё'}</button>
        </div>
      )}
    </section>
  )
}

export default Catalog
