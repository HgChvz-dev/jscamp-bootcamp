import { useState, useEffect } from "react"

const RESULTS_PER_PAGE = 4;

const INITIAL_FILTERS = {
    technology: '',
    location: '',
    experienceLevel: ''
};

export function useFilters() {
    const [filters, setFilters] = useState(() => {
        try {
            const saved = localStorage.getItem('jobFilters');
            return saved ? JSON.parse(saved) : INITIAL_FILTERS;
        } catch {
            return INITIAL_FILTERS;
        }
    });
    const [textToFilter, setTextToFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [jobs, setJobs] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filtersKey, setFiltersKey] = useState(0);

    const hasActiveFilters = Object.values(filters).some(value => value !== '') || textToFilter !== '';

    useEffect(() => {
        localStorage.setItem('jobFilters', JSON.stringify(filters));
    }, [filters]);

    const handleClearFilters = () => {
        setFilters(INITIAL_FILTERS);
        setTextToFilter('');
        setCurrentPage(1);
        setFiltersKey(prev => prev + 1);
        localStorage.removeItem('jobFilters');
        window.history.pushState({}, '', '/search');
    }

    useEffect(() => {
        async function fetchJobs() {
            try {
                setError(null);
                setLoading(true);
                const params = new URLSearchParams();
                if (textToFilter) params.append('text', textToFilter);
                if (filters.technology) params.append('technology', filters.technology);
                if (filters.location) params.append('type', filters.location);
                if (filters.experienceLevel) params.append('level', filters.experienceLevel);

                const offset = (currentPage - 1) * RESULTS_PER_PAGE;
                params.append('limit', RESULTS_PER_PAGE);
                params.append('offset', offset);

                const queryParams = params.toString();
                await new Promise(resolve => setTimeout(resolve, 2000));
                const response = await fetch(`https://jscamp-api.vercel.app/api/jobs?${queryParams}`);

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: No se pudo obtener los empleos`);
                }

                const json = await response.json();
                setJobs(json.data);
                setTotal(json.total);
            } catch (error) {
                if (!navigator.onLine) {
                    setError('No tienes conexión a internet. Verifica tu conexión e intenta de nuevo.');
                } else {
                    setError(error.message || 'Ocurrió un error inesperado. Intenta de nuevo.');
                }
            } finally {
                setLoading(false);
            }
        }
        fetchJobs();
    }, [filters, textToFilter, currentPage]);

    const totalPages = Math.ceil(total / RESULTS_PER_PAGE);

    const handlePageChange = (page) => {
        setCurrentPage(page);

        const params = new URLSearchParams(window.location.search);
        params.set('page', page);
        window.history.pushState({}, '', `/search?${params.toString()}`);
    }

    const handleSearch = (newFilters) => {
        setFilters(newFilters);
        setCurrentPage(1);

        const params = new URLSearchParams();
        if (newFilters.technology) params.append('technology', newFilters.technology);
        if (newFilters.location) params.append('location', newFilters.location);
        if (newFilters.experienceLevel) params.append('experienceLevel', newFilters.experienceLevel);

        const newUrl = params.toString()
            ? `/search?${params.toString()}`
            : '/search';

        window.history.pushState({}, '', newUrl);
    }

    const handleTextFilter = (newTextToFilter) => {
        setTextToFilter(newTextToFilter);
        setCurrentPage(1);
    }

    return {
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
    }
}