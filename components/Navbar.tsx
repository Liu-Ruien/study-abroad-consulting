import Link from "next/link";
import { categories } from "@/lib/articles";

export default function Navbar() {
  return (
    <div className="flex gap-4">
      {categories.map((cat) => (
        <Link
          key={cat.slug}
          href={`/categories/${cat.slug}`}
          className="text-sm px-2 py-1 hover:text-blue-600"
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );
}