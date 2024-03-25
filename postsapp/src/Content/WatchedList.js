import React, { useState } from 'react';
import Pagination from '../common/Pagination';
import Posts from '../common/Posts';
import ContentList from './ContentList';
import Navi from '../common/Navi';

function WatchedList() {
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(50);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

    const r = require.context('../../src/images/train', true);
    const currentRecords = r.keys().slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(r.keys().length / recordsPerPage);
    const pull_data = (data, value) => {
        console.log("Pulled!",data, "Value",value);
    }
    const page = "Watched";
return (
    <div>
    <Navi />
    <ContentList />
    <Posts data = {currentRecords} nPages={nPages}
    currentPage={currentPage}
    setCurrentPage={setCurrentPage}
    func={pull_data}
    where = {page}/>
    <Pagination
    nPages={nPages}
    currentPage={currentPage}
    setCurrentPage={setCurrentPage}/>
    </div>
    );
}

export default WatchedList;