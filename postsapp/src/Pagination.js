import React from "react";

const Pagination = (props) => {
    console.log(props);
    const goToNextPage = () => {
        if(props.currentPage !== props.nPages) 
            props.setCurrentPage(props.currentPage + 1);
      }
      const goToPrevPage = () => {
        if(props.currentPage !== 1) 
            props.setCurrentPage(props.currentPage - 1);
      }
    const pageNumbers = [...Array(props.nPages + 1).keys()].slice(1);
    return(<nav>
        <ul className='pagination justify-content-center'>
            <li className="page-item">
                <a className="page-link" 
                    onClick={goToPrevPage} 
                    href='#'>                 
                    Previous
                </a>
            </li>
            {pageNumbers.map(pgNumber => (
                <li key={pgNumber} 
                    className= {`page-item ${props.currentPage == pgNumber ? 'active' : ''} `} >

                    <a onClick={() => props.setCurrentPage(pgNumber)}  
                        className='page-link' 
                        href='#'>
                        
                        {pgNumber}
                    </a>
                </li>
            ))}
            <li className="page-item">
                <a className="page-link" 
                    onClick={goToNextPage}
                    href='#'>
                    
                    Next
                </a>
            </li>
        </ul>
    </nav>
    );
}
export default Pagination;