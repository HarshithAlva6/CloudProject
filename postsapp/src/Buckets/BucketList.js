import React, { useEffect, useState } from 'react';
import AxiosList from '../common/AxiosList';
import '../App.css';
import Navi from '../common/Navi';
import Posts from '../common/Posts';
import Pagination from '../common/Pagination';
import { fetchData } from '../login/fetch';

export default function BucketList() {
  const [content, setContent] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(50);
  const [id, setId] = useState([]);
  const [likeId, setLikeId] = useState([]);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const email = localStorage.getItem("email");

  async function fetchBucket() {
    try {
        const response = await AxiosList.getBuckets();
        setContent(response.data);
    } catch (error) { console.error('Error fetching users:', error); }
  }
  useEffect(() => {
      fetchBucket();
  }, []);
  async function fetchImg() {
    try {
      fetchData('UserImage',(err, items) => {
        var res = [];
        items.find(item => {
          if(item.email === email) res.push(item);
          })
          setId(res);
      })
    } catch (error) { console.error('Error fetching users:', error); }
  }
  async function fetchLikedImg() {
    try {
      fetchData('LikeImages',(err, items) => {
        var res = [];
        items.find(item => {
          if(item.email === email) res.push(item);
          })
          setLikeId(res);
      })
    } catch (error) { console.error('Error fetching users:', error); }
  }
useEffect(() => {
    fetchImg();
    fetchLikedImg();
}, []);
  const currentRecords = content.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(content.length / recordsPerPage);
  const pull_data = (data, value) => {
    console.log("Pulled!",data, "Value",value);
  }
  const page = "Watched";
  return (
    <div>
      <Navi />
      <Posts data = {currentRecords} nPages={nPages}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      func={pull_data}
      where = {page} id = {id} likeId = {likeId} />
      <Pagination
      nPages={nPages}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}/>
    </div>
  );
}