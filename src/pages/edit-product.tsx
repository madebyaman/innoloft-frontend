import React from 'react';
import { ContentEditorWrapper } from '../components/EditorWrapper';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  updateBusinessModel,
  updateCategory,
  updateTRL,
  updateTitle,
} from '../store/product-slice';
import useTRL from '../hooks/useTRL';
import useConfiguration from '../hooks/useConfiguration';

export default function EditProduct() {
  const { configuration } = useConfiguration();
  const { data, isLoading, error } = useTRL();
  const product = useAppSelector((state) => state.product.product);
  const dispatch = useAppDispatch();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const req = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/product/6781/`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      }
    );
    const data = await req.json();
    console.log({ data });
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white p-4 shadow border border-slate-200 rounded-sm">
      <h1 className="mb-8">Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="space-y-8">
          <div className="border-b border-gray-900/10 pb-12 flex gap-4 flex-col">
            <h2 className="text-base font-semibold leading-7 text-gray-700">
              Basic information
            </h2>
            <div>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Title"
                value={product?.name}
                onChange={(e) => dispatch(updateTitle(e.target.value))}
              ></input>
            </div>
            <div>
              <p className="text-sm font-medium mb-1 text-gray-700">
                Description
              </p>
              <ContentEditorWrapper />
            </div>
          </div>
          <div className="border-b border-gray-900/10 pb-12 flex gap-4 flex-col">
            <h2 className="text-base font-semibold leading-7 text-gray-700">
              Other details
            </h2>
            <div className="grid sm:grid-cols-2">
              <div>
                <label htmlFor="categories">Categories</label>
                <input
                  type="text"
                  name="categories"
                  id="categories"
                  placeholder="Category"
                  value={product?.categories[0].name}
                  onChange={(e) => dispatch(updateCategory(e.target.value))}
                ></input>
              </div>
              <div>
                <label htmlFor="business-model">Business Models</label>
                <input
                  type="text"
                  name="business-model"
                  id="business-model"
                  value={product?.businessModels[0].name}
                  onChange={(e) =>
                    dispatch(updateBusinessModel(e.target.value))
                  }
                  placeholder="Business Model"
                ></input>
              </div>
            </div>
            <div>
              <label htmlFor="trl">TRL</label>
              <select
                id="trl"
                name="trl"
                value={product?.trl.id}
                onChange={(e) => {
                  const selectedTrl = data.find(
                    (item: { id: string }) => item.id === e.target.value
                  );
                  dispatch(updateTRL(selectedTrl));
                }}
              >
                {data.map((item: { id: string; name: string }) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            style={{
              backgroundColor: configuration.mainColor,
            }}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
