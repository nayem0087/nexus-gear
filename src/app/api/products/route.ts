import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function POST(req: Request) {
    try {
        const newProduct = await req.json();

        const db = await getDb();
        const productsCollection = db.collection("products");

        const result = await productsCollection.insertOne(newProduct);

        return NextResponse.json(result, { status: 201 });
    } catch (err) {
        console.error("🔥 POST /api/products error:", err);
        return NextResponse.json(
            { error: "Failed to add product" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const db = await getDb();
        const productsCollection = db.collection("products");

        const products = await productsCollection.find({}).toArray();

        return NextResponse.json(products);
    } catch (err) {
        console.error("🔥 GET /api/products error:", err);
        return NextResponse.json(
            { error: "Failed to fetch products" },
            { status: 500 }
        );
    }
}