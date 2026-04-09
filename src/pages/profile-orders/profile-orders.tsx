import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchProfileOrders } from '../../services/slices/ordersSlice';
import {
  selectProfileOrders,
  selectProfileOrdersLoading
} from '../../services/selectors';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  // /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders = useSelector(selectProfileOrders);
  const isLoading = useSelector(selectProfileOrdersLoading);

  useEffect(() => {
    dispatch(fetchProfileOrders());
    const timer = setInterval(() => dispatch(fetchProfileOrders()), 5000);
    return () => clearInterval(timer);
  }, [dispatch]);

  if (isLoading && !orders.length) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
