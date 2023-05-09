import { Outlet, Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import useConfiguration from '../hooks/useConfiguration';

const navigation = [
  { name: 'Main Page', href: '/' },
  { name: 'Product', href: '/product' },
  { name: 'Edit Product', href: '/product/edit' },
];

export default function MainLayout() {
  const { configuration, isLoading } = useConfiguration();
  const location = useLocation();

  if (isLoading) return <p>Loading</p>;

  return (
    <div className="bg-slate-100">
      <header className="flex items-center justify-between max-w-6xl mx-auto px-4 pt-4">
        <Link to="/" className="w-40">
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
                  'text-sm hover:underline decoration-slate-400 underline-offset-2',
                  isActive && 'underline decoration-slate-400'
                )}
                style={{
                  color: configuration.mainColor,
                }}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </header>
      <main className="mt-4 max-w-6xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
