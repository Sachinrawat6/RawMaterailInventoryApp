import React, { useEffect, useState } from "react";
import { useGlobalContext } from "./context/StockContextProvider";

const MeterAndKgRelationship = () => {
    const { fetchMeterAndKgRelationShip, meterAndKG, styleLoading } =
        useGlobalContext();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        fetchMeterAndKgRelationShip();
    }, []);

    useEffect(() => {
        if (meterAndKG) {
            const filtered = meterAndKG.filter(item =>
                item.fabric_number?.toString()?.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredData(filtered);
        }
    }, [meterAndKG, searchTerm]);

    if (styleLoading) {
        return (
            <div className="flex justify-center items-center h-64 bg-black">
                <div className="w-10 h-10 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
                <p className="ml-3 text-gray-300">Loading data...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 min-h-screen">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold  mb-2 tracking-wide">
                        Fabric Meter ↔ KG Relationship
                    </h2>
                    <p className="text-gray-400">Comprehensive fabric weight and length conversion data</p>
                </div>

                {/* Search Section */}
                <div className="mb-6  rounded-lg p-4 ">
                    <div className="flex items-center justify-between">
                        <div className="flex-1 max-w-md">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search by fabric number..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full px-4 py-3 pl-10  border outline-gray-300 border-gray-700 rounded-lg  transition-all duration-200"
                                />
                                <svg
                                    className="absolute left-3 top-3.5 w-4 h-4 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                        <div className="ml-4 bg-white text-black px-4 py-2 rounded-lg font-semibold">
                            {meterAndKG.filter(p => p.fabric_in_meter > 0)?.length}  of  {filteredData.length} {filteredData.length === 1 ? 'Result' : 'Results'}
                        </div>


                    </div>
                </div>

                {/* Table Section */}
                {filteredData.length > 0 ? (
                    <div className="bg-white rounded-lg  overflow-hidden border border-gray-300">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead className="bg-black text-white">
                                    <tr>
                                        <th className="px-6 py-4 text-left font-bold text-sm uppercase tracking-wider border-b border-gray-300">
                                            Fabric Number
                                        </th>
                                        <th className="px-6 py-4 text-left font-bold text-sm uppercase tracking-wider border-b border-gray-300">
                                            Fabric in KG
                                        </th>
                                        <th className="px-6 py-4 text-left font-bold text-sm uppercase tracking-wider border-b border-gray-300">
                                            Fabric in Meter
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData
                                        .filter(item => item.fabric_in_meter > 0)
                                        .map((item, index) => (
                                            <tr
                                                key={item._id}
                                                className={`transition-all duration-200 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                                                    }`}
                                            >
                                                <td className="px-6 py-4 font-semibold text-gray-900 border-b border-gray-300">
                                                    <span className="bg-black text-white px-2 py-1 rounded text-sm">
                                                        {item.fabric_number}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-gray-800 border-b border-gray-300">
                                                    <span className="font-medium">{item.fabric_in_KG}</span> kg
                                                </td>
                                                <td className="px-6 py-4 text-gray-800 border-b border-gray-300">
                                                    <span className="font-medium">{item.fabric_in_meter}</span> m
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="text-center bg-gray-900 rounded-lg p-12 shadow-lg border border-gray-800">
                        <svg
                            className="w-16 h-16 text-gray-600 mx-auto mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="text-xl font-semibold text-white mb-2">
                            {searchTerm ? 'No matching results found' : 'No meter ↔ KG relationship data available'}
                        </h3>
                        <p className="text-gray-400">
                            {searchTerm
                                ? `No fabric numbers matching "${searchTerm}" were found.`
                                : 'The fabric conversion data will appear here once available.'
                            }
                        </p>
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="mt-4 px-6 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
                            >
                                Clear Search
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MeterAndKgRelationship;