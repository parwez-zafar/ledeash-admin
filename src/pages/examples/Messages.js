import React, { useState } from 'react'
import { message } from '../../data/tables'
const Messages = () => {

    const rowsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = message.slice(indexOfFirstRow, indexOfLastRow);

    const totalPages = Math.ceil(message.length / rowsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    return (
        <section>



            <table className="table table-hover table-responsive-xl table-responsive-md">
                <thead>
                    <tr>
                        <th scope="col" >User name</th>
                        <th scope="col">Mobile</th>
                        <th scope="col">Keyword</th>
                        <th scope="col">Message</th>
                        <th scope="col">Timestamp</th>
                    </tr>
                </thead>
                <tbody>


                    {/* <tr>
                        <th>name</th>
                        <th>Mobile</th>
                        <th>keyword</th>
                        <th>messages</th>
                        <th>Timestamp</th>

                    </tr> */}
                    {
                        currentRows && currentRows.map((item, index) =>

                        (
                            <tr key={index}>
                                <th>{item.name}</th>
                                <th>{item.mobile}</th>
                                <th>{item.keyword}</th>
                                <th>{item.message}</th>
                                <th>{item.timestamp}</th>

                            </tr>
                        )
                        )

                    }
                </tbody >
            </table >

            <div style={{ cursor: 'pointer' }}>
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <div className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                            Previous
                        </div>
                    </li>
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <li
                            key={index}
                            className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                        >
                            <div className="page-link" onClick={() => handlePageChange(index + 1)}>
                                {index + 1} {currentPage === index + 1 && <span className="sr-only">(current)</span>}
                            </div>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <div className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                            Next
                        </div>
                    </li>
                </ul>
            </div>
        </section >
    )
}

export default Messages