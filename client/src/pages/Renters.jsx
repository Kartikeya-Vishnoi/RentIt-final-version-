import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Renter from "../components/Renter";
import Header from "../components/header/Header";
import "./Renters.css"

const Renters = (props) => {
    const [renters, setRenters] = useState(null);
    const { itemId } = useParams();

    useEffect(() => {
        const fetchRenterDetails = async () => {
            try {
                const response = await fetch(`http://18.61.27.179:5000/api/transactions/renterdetails/${itemId}`);

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

    return (
        <div>
            <Header />
            <div className="renters-container" style={{ backgroundColor: "#134e4a" }}>
                {renters != null ? (
                    renters.map((renter, index) => (
                        <Renter
                            key={index}
                            borrower={renter.username}
                            imgurl={renter.userImageURL}
                            start={renter.startDate}
                            end={renter.endDate}
                            rent={renter.totalPrice}
                        />
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}

export default Renters;
