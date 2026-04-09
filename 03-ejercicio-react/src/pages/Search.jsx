import { useEffect } from "react"
import { useFilters } from "../hooks/useFilters.jsx"
import { SearchFormSection } from "../components/SearchFormSection.jsx"
import { JobListings } from "../components/JobListings.jsx"
import { Pagination } from "../components/Pagination.jsx"

export function SearchPage() {
    const {
        loading,
        error,
        jobs,
        total,
        totalPages,
        currentPage,
        hasActiveFilters,
        handlePageChange,
        handleSearch,
        handleTextFilter,
        handleClearFilters,
        filtersKey,
        filters
    } = useFilters();

    const title = loading ? 'Cargando...' : `Resultados: ${total}, pagina ${currentPage} - DevJobs`;

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const textFromUrl = params.get('text') || '';
        const technologyFromUrl = params.get('technology') || '';
        const nivelFromUrl = params.get('nivel') || '';
        const modalidadFromUrl = params.get('modalidad') || '';

        if (textFromUrl) handleTextFilter(textFromUrl);
        if (technologyFromUrl || nivelFromUrl || modalidadFromUrl) {
            handleSearch({
                technology: technologyFromUrl,
                nivel: nivelFromUrl,
                modalidad: modalidadFromUrl
            });
        }
    }, []);

    return (
        <main>
          <title>{title}</title>
            <SearchFormSection 
              onSearch={handleSearch} 
              onTextFilter={handleTextFilter}
              hasActiveFilters={hasActiveFilters}
              onClearFilters={handleClearFilters}
              filtersKey={filtersKey}
              currentFilters={filters}
            />
            <JobListings 
              jobs={jobs} 
              loading={loading} 
              error={error}
            />
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={handlePageChange} 
            />
        </main>
    )
}