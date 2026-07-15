"use client";

import { useEffect, useMemo, useState } from "react";
import { Skeleton, Card, Button, Input } from "@heroui/react";
import NextImage from "next/image";
import Link from "next/link";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

interface Product {
    _id: string;
    title: string;
    shortDescription?: string;
    description?: string;
    price: number;
    date?: string;
    priority?: string;
    image?: string;
}

type SortOption = "newest" | "oldest" | "price-low" | "price-high" | "title-az";

const ITEMS_PER_PAGE = 6;

export default function ItemsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    // search & filters
    const [search, setSearch] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("all");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [sortBy, setSortBy] = useState<SortOption>("newest");

    // pagination
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetch("http://localhost:5000/api/products")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) setProducts(data);
                setLoading(false);
            });
    }, []);

    // reset to page 1 whenever a filter/search/sort changes
    useEffect(() => {
        setCurrentPage(1);
    }, [search, priorityFilter, minPrice, maxPrice, sortBy]);

    const filteredAndSorted = useMemo(() => {
        let result = [...products];

        // SEARCH (title)
        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter((p) => p.title?.toLowerCase().includes(q));
        }

        // FILTER: priority
        if (priorityFilter !== "all") {
            result = result.filter((p) => p.priority === priorityFilter);
        }

        // FILTER: price range
        const min = minPrice ? parseFloat(minPrice) : null;
        const max = maxPrice ? parseFloat(maxPrice) : null;
        if (min !== null) result = result.filter((p) => p.price >= min);
        if (max !== null) result = result.filter((p) => p.price <= max);

        // SORT
        result.sort((a, b) => {
            switch (sortBy) {
                case "price-low":
                    return a.price - b.price;
                case "price-high":
                    return b.price - a.price;
                case "title-az":
                    return (a.title || "").localeCompare(b.title || "");
                case "oldest":
                    return new Date(a.date || 0).getTime() - new Date(b.date || 0).getTime();
                case "newest":
                default:
                    return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime();
            }
        });

        return result;
    }, [products, search, priorityFilter, minPrice, maxPrice, sortBy]);

    const totalPages = Math.max(1, Math.ceil(filteredAndSorted.length / ITEMS_PER_PAGE));
    const paginated = filteredAndSorted.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const clearFilters = () => {
        setSearch("");
        setPriorityFilter("all");
        setMinPrice("");
        setMaxPrice("");
        setSortBy("newest");
    };

    return (
        <div className="w-full bg-black text-white p-6 md:p-12">
            <div className="max-w-[1200px] mx-auto mb-8">
                <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
                    Tech Collection
                </h2>
                <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
                    Discover our premium collection of cutting-edge technology and
                    high-performance gear, carefully selected to meet the demands of
                    professionals, creators, and tech enthusiasts.
                </p>
            </div>

            {/* SEARCH + FILTERS + SORT */}
            <div className="max-w-[1200px] mx-auto mb-10">
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col gap-4">
                    {/* Search bar */}
                    <div className="relative">
                        <Search
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                        />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search products by title..."
                            className="w-full h-12 pl-11 pr-4 rounded-xl border border-white/10 bg-black/50 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {/* Filter: Priority */}
                        <div>
                            <label className="text-xs text-zinc-500 mb-1 block">Priority</label>
                            <select
                                value={priorityFilter}
                                onChange={(e) => setPriorityFilter(e.target.value)}
                                className="w-full h-11 rounded-xl border border-white/10 bg-black/50 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                            >
                                <option value="all">All Priorities</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>

                        {/* Filter: Min Price */}
                        <div>
                            <label className="text-xs text-zinc-500 mb-1 block">Min Price</label>
                            <input
                                type="number"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                placeholder="$0"
                                className="w-full h-11 rounded-xl border border-white/10 bg-black/50 px-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>

                        {/* Filter: Max Price */}
                        <div>
                            <label className="text-xs text-zinc-500 mb-1 block">Max Price</label>
                            <input
                                type="number"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                placeholder="No limit"
                                className="w-full h-11 rounded-xl border border-white/10 bg-black/50 px-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>

                        {/* Sort */}
                        <div>
                            <label className="text-xs text-zinc-500 mb-1 block">Sort By</label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as SortOption)}
                                className="w-full h-11 rounded-xl border border-white/10 bg-black/50 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                            >
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="title-az">Title: A-Z</option>
                            </select>
                        </div>

                        {/* Clear filters */}
                        <div className="flex items-end">
                            <button
                                onClick={clearFilters}
                                className="w-full h-11 rounded-xl border border-white/10 text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition"
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>
                </div>

                {!loading && (
                    <p className="text-sm text-zinc-500 mt-4">
                        Showing {paginated.length} of {filteredAndSorted.length} results
                    </p>
                )}
            </div>

            {/* GRID */}
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {loading ? (
                    [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
                ) : paginated.length === 0 ? (
                    <p className="col-span-full text-center text-zinc-500 py-16">
                        No items match your filters.
                    </p>
                ) : (
                    paginated.map((product) => (
                        <Card
                            key={product._id}
                            className="p-4 bg-zinc-900 border border-zinc-800 hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 group cursor-pointer rounded-xl"
                        >
                            <div className="transition-transform duration-500 group-hover:scale-[1.03]">
                                <Card.Header>
                                    <Card.Title className="text-xl font-bold">
                                        {product.title}
                                    </Card.Title>
                                    {product.priority && (
                                        <Card.Description className="text-zinc-500 text-sm capitalize">
                                            {product.priority} priority
                                        </Card.Description>
                                    )}
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
                                    <p className="text-zinc-400 text-sm mt-4 line-clamp-2">
                                        {product.shortDescription || product.description}
                                    </p>
                                </Card.Content>

                                <Card.Footer className="flex justify-between items-center mt-4">
                                    <span className="text-xl font-bold text-blue-400">
                                        ${product.price}
                                    </span>
                                    <Link href={`/items/${product._id}`}>
                                        <Button
                                            color="primary"
                                            variant="flat"
                                            size="sm"
                                            className="font-semibold bg-cyan-800 py-1 px-3 rounded-full"
                                        >
                                            View Details
                                        </Button>
                                    </Link>
                                </Card.Footer>
                            </div>
                        </Card>
                    ))
                )}
            </div>

            {/* PAGINATION */}
            {!loading && totalPages > 1 && (
                <div className="max-w-[1200px] mx-auto flex items-center justify-center gap-2 mt-12">
                    <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-white/10 text-zinc-400 hover:bg-white/5 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition"
                    >
                        <ChevronLeft size={18} />
                    </button>

                    {[...Array(totalPages)].map((_, i) => {
                        const page = i + 1;
                        return (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`w-10 h-10 rounded-lg text-sm font-medium transition ${
                                    currentPage === page
                                        ? "bg-blue-600 text-white"
                                        : "text-zinc-400 border border-white/10 hover:bg-white/5 hover:text-white"
                                }`}
                            >
                                {page}
                            </button>
                        );
                    })}

                    <button
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg border border-white/10 text-zinc-400 hover:bg-white/5 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            )}
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