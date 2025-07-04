import Image from "next/image";
import { Navbar } from "@/components/local/navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Welcome to ShopVibe
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Discover amazing products with our modern ecommerce experience
            </p>
            <div className="space-y-8">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="h-96 bg-white/50 dark:bg-black/20 rounded-lg backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <p className="text-2xl font-semibold text-gray-600 dark:text-gray-300">
                    Content Section {i + 1}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
