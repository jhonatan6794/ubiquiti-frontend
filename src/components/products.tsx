import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import '../styles/products-interface.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';


// Define the type for the fetched data
interface Device {
  id: string;
  icon: string;  
  line: { name: string }; 
  // name: string;
  sysid: string;
  product: { name: string };
}

const Products: React.FC = () => {
  // Step 2: Create state variable to store product data
  const [products, setProducts] = useState<Device[]>([]); // Specify the type as Device[]
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 30;
  const [deviceCount, setDeviceCount] = useState<number>(0);

  // Step 1: Fetch product data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://static.ui.com/fingerprint/ui/public.json');
        const data = await response.json();
        setProducts(data.devices as Device[]); 

        
        setDeviceCount(data.devices.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Calculate the indexes for products to display on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Function to handle page changes
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
 
  return (
    <div>
      <Navbar />
      <div className="products-container">
        <div className="head-products-container">
        
          <div className="search-bar">
            <div className="search-icon">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
            </div>
            <input type="text" placeholder="Search" />
           
          </div> 
          <div className='numbers-u'>{deviceCount} Devices</div>
          <div className="view-options">
            <a href="#">
              <img src={require('../img/list.png')} alt="List Products" className="list-button" />
            </a>
            <a href="#">
              <img src={require('../img/pictures.png')} alt="List Products" className="grid-button" />
            </a>
            <span>Filter</span>
          </div>
        </div>

        {/* Step 3: Render product list */}
        <div>
           <br />
              {/* <ul>
                  {currentProducts.map((devices) => (
                    <li key={devices.id}>
                      <span>{devices.line.name}</span>
                      <span>{devices.product.name}</span>
                    </li>
                  ))}
              </ul> */}

        </div>




        <div className="table-responsive">
      <table className="table custom-table">
        <thead>
          <tr>
             <th></th>
            <th>Product Line</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
        {currentProducts.map((devices) => (
          
            <tr key={devices.id}>
              <td className='img-product'><img src="https://placehold.co/36x36.png" alt="Products" /></td>
              <td>{devices.line.name}</td>
              <td>{devices.product.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

        {/* Pagination */}



       



        <div className="pagination center-pagination">
          {Array.from({ length: Math.ceil(products.length / productsPerPage) }).map((_, index) => (
            <button className="page-link" key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
