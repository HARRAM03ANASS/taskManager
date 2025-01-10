import React, { useState } from 'react';
import { MdOutlineSearch } from 'react-icons/md';
import { useSearchTachesQuery } from '../redux/slices/api/tacheApiSlice';
export default function Search() {
    const [query, setQuery] = useState('');
    const { data: taches, isLoading, isError } = useSearchTachesQuery(query, {
        skip: query.length < 3,
    });

    const handleSearchChange = (e) => {
        setQuery(e.target.value);
    };

return (
    <div className="relative">
            <div className="w-64 2xl:w-[400px] flex items-center px-3 py-2 gap-2 rounded-full bg-[#f3f4f6]">
                <MdOutlineSearch className="text-gray-500 text-xl" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="flex-1 outline-none bg-transparent placeholder:text-gray-500 text-gray-800"
                    value={query}
                    onChange={handleSearchChange}
                />
            </div>

            {query && (
                <div className="absolute bg-white border shadow-lg mt-2 w-64 2xl:w-[400px] max-h-60 overflow-y-auto z-20">
                    {isLoading && <div className="px-4 py-2">Loading...</div>}
                    {isError && <div className="px-4 py-2">Error fetching results</div>}
                    {taches && taches.length > 0 ? (
                        taches.map((tache) => (
                            <div
                                key={tache._id}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => window.location.href = `/tache/${tache._id}`}
                            >
                                <div className="font-medium">{tache.titre}</div>
                                <div className="text-sm text-gray-500">{tache.description}</div>
                            </div>
                        ))
                    ) : (
                        <div className="px-4 py-2">No results found</div>
                    )}
                </div>
            )}
        </div>
  )
}

