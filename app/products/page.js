import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "./loading";

async function Products() {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  console.log(data);

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>

        {data.products.map((prod) => {
          return (
            <div
              key={prod.id}
              className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96"
            >
              <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
                <Image
                  src={prod.thumbnail}
                  width={100}
                  height={100}
                  alt="hello"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-4">
                <h6 className="mb-2 text-slate-800 text-xl font-semibold">
                  {prod.title}
                </h6>
                <p className="text-slate-600 leading-normal font-light line-clamp-3">
                  {prod.description}
                </p>
              </div>
              <div className="px-4 pb-4 pt-0 mt-2">
                <Link href={`/products/${prod.id}`}>
                  <button
                    className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                  >
                    Read more
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Products;
