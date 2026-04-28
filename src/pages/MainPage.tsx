import { useGetTopSalesQuery } from '../services/servicesSlice';
import ProductsList from './ProductsList';
import Catalog from './Catalog';
import type { SmallInfo } from '../types';

const MainPage = () => {
  const { 
    data: topSales, 
    isLoading: isLoadingTopSales, 
    error: errorTopSales,
    refetch: refetchTopSales,
    isFetching: isFetchingTopSales
  } = useGetTopSalesQuery();

  return (
    <>
      <section className="top-sales">
        <h2 className="text-center">Хиты продаж!</h2>
        {errorTopSales ? (
          <div className='error-modal'>
            <p className='error-text'>Произошла ошибка при загрузке хитов продаж, попробуйте еще раз!</p>
            <button type='button' className='error-btn' onClick={refetchTopSales} disabled={isFetchingTopSales}>
              {isFetchingTopSales ? 'Повторная попытка...' : 'Попробовать снова'}
            </button>
          </div>
          ) : isLoadingTopSales ? (
            <div className="preloader">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          ) : (
            <div className="row">
              {topSales?.map((item: SmallInfo) => (
                <ProductsList key={item.id} item={item} pos={'top-sales'} />
              ))}
            </div>
          )
        }
      </section>
      <Catalog pos={'main-page'} />
    </>
  )
}

export default MainPage