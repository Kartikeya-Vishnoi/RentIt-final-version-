import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const Renters = (props) => {
    const[renters,setRenters]=useState();
    const {itemId} = useParams();
    useEffect(() => {
        const fetchRenterDetails = async () => {
          try {
            const response = await fetch(`http://localhost:5000/api/transactions/renterdetails/${itemId}`);
    
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setRenters(data.result);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchRenterDetails();
      }, []);

    console.log(renters);
    return(
        <div>
        </div>
    )
}

export default Renters