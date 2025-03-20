import React, { Key, useEffect, useMemo, useState } from 'react';

import { useAppSelector } from 'src/Store';
import TableRow from './TableRow';
import QuestionsListTableSkeletonLoader from './SkeletonLoader';
import Pagination from './Pagination';
import FilterDropdown from './FilterDropdown';
import ActiveFilters, { Filters } from './ActiveFilters';
import debounce from 'src/utils/debounce';
import { getAllQuestionsActionDispatcher } from '../../dashboard.action';
import useIsFirstRender from 'src/hooks/useIsFirstRender';
import Icons from 'src/assets/svg';

const tableHeaderData = [
    { name: 'status', colWidth: 'w-2/12', allowSorting: true },
    { name: 'question', colWidth: 'w-8/12', allowSorting: false },
    { name: 'difficulty', colWidth: 'w-2/12', allowSorting: true },
];

const QuestionsListTable = () => {
    const [filters, setFilters] = useState<Filters>({
        status: {
            todo: false,
            attempted: false,
            solved: false,
        },
        difficulty: {
            easy: false,
            medium: false,
            hard: false,
        },
    });

    const [sort, setSort] = useState<
        Record<keyof Filters, 'ASC' | 'DESC' | ''> | Record<string, string>
    >({});

    // Track which filter dropdown is open
    const [openFilter, setOpenFilter] = useState<string | null>(null);
    const isFirstRender = useIsFirstRender();

    const { loading, data } = useAppSelector((store) => store.dashboard);

    const { list: tableData = [] } = data || {};

    const toggleFilter = (filterType: string) => {
        setOpenFilter((prev) => {
            return prev === filterType ? null : filterType;
        });
    };

    const handleFilterChange = (
        filterType: keyof Filters,
        filterValue: keyof Filters[keyof Filters]
    ) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterType]: {
                ...prevFilters[filterType],
                [filterValue]: !prevFilters[filterType][filterValue],
            },
        }));
    };

    const handleRemoveAppliedFilter = (
        filterParent: keyof Filters,
        filterChild: keyof Filters[keyof Filters]
    ) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterParent]: {
                ...prevFilters[filterParent],
                [filterChild]: false,
            },
        }));
    };

    const debouncedFetchQuestions = useMemo(
        () =>
            debounce(500, ({ searchQuery, sortQuery }) => {
                getAllQuestionsActionDispatcher({
                    searchQuery,
                    sortQuery,
                });
            }),
        []
    );

    const handleSortChange = (name: string) => {
        setSort((prevSort) => {
            const steps = ['ASC', 'DESC', ''];
            const getNextStep = (currentStep: string) => {
                const currentIndex = steps.indexOf(currentStep);
                return steps[(currentIndex + 1) % steps.length];
            };

            const nextSort = {};

            if (prevSort[name as keyof typeof prevSort]) {
                const nextStep = getNextStep(
                    (prevSort as Record<string, string>)[name]
                );

                if (!nextStep) {
                    delete (nextSort as Record<string, string>)[name];
                } else {
                    Object.assign(nextSort, {
                        [name]: nextStep,
                    });
                }
            } else {
                Object.assign(nextSort, {
                    [name]: 'ASC',
                });
            }

            return nextSort;
        });
    };

    useEffect(() => {
        if (isFirstRender) return;

        const searchQuery = Object.entries(filters)
            .flatMap((data) => {
                const [parent, children] = data;
                const activeFilters = Object.keys(children).filter(
                    (key) => (children as Record<string, boolean>)[key]
                );
                return activeFilters.length
                    ? `${parent}=${activeFilters.join(',')}`
                    : [];
            })
            .join('&');

        debouncedFetchQuestions({ searchQuery });

        return () => {
            debouncedFetchQuestions.cancel();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters, debouncedFetchQuestions]);

    useEffect(() => {
        if (isFirstRender) return;

        let sortQuery = '';

        Object.entries(sort).forEach(([key, value]) => {
            if (value) {
                sortQuery += `sortBy=${key}&sortOrder=${value}`;
            }
        });

        debouncedFetchQuestions({ sortQuery });

        return () => {
            debouncedFetchQuestions.cancel();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sort]);

    return (
        <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="bg-white border border-gray-200 rounded-xl shadow-xs my-2">
                <div className="px-6 py-4">
                    <div className="flex gap-6 items-center">
                        <FilterDropdown
                            type="status"
                            label="Status"
                            filters={filters}
                            toggleFilter={toggleFilter}
                            openFilter={openFilter}
                            handleFilterChange={handleFilterChange}
                            setOpenFilter={setOpenFilter}
                        />
                        <FilterDropdown
                            type="difficulty"
                            label="Difficulty"
                            filters={filters}
                            toggleFilter={toggleFilter}
                            openFilter={openFilter}
                            handleFilterChange={handleFilterChange}
                            setOpenFilter={setOpenFilter}
                        />
                    </div>
                    <ActiveFilters
                        filters={filters}
                        handleRemoveAppliedFilter={handleRemoveAppliedFilter}
                    />
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl shadow-xs my-2">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            {tableHeaderData.map((item, index) => (
                                <th
                                    className={`ps-6 py-3 text-start ${item.colWidth}`}
                                    key={index}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-semibold uppercase text-gray-800">
                                            {item.name}
                                        </span>

                                        {item.allowSorting && (
                                            <button
                                                className="px-2 hover:scale-125 transition-all duration-100 py-1"
                                                onClick={() =>
                                                    handleSortChange(item.name)
                                                }
                                            >
                                                <Icons.Components.SortUpArrow
                                                    color={`${
                                                        sort[
                                                            item.name as keyof typeof sort
                                                        ] === 'ASC'
                                                            ? '#364153'
                                                            : '#d1d5dc'
                                                    }`}
                                                />
                                                <Icons.Components.SortDownArrow
                                                    color={`${
                                                        sort[
                                                            item.name as keyof typeof sort
                                                        ] === 'DESC'
                                                            ? '#364153'
                                                            : '#d1d5dc'
                                                    }`}
                                                />
                                            </button>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {loading ? (
                            <QuestionsListTableSkeletonLoader />
                        ) : (
                            tableData.map((item, index) => (
                                <TableRow key={index} item={item} />
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl shadow-xs">
                <Pagination />
            </div>
        </div>
    );
};

export default QuestionsListTable;
