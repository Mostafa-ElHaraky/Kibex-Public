"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  name: string;
  item: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-xs font-geist text-white/40 mb-8" aria-label="Breadcrumb">
      <Link 
        href="/" 
        className="flex items-center gap-1 hover:text-[#4633FF] transition-colors"
      >
        <Home size={12} />
        <span>Главная</span>
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight size={10} className="text-white/20" />
          <Link 
            href={item.item}
            className={`hover:text-[#4633FF] transition-colors ${
              index === items.length - 1 ? "text-white/60 pointer-events-none" : ""
            }`}
          >
            {item.name}
          </Link>
        </div>
      ))}
    </nav>
  );
}
