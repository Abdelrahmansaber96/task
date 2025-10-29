import Image from "next/image";

async function getSingleProduct(id) {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  return res.json();
}
async function getallProducts() {
  const res = await fetch(`https://dummyjson.com/products`);
  return res.json();
}

export async function generateStaticParams() {
  const products = await getallProducts();
  const ids = products.products.map((product) => {
    return { id: product.id.toString() };
  });
  return ids;
}

async function ProductDetails({ params }) {
  const { id } = await params;
  const product = await getSingleProduct(id);

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <Image
        src={product.thumbnail}
        width={100}
        height={100}
        alt="hello"
        className="w-full h-96 object-cover rounded-lg shadow-md mb-6"
      />
      <h1 className="text-3xl font-bold mb-3">{product.title}</h1>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <p className="text-lg font-semibold text-slate-800 mb-2">
        Price: ${product.price}
      </p>
      <p className="text-sm text-gray-500">Brand: {product.brand}</p>
    </div>
  );
}

export default ProductDetails;
