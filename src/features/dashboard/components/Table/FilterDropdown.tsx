import { React, useRef } from 'src/deps';

import Icons from 'src/assets/svg';
import Button from 'src/features/auth/components/Button';
import useOnClickOutside from 'src/hooks/useOnClickOutside';
import { Filters } from './ActiveFilters';

type FilterDropdownProps = {
    type: keyof Filters;
    label: string;
    filters: Filters;
    toggleFilter: (filterType: keyof Filters) => void;
    openFilter: string | null;
    handleFilterChange: (
        filterType: keyof Filters,
        filterValue: keyof Filters[keyof Filters]
    ) => void;
    setOpenFilter: React.Dispatch<React.SetStateAction<string | null>>;
};
const FilterDropdown = ({
    type,
    label,
    filters,
    toggleFilter,
    openFilter,
    handleFilterChange,
    setOpenFilter,
}: FilterDropdownProps) => {
    const filterRef = useRef<HTMLDivElement | null>(null);

    useOnClickOutside(filterRef, (event) => {
        const clickedElement = event.target as Element;
        const closestButton = clickedElement?.closest('button');
        const buttonName = closestButton?.getAttribute('name');

        if (buttonName === 'questions-table-filter-button') return;

        setOpenFilter(null);
    });

    const activeFilterCount = Object.values(filters[type]).filter(
        Boolean
    ).length;

    return (
        <div className="relative">
            <Button
                name="questions-table-filter-button"
                variant="outlineGray"
                size="sm"
                startIcon={<Icons.Images24.FilterIcon />}
                label={label}
                className="shadow-2xs border-gray-200"
                onClick={() => {
                    toggleFilter(type);
                }}
                endIcon={
                    <span className="flex rounded-full text-xs font-medium border border-gray-300 text-gray-800 aspect-square items-center justify-center w-6">
                        {activeFilterCount}
                    </span>
                }
                dontShowFocusClasses={true}
            />
            {openFilter === type && (
                <div
                    ref={filterRef}
                    className="absolute transition-opacity duration-200 divide-y divide-gray-200 min-w-48 bg-white shadow-lg rounded-lg mt-2"
                >
                    <div className="divide-y divide-gray-200">
                        {Object.entries(filters[type]).map(
                            ([filter, value]) => (
                                <label
                                    key={filter}
                                    className="flex py-2 px-4 hover:bg-gray-100"
                                >
                                    <button
                                        className="mt-0.5 border-gray-300 rounded-sm flex justify-between grow"
                                        onClick={() =>
                                            handleFilterChange(
                                                type,
                                                filter as keyof Filters[keyof Filters]
                                            )
                                        }
                                    >
                                        <span className="text-sm text-gray-800 capitalize">
                                            {filter}
                                        </span>
                                        {value && (
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M6.36667 12L2.56667 8.2L3.51667 7.25L6.36667 10.1L12.4833 3.98333L13.4333 4.93333L6.36667 12Z"
                                                    fill="#1F2937"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                </label>
                            )
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterDropdown;
