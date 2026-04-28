import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../app/store";
import { removeFromCart, clearCart, useCreateOrderMutation } from "../services/servicesSlice";
import type { OrderData } from "../types";

const Cart = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [modalInfo, setModalInfo] = useState<string | null>(null);
  const [modalType, setModalType] = useState<'error' | 'success'>('error');
  const cart = useAppSelector(state => state.services.cart);
  const dispatch = useAppDispatch();
  let i = 1;

  const [createOrder, {isLoading}] = useCreateOrderMutation();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      setModalType('error');
      setModalInfo('Нельзя оформить пустой заказ. Добавьте товары в корзину.');
      return;
    }

    const orderData: OrderData = {
      owner: {
        phone: phoneNumber,
        address: address,
      },
      items: cart.map(item => ({
        id: item.id,
        price: item.price,
        count: item.amount
      })),
    };
    if (!orderData.owner.phone || !orderData.owner.address) {
      setModalType('error');
      setModalInfo('Заполните все поля и примите соглашение');
      return;
    }
    try {
      await createOrder(orderData).unwrap();
      setModalType('success');
      setModalInfo(`Заказ успешно оформлен!`);
      dispatch(clearCart());
      setPhoneNumber('');
      setAddress('');
    } catch (e) {
      setModalType('error');
      setModalInfo(`Ошибка при создании заказа: ${e}`);
    }
  }

  return (
    <>
      <section className="cart">
        <h2 className="text-center">Корзина</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Название</th>
              <th scope="col">Размер</th>
              <th scope="col">Кол-во</th>
              <th scope="col">Стоимость</th>
              <th scope="col">Итого</th>
              <th scope="col">Действия</th>
            </tr>
          </thead>
          <tbody>
            {cart.length >= 1 ? (
              <>
              {cart.map(item => (
                <tr key={`${item.id}-${item.size}`}>
                  <td scope="row">{i++}</td>
                  <td><a href="/products/1.html">{item.title}</a></td>
                  <td>{item.size}</td>
                  <td>{item.amount}</td>
                  <td>{item.price} руб.</td>
                  <td>{item.total} руб.</td>
                  <td>
                    <button 
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => dispatch(removeFromCart({id: item.id, size: item.size}))}
                    >Удалить</button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={5} className="text-right">Общая стоимость</td>
                <td>{cart.reduce((acc, item) => acc + item.total, 0)} руб.</td>
              </tr>
              </>
            ) : (
              <tr>
                <td colSpan={7}>
                  <p className="empty-cart">Вы не добавили товары в корзину, исправьте ситуацию и вернитесь!</p>
                </td>
              </tr>
            )
          }
          </tbody>
        </table>
      </section>
      <section className="order">
        <h2 className="text-center">Оформить заказ</h2>
        {modalInfo && (
          <div className={modalType === 'success' ? 'modal-success' : 'modal-problems'}>
            <p>{modalInfo}</p>
            <button type="button" onClick={() => setModalInfo(null)}>X</button>
          </div>
        )}
        <div className="card" style={{ maxWidth: '30rem', margin: '0 auto' }}>
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="phone">Телефон</label>
              <input 
                className="form-control" 
                id="phone" 
                placeholder="Ваш телефон"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Адрес доставки</label>
              <input 
                className="form-control" 
                id="address" 
                placeholder="Адрес доставки"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="form-group form-check">
              <input type="checkbox" className="form-check-input" id="agreement" required />
              <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
            </div>
            <button 
              type="submit" 
              className="btn btn-outline-secondary"
              disabled={isLoading}
            >{isLoading ? 'Оформление...' : 'Оформить'}</button>
          </form>
        </div>
      </section>
    </>
  )
}

export default Cart
