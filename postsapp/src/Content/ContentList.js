import React, { useEffect, useState } from 'react';
import AxiosList from '../common/AxiosList';
import '../App.css';

function ContentList() {
  const [content, setContent] = useState([]);
  
  useEffect(() => {
    async function fetchImg() {
        try {
            const response = await AxiosList.getImages();
            setContent(response.data);
        } catch (error) { console.error('Error fetching users:', error); }
      }
      fetchImg();
  }, []);

  return (
    <div>
      <div className="App-intro">
          <div className = "ralign"> 
            {content.map(content =>
              <div key={content.id}>
              <p><b>{content.uname}</b></p> 
              <img class = "prof" src = {content.link} />
              <p>{content.cap}</p>
              </div>
            )}
          </div>     
      </div>
    </div>
  );
}

export default ContentList;