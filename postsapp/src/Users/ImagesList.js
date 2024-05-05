import React, { useState, useEffect } from 'react';
import Pagination from '../common/Pagination';
import Block from '../common/Block';
import Navi from '../common/Navi';
import { fetchData } from '../login/fetch';

function ImagesList() {
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(50);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const [content, setContent] = useState([]);
    const email = localStorage.getItem("email");

    const pull_data = (data, value) => {
        console.log("Pulled!",data, "Value",value);
        currentRecords = currentRecords.filter(curRec => curRec.display);
        setContent(currentRecords);
        nPages = Math.ceil(currentRecords.length / recordsPerPage);
    }
    async function fetchImg() {
        try {
            fetchData('LikeImages',(err, items) => {
                var res = [];
                items.find(item => {
                  if(item.email === email) res.push(item);
                  })
                  setContent(res);
              })
        } catch (error) { console.error('Error fetching Liked Images:', error); }
      }
    useEffect(() => {
        fetchImg();
    }, []);
    var currentRecords = content.slice(indexOfFirstRecord, indexOfLastRecord);
    var nPages = Math.ceil(content.length / recordsPerPage);
    currentRecords = currentRecords.filter(curRec => curRec.display);
    const page = "LikeImages";

return (
    <div>
    <Navi />
    <Block data = {currentRecords} nPages={nPages}
    currentPage={currentPage}
    setCurrentPage={setCurrentPage}
    func={pull_data} where = {page}/>
    <Pagination
    nPages={nPages}
    currentPage={currentPage}
    setCurrentPage={setCurrentPage}/>
    </div>
    );
}

export default ImagesList;