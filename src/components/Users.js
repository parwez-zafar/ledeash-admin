
import { faEye, faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { getSuggestedQuery } from '@testing-library/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'


const Users = () => {
    const [userData, setUserData] = useState();

    const getUsers = async () => {
        const jwt = localStorage.getItem('jwt');

        try {
            const respose = await axios.get('https://leadesh-whatsapp.onrender.com/api/admin/users', {
                headers: {
                    'jwt': `${jwt}`,
                    'Content-Type': 'application/json',
                }
            });

            // console.log(respose.data);
            setUserData(respose.data)
        }
        catch (err) {
            console.log("error in get user", err);
        }
    }
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };


    useEffect(() => {
        getUsers();
    }, [])
    return (
        <section>



            <table className="table table-hover table-responsive-xl table-responsive-md">
                <thead>
                    <tr>
                        <th scope="col" >Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Joined On</th>
                        <th scope="col">Package</th>
                        <th scope="col">Keywords</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        userData && userData.map((item, index) =>
                        (
                            <tr key={index} >
                                <th>{item.id}</th>
                                <th>{item.name}</th>
                                <th>{new Date(item.joinedData).toLocaleDateString('en-US', options)}</th>
                                <th> {item?.packageSelected?.name}</th>
                                <th>
                                    {
                                        item?.keywords.length !== 0 ?
                                            <div className="dropdown">
                                                <div className="dropdown-toggle" type="button" id={`drop${item.id}`} data-bs-toggle="dropdown" aria-expanded="false">
                                                    <FontAwesomeIcon icon={faEllipsisH} />
                                                    {/* show all */}
                                                    {/* <FontAwesomeIcon icon="fas fa-ellipsis-h" /> */}
                                                </div>

                                                <ul className="dropdown-menu" aria-labelledby={`drop${item.id}`}>
                                                    {
                                                        item?.keywords?.map((keyword, i) =>

                                                            <li key={i}>{keyword.value}</li>

                                                        )
                                                    }
                                                </ul>

                                            </div>


                                            :
                                            <>Keyword Not Found</>
                                    }

                                </th>
                                <th>
                                    <div data-toggle="modal" data-target={`#modal${item.id}`}>
                                        <FontAwesomeIcon className='mx-1' icon={faEye} />

                                    </div>


                                    <div class="modal fade" id={`modal${item?.id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLongTitle">User Details</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <>
                                                        <p>ID: {item.id}</p>
                                                        <p>Name: {item.name}</p>
                                                        <p>Joined On: {new Date(item.joinedData).toLocaleDateString('en-US', options)}</p>
                                                        {/* ... other user details */}
                                                    </>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </th>
                            </tr>
                        )

                        )
                    }
                </tbody >
            </table >

            <nav>
                <ul className="pagination">
                    <li className="page-item disabled">
                        <div className="page-link" to="#" >Previous</div>
                    </li>
                    <li className="page-item"><div className="page-link" to="#">1</div></li>
                    <li className="page-item active">
                        <div className="page-link" to="#">2 <span className="sr-only">(current)</span></div>
                    </li>
                    <li className="page-item"><div className="page-link" to="#">3</div></li>
                    <li className="page-item">
                        <div className="page-link" >Next</div>
                    </li>
                </ul>
            </nav>
        </section >

    )
}

export default Users