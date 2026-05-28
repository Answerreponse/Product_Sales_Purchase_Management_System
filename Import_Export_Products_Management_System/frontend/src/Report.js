import React, {useEffect, useState} from "react";
import axios from "axios";

function Report(){

    const [report, setReport] = useState([]);

    useEffect(() =>{
        loadReport();
    }, []);

    const loadReport = async () =>{
        const res = await axios.get('http://localhost:3000/api/report');
        setReport(res.data);
    };

    return(
        <div className="p-6 bg-gray-100 min-h-screen">

            <div className="bg-white p-6 rounded-lg shadow">

                <h2 className="text-2xl font-bold mb-6">
                    Stock Report
                </h2>

                <table className="w-full border">

                    <thead className="bg-gray-600 text-white">
                        <tr>
                            <th className="p-3">Product</th>
                            <th className="p-3">Imported Qty</th>
                            <th className="p-3">Exported Qty</th>
                            <th className="p-3">Remaining</th>
                            <th className="p-3">Purchase Amount</th>
                            <th className="p-3">Sold Amount</th>
                            <th className="p-3">Profit/Loss</th>
                        </tr>
                    </thead>

                    <tbody>
                        {report.map((item, index) =>(

                            <tr
                            key={index}
                            className="text-center border-b hover:bg-gray-100"
                            >
                                <td className="p-3">
                                    {item.stock_name}
                                </td>

                                <td className="p-3">
                                    {item.imported_quantity}
                                </td>

                                <td className="p-3">
                                    {item.exported_quantity}
                                </td>

                                <td className="p-3">
                                    {item.remaining_stock}
                                </td>

                                <td className="p-3">
                                    {item.imported_amount}
                                </td>

                                <td className="p-3">
                                    {item.exported_amount}
                                </td>

                                <td className={`p-3 font-bold ${
                                    item.profit >= 0
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}>
                                    {item.profit}
                                </td>
                            </tr>

                        ))}
                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default Report;