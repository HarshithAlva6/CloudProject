import React, { useState } from 'react';
import Pagination from '../common/Pagination';
import Posts from '../common/Posts';
import UsersList from './usersList';

function ImagesList() {
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(50);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

    const r = require.context('../src/images/instagram_data2/img2', true);
    const currentRecords = r.keys().slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(r.keys().length / recordsPerPage);
return (
    <div>
    <UsersList />
    <Posts data = {currentRecords} nPages={nPages}
    currentPage={currentPage}
    setCurrentPage={setCurrentPage}/>
    <Pagination
    nPages={nPages}
    currentPage={currentPage}
    setCurrentPage={setCurrentPage}/>
    </div>
    );
}

export default ImagesList;