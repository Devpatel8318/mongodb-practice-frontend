import { useEffect, useMemo, useRef, useState } from 'react';
import Button from 'src/features/auth/components/Button';
import useOnClickOutside from 'src/hooks/useOnClickOutside';
import { useAppSelector } from 'src/Store';
import debounce from 'src/utils/debounce';
import { getAllQuestionsActionDispatcher } from '../../dashboard.action';
import Icons from 'src/assets/svg';
import useIsFirstRender from 'src/hooks/useIsFirstRender';

const ItemsPerPageDropdown = ({
    itemsPerPageOptions,
    itemsPerPage,
    setItemsPerPage,
}: {
    itemsPerPageOptions: number[];
    itemsPerPage: number;
    setItemsPerPage: (value: number) => void;
}) => {
    const filterRef = useRef(null);

    const [showDropDown, setShowDropDown] = useState(false);

    const toggleFilter = () => {
        setShowDropDown((prev) => !prev);
    };

    useOnClickOutside(filterRef, (event) => {
        const clickedElement = event.target;
        const closestButton = (clickedElement as Element)?.closest('button');
        const buttonName = closestButton?.getAttribute('name');

        if (buttonName === 'questions-table-items-per-page-button') return;

        setShowDropDown(false);
    });

    return (
        <div className="relative">
            <Button
                name="questions-table-items-per-page-button"
                variant="outlineGray"
                size="sm"
                className="shadow-2xs border-gray-200"
                onClick={toggleFilter}
                dontShowFocusClasses={true}
            >
                {itemsPerPage} / page
            </Button>
            {showDropDown && (
                <div
                    ref={filterRef}
                    className="absolute transition-opacity duration-200 divide-y divide-gray-200 min-w-48 z-20 bg-white shadow-lg rounded-lg mt-2 mb-2 bottom-full"
                >
                    <div className="divide-y divide-gray-200">
                        {itemsPerPageOptions.map((option) => (
                            <label
                                key={option}
                                className="flex py-2 px-4 hover:bg-gray-100"
                            >
                                <button
                                    className="mt-0.5 border-gray-300 rounded-sm flex justify-between grow"
                                    onClick={() => {
                                        setItemsPerPage(option);
                                        setShowDropDown(false);
                                    }}
                                >
                                    <span className="text-sm text-gray-800 capitalize ">
                                        {option}
                                    </span>
                                    {itemsPerPage === option && (
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
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const Pagination = () => {
    const itemsPerPageOptions = [10, 20, 50, 100];

    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[1]);
    const isFirstRender = useIsFirstRender();

    const { data } = useAppSelector((store) => store.dashboard);
    const { total: totalRecords } = data || {};

    const totalPages = Math.ceil((totalRecords || 0) / itemsPerPage);
    const start = (page - 1) * itemsPerPage + 1;

    // *  when the API is called total record count is undefined,
    // * causing 'end' to become NaN. To handle this, a condition was added.
    // * Now, only the last page display incorrect data when api is loading, which can be accepted
    const end = totalRecords
        ? Math.min(page * itemsPerPage, totalRecords)
        : page * itemsPerPage;

    const handleItemsPerPageChange = (value: number) => {
        setItemsPerPage(value);
        setPage(1);
    };

    const debouncedFetchQuestions = useMemo(
        () =>
            debounce(300, (currentPage, currentItemsPerPage) => {
                getAllQuestionsActionDispatcher({
                    page: currentPage,
                    limit: currentItemsPerPage,
                });
            }),
        []
    );

    useEffect(() => {
        if (isFirstRender) return;

        debouncedFetchQuestions(page, itemsPerPage);

        return () => {
            debouncedFetchQuestions.cancel();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, itemsPerPage, debouncedFetchQuestions]);

    return (
        <div className="flex justify-between items-center px-6 py-4">
            <div className="inline-flex gap-x-2">
                <ItemsPerPageDropdown
                    itemsPerPageOptions={itemsPerPageOptions}
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={handleItemsPerPageChange}
                />
            </div>
            <div className="text-sm">
                Showing {start} - {end}{' '}
                {totalRecords && `of ${totalRecords} entries`}
            </div>
            <div className="inline-flex gap-x-2 items-center">
                <Button
                    variant="outlineGray"
                    size="sm"
                    startIcon={<Icons.Images24.LeftArrowPaginationIcon />}
                    label="Prev"
                    className="shadow-2xs"
                    dontShowFocusClasses={true}
                    onClick={() => setPage((prev) => prev - 1)}
                    disabled={page <= 1}
                />
                <span className="px-2 text-sm">
                    Page {page} {totalRecords && `/ ${totalPages}`}
                </span>
                <Button
                    variant="outlineGray"
                    size="sm"
                    endIcon={<Icons.Images24.RightArrowPaginationIcon />}
                    label="Next"
                    className="shadow-2xs"
                    dontShowFocusClasses={true}
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={page >= totalPages}
                />
            </div>
        </div>
    );
};

export default Pagination;
