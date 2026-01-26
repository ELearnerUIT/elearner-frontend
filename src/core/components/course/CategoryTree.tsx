"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, ChevronDown, FolderOpen, Folder } from "lucide-react";
import type { CategoryResponse } from "@/services/courses/course.types";

interface CategoryTreeItemProps {
    category: CategoryResponse;
    level?: number;
}

function CategoryTreeItem({ category, level = 0 }: CategoryTreeItemProps) {
    const [isExpanded, setIsExpanded] = useState(level === 0);
    const hasChildren = category.children && category.children.length > 0;

    return (
        <div className="w-full">
            <div
                className={`flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-white/[0.05] transition group ${level > 0 ? "ml-" + (level * 4) : ""
                    }`}
                style={{ paddingLeft: `${level * 1.5}rem` }}
            >
                {hasChildren && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="p-1 hover:bg-white/10 rounded transition"
                    >
                        {isExpanded ? (
                            <ChevronDown className="h-4 w-4" />
                        ) : (
                            <ChevronRight className="h-4 w-4" />
                        )}
                    </button>
                )}

                {!hasChildren && <div className="w-6" />}

                {hasChildren ? (
                    isExpanded ? (
                        <FolderOpen className="h-5 w-5 text-primary" />
                    ) : (
                        <Folder className="h-5 w-5 text-muted-foreground" />
                    )
                ) : (
                    <div className="h-5 w-5 rounded-full bg-white/10 flex items-center justify-center text-xs">
                        •
                    </div>
                )}

                <Link
                    href={`/explore?category=${category.slug || category.id}`}
                    className="flex-1 font-medium text-sm hover:text-primary transition"
                >
                    {category.name}
                </Link>
            </div>

            {hasChildren && isExpanded && (
                <div className="mt-1">
                    {category.children!.map((child) => (
                        <CategoryTreeItem
                            key={child.id}
                            category={child}
                            level={level + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

interface CategoryTreeProps {
    categories: CategoryResponse[];
    loading?: boolean;
}

export default function CategoryTree({ categories, loading }: CategoryTreeProps) {
    if (loading) {
        return (
            <div className="space-y-2">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className="h-10 rounded-lg bg-white/[0.05] animate-pulse"
                    />
                ))}
            </div>
        );
    }

    if (!categories || categories.length === 0) {
        return (
            <div className="text-center py-8 text-muted-foreground">
                No categories available
            </div>
        );
    }

    return (
        <div className="space-y-1">
            {categories.map((category) => (
                <CategoryTreeItem key={category.id} category={category} />
            ))}
        </div>
    );
}
