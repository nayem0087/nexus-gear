"use client";

import { useEffect, useState } from "react";
import { Skeleton, Card, Button } from "@heroui/react";
import NextImage from "next/image";

export default function ItemsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setProducts(data);
        setLoading(false);
      });
  }, []);

  return (
    // সম্পূর্ণ ব্যাকগ্রাউন্ড কালো এবং প্রফেশনাল প্যাডিং
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      {/* সেকশন টাইটেল */}
      <div className="max-w-[1400px] mx-auto mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
          Premium Tech Collection
        </h2>
        <p className="text-gray-400 text-lg">Explore our high-performance gear designed for professionals.</p>
      </div>

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {loading
          ? [...Array(8)].map((_, i) => <SkeletonCard key={i} />)
          : products.map((product: any) => (
              <Card
                key={product._id}
                className="p-4 bg-zinc-900 border border-zinc-800 hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 group cursor-pointer"
              >
                {/* কার্ড হোভার অ্যানিমেশন */}
                <div className="transition-transform duration-500 group-hover:scale-[1.03]">
                  <Card.Header>
                    <Card.Title className="text-xl font-bold">{product.title}</Card.Title>
                    <Card.Description className="text-zinc-500 text-sm">{product.location}</Card.Description>
                  </Card.Header>

                  <Card.Content className="py-2">
                    <div className="relative w-full h-[180px] overflow-hidden rounded-lg">
                      <NextImage
                        src={product.image || "/fallback.jpg"}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <p className="text-zinc-400 text-sm mt-4 line-clamp-2">{product.description}</p>
                  </Card.Content>

                  <Card.Footer className="flex justify-between items-center mt-4">
                    <span className="text-xl font-bold text-blue-400">${product.price}</span>
                    <Button color="primary" variant="flat" size="sm" className="font-semibold">
                      View Details
                    </Button>
                  </Card.Footer>
                </div>
              </Card>
            ))}
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <Card className="p-4 bg-zinc-900 border border-zinc-800">
      <Skeleton className="h-8 w-3/4 mb-4 rounded-lg bg-zinc-700" />
      <Skeleton className="h-[150px] w-full rounded-lg mb-4 bg-zinc-700" />
      <Skeleton className="h-4 w-full bg-zinc-700" />
    </Card>
  );
}