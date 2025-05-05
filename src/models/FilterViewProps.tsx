export interface FilterViewModelProps {
    filters: Filter,
    handleApply: () => void
    handleClear: () => void;
    handleChange: (key: string, value: string) => void
}

export interface Filter {
    title: string,
    minPrice: string,
    maxPrice: string,
    categorySlug: string,
}