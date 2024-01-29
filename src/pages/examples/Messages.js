import React, { useEffect, useState } from 'react'
import { message } from '../../data/tables'
import { useHistory } from 'react-router-dom';
import { Routes } from '../../routes';
import axios from 'axios'




const Messages = () => {
    const history = useHistory();
    const [allMessage, setAllMessage] = useState();


    const rowsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = allMessage?.slice(indexOfFirstRow, indexOfLastRow);

    const totalPages = Math.ceil(allMessage?.length / rowsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };


    const jwt = localStorage.getItem('jwt');

    const getAllMessage = async () => {
        try {
            const response = await axios.get('https://leadesh-whatsapp.onrender.com/api/admin/allMessages', {
                headers: {
                    'jwt': `${jwt}`,
                    'Content-Type': 'application/json',
                }
            });

            // console.log(response);
            setAllMessage(response?.data?.messages)
        }
        catch (err) {
            console.log("error in getAllMessage(): ", err);
        }

    }

    useEffect(() => {
        if (!jwt) {
            history.push(Routes.Signin.path);
            return;


        }
        getAllMessage();
    }, [jwt, history])

    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };

    return (
        <section>

            <h1 className='text-center mb-1'>Messages</h1>


            <table className="table table-hover table-responsive-xl table-responsive-md">
                <thead>
                    <tr>
                        <th scope="col" >User name</th>
                        <th scope="col">Mobile</th>
                        {/* <th scope="col">Keyword</th> */}
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
                        currentRows && currentRows.length !== 0 ?
                            currentRows.map((item, index) =>

                            (
                                <tr key={index}>
                                    <th>{item.username}</th>
                                    <th>{item.userId.number}</th>
                                    {/* <th>{item.keyword}</th> */}
                                    <th>{item.conversation}</th>
                                    <th> {new Date(item.timestamp).toLocaleDateString('en-US', options)}</th>

                                </tr>
                            )
                            )

                            :
                            <>

                                <p className="text-center">No Any Message</p>
                            </>

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