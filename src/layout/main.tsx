import { Outlet, Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import useConfiguration from '../hooks/useConfiguration';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import React from 'react';
import { fetchProduct } from '../store/product-slice';

const navigation = [
  { name: 'Main Page', href: '/' },
  { name: 'Product', href: '/product' },
  { name: 'Edit Product', href: '/product/edit' },
];

export default function MainLayout() {
  const { configuration, isLoading } = useConfiguration();
  const location = useLocation();
  const product = useAppSelector((state) => state.product.product);
  const status = useAppSelector((state) => state.product.status);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (status === 'idle' && !product) {
      dispatch(fetchProduct());
    }
  }, [dispatch, status, product]);

  if (status === 'loading' || isLoading) return <div>Loading...</div>;
  if (status === 'failed') return <div>Failed to fetch</div>;
  if (!product) return <div>No product found</div>;

  return (
    <>
      <header
        style={{
          backgroundColor: configuration.mainColor || '#777',
        }}
      >
        <div className="flex items-center justify-between max-w-6xl mx-auto px-4 py-6">
          <Link to="/" className="w-32 bg-white p-4 rounded-sm">
            <img src={configuration.logo} alt="logo" />
          </Link>
          <nav className="flex gap-4 items-center">
            {navigation.map((item) => {
              const isActive = item.href === location.pathname;
              return (
                <Link
                  to={item.href}
                  key={item.name}
                  className={clsx(
                    'text-sm text-white hover:underline decoration-slate-400 underline-offset-2',
                    isActive && 'underline decoration-slate-200'
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <div className="bg-slate-100">
        <main className="max-w-6xl mx-auto px-4 py-8">
          <Outlet />
        </main>
      </div>
    </>
  );
}
