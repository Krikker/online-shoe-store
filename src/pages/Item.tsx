import { useAppDispatch } from "../app/store";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetOneProductQuery, addToCart } from "../services/servicesSlice";
import type { CartInfo } from "../types";
import ErrorPage from "./ErrorPage";

const Item = () => {
  const { id } = useParams();
  const productId = Number(id);
  const isValidProductId = Number.isInteger(productId) && productId > 0;
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [modalProblems, setModalProblems] = useState<string | null>(null);

  const {
    data: product,
    isLoading,
    error,
    refetch,
    isFetching
  } = useGetOneProductQuery(productId, { skip: !isValidProductId });

  if (!isValidProductId) {
    return <ErrorPage />;
  }

  const prepareCartItem = (): CartInfo | null => {
    if (!product) {
      setModalProblems('Товар пока еще не загружен, подождите!');
      return null;
    }

    if (!selectedSize) {
      setModalProblems('Для начала выберите доступный размер!');
      return null;
    }

    return {
      id: product.id,
      title: product.title || '',
      size: selectedSize,
      amount: quantity,
      price: product.price || 0,
      total: (product.price || 0) * quantity,
    };
  };

  const handleAddToCart = () => {
    const cartItem = prepareCartItem();
    if (cartItem) {
      dispatch(addToCart(cartItem));
      setModalProblems(null);
    }
  };

  return (
    <>
      {error ? (
        <div className='error-modal'>
          <p className='error-text'>Произошла ошибка при загрузке товара, попробуйте еще раз!</p>
          <button type='button' className='error-btn' onClick={refetch} disabled={isFetching}>
            {isFetching ? 'Повторная попытка...' : 'Попробовать снова'}
          </button>
        </div>
        ) : isLoading ? (
          <div className="preloader">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        ) : (
          <section className="catalog-item">
            <h2 className="text-center">{ product?.title }</h2>
            {modalProblems && (
              <div className="modal-problems">
                <p>{modalProblems}</p>
                <button type="button" onClick={() => setModalProblems(null)}>X</button>
              </div>
            )}
            <div className="row">
              <div className="col-5">
                <img src={product?.images[selectedImage]}
                  className="img-fluid" alt={product?.title} />
                {product?.images && product.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      className="gallery-nav-next"
                      onClick={() => setSelectedImage((prev) => (prev + 1) % product.images.length)}
                    >
                      ›
                    </button>
                    <button
                      type="button"
                      className="gallery-nav-prev"
                      onClick={() => setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length)}
                    >
                      ‹
                    </button>
                  </>
                )}
                {product?.images && product.images.length > 1 && (
                  <div className="image-thumbnails">
                    {product.images.map((image, index) => (
                      <div
                        key={index}
                        className={`thumbnail ${selectedImage === index ? 'active-img' : ''}`}
                        onClick={() => setSelectedImage(index)}
                      >
                        <img src={image} alt={`${product.title} - ${index + 1}`} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="col-7">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td>Артикул</td>
                      <td>{ product?.sku }</td>
                    </tr>
                    <tr>
                      <td>Производитель</td>
                      <td>{ product?.manufacturer }</td>
                    </tr>
                    <tr>
                      <td>Цвет</td>
                      <td>{ product?.color }</td>
                    </tr>
                    <tr>
                      <td>Материалы</td>
                      <td>{ product?.material }</td>
                    </tr>
                    <tr>
                      <td>Сезон</td>
                      <td>{ product?.season }</td>
                    </tr>
                    <tr>
                      <td>Повод</td>
                      <td>{ product?.reason }</td>
                    </tr>
                  </tbody>
                </table>
                <div className="text-center">
                  <p>Размеры в наличии:
                    {product?.sizes.map(size => (
                      <span
                        key={size.size}
                        className={`catalog-item-size ${selectedSize === size.size ? 'selected' : ''} ${size.available === true ? '' : 'size-crossed'}`}
                        onClick={() => size.available && setSelectedSize(size.size)}
                        style={{ cursor: size.available ? 'pointer' : 'not-allowed' }}
                      >
                        {size.size}
                      </span>
                    ))}
                  </p>
                  <p>Количество: <span className="btn-group btn-group-sm pl-2">
                      <button
                        className="btn btn-secondary"
                        onClick={() => {if (quantity > 1) setQuantity(quantity - 1)}}
                        disabled={quantity <= 1}
                      >-</button>
                      <span className="btn btn-outline-primary">{quantity}</span>
                      <button
                        className="btn btn-secondary"
                        onClick={() => setQuantity(quantity + 1)}
                      >+</button>
                    </span>
                  </p>
                </div>
                <button
                  className="btn btn-danger btn-block btn-lg"
                  disabled={quantity <= 0}
                  onClick={handleAddToCart}
                >В корзину</button>
              </div>
            </div>
          </section>
        )
      }
    </>
  )
}

export default Item
