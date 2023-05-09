import { useEffect } from 'react';
import clsx from 'clsx';
import dompurify from 'dompurify';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProduct } from '../store/product-slice';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import useConfiguration from '../hooks/useConfiguration';

export default function Product() {
  const { configuration, isLoading } = useConfiguration();
  const product = useAppSelector((state) => state.product.product);
  const status = useAppSelector((state) => state.product.status);
  const loading = status === 'loading';
  const error = status === 'failed';
  const errorMessage = useAppSelector((state) => state.product.error);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === 'idle' && !product) {
      dispatch(fetchProduct());
    }
  }, [dispatch, status, product]);

  if (loading || isLoading) return <div>Loading...</div>;
  if (error) return <div>{errorMessage}</div>;
  if (!product) return <div>No product found</div>;
  const containerStyle = {
    width: 'auto',
    height: '200px',
  };

  const center = {
    lat: Number(product.company.address.latitude),
    lng: Number(product.company.address.longitude),
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row border border-slate-200 bg-white shadow-sm">
        <div
          className={clsx(
            'sm:w-3/4 p-4 border-slate-200 relative',
            configuration.hasUserSection && 'sm:border-r'
          )}
        >
          <span className="absolute tag top-0 left-0">{product.type.name}</span>
          <img src={product.picture} alt={product.name} />
          <h1
            className="text-3xl font-medium text-gray-800"
            style={{
              color: configuration.mainColor,
            }}
          >
            {product.name}
          </h1>
          <div
            className="prose text-gray-600"
            dangerouslySetInnerHTML={{
              __html: dompurify.sanitize(product.description),
            }}
          />
        </div>
        {configuration.hasUserSection ? (
          <div className="p-4 sm:w-1/4 flex flex-col gap-3">
            <h2
              style={{
                color: configuration.mainColor,
              }}
            >
              Offered by
            </h2>
            <img src={product.company.logo} alt={product.company.name} />
            <img
              src={product.user.profilePicture}
              className="rounded-full w-20"
              alt={product.user.firstName}
            />
            <div>
              <p>
                {product.user.firstName} {product.user.lastName}
              </p>
            </div>
            <div>
              <p>{product.company.name}</p>
              <p>
                {product.company.address.house},{' '}
                {product.company.address.street},{' '}
                {product.company.address.city.name},{' '}
                {product.company.address.country.name}{' '}
                {product.company.address.zipCode}
              </p>
            </div>
            {/* <div id="mapid" style={{ height: '1000px' }}></div> */}
            <LoadScript googleMapsApiKey={import.meta.env.GOOGLE_API_KEY}>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
              >
                {/* Child components, such as markers, info windows, etc. */}
                <></>
              </GoogleMap>
            </LoadScript>
          </div>
        ) : null}
      </div>
      <div className="border border-slate-200 bg-white p-4 shadow-sm">
        <h2
          style={{
            color: configuration.mainColor,
          }}
        >
          Video
        </h2>
        <iframe
          className="mx-auto aspect-video"
          title="Youtube Player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          width="560"
          height="315"
          src={product.video}
        ></iframe>
      </div>
      <div className="border border-slate-200 bg-white p-4 shadow-sm">
        <h2
          style={{
            color: configuration.mainColor,
          }}
        >
          Offer Details
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 sm:justify-between">
          <div className="flex flex-col gap-4 sm:w-1/2">
            <div>
              <h3>Business Models</h3>
              <ul className="flex gap-2">
                {product.businessModels.map((businessModel) => (
                  <li key={businessModel.id} className="tag">
                    {businessModel.name}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Costs</h3>
              <p className="tag w-auto inline">{product.investmentEffort}</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:w-1/2">
            <div>
              <h3>TRL</h3>
              <p className="tag inline-block w-auto">{product.trl.name}</p>
            </div>
            <div>
              <h3>Categories</h3>
              <div className="flex flex-col sm:flex-row gap-2">
                {product.categories.map((category) => (
                  <p key={category.id} className="tag inline-block">
                    {category.name}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
