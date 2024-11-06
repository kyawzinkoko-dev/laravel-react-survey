import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
const PaginationLink = ({ meta, onPageClick }) => {
    const onClick = (ev, link) => {
        ev.preventDefault();
        if (!link.url) {
            return;
        }
        onPageClick(link);
    };
    return (
        <div>
            <div className="flex items-center justify-between border-t mt-10 shadow-md border-gray-200 bg-white px-4 py-3 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                    <a
                        onClick={(ev) => onClick(ev, meta.links[0])}
                        href="#"
                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Previous
                    </a>
                    <a
                        href="#"
                        onClick={(ev) =>
                            onClick(ev, meta.links[meta.links.length - 1])
                        }
                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Next
                    </a>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing{" "}
                            <span className="font-medium">{meta.from}</span> to{" "}
                            <span className="font-medium">{meta.to}</span> of{" "}
                            <span className="font-medium">{meta.total}</span>{" "}
                            results
                        </p>
                    </div>
                    <div>
                        {meta.total > meta.per_page && (
                            <nav
                                aria-label="Pagination"
                                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                            >
                                {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                                {meta.links?.map((link, index) => (
                                    <a
                                        onClick={(ev) => onClick(ev, link)}
                                        href="#"
                                        key={index}
                                        aria-current="page"
                                        aria-disabled={true}
                                        className={`relative z-10 inline-flex  links-center justify-center border border-gray-500  px-4 py-2 text-sm font-semibold  focus:z-20
                                    ${index === 0 && "rounded-l-md"}
                                    ${
                                        index === meta.links.length - 1 &&
                                        "rounded-r-md"
                                    }
                                    ${
                                        link.active
                                            ? "bg-indigo-600  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-white"
                                            : "text-grays-500 hover:text-gray-700  bg-gray-50 "
                                    }`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    ></a>
                                ))}
                            </nav>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaginationLink;
