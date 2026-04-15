import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectIsAuthChecked, selectUser } from '../../services/selectors';
import { Preloader } from '@ui';

type TProps = {
  onlyUnAuth?: boolean;
  children: JSX.Element;
};

export const ProtectedRoute: FC<TProps> = ({
  onlyUnAuth = false,
  children
}) => {
  const location = useLocation();
  const user = useSelector(selectUser);
  const isAuthChecked = useSelector(selectIsAuthChecked);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  if (onlyUnAuth && user) {
    const from = (location.state as { from?: { pathname: string } })?.from || {
      pathname: '/'
    };
    return <Navigate to={from.pathname} replace />;
  }

  return children;
};
