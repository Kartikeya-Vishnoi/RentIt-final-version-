import React from "react";
import PropTypes from "prop-types";
import "./Renter.css"; // Import the CSS file

const Renter = (props) => {
  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="renter-card">
      <div className="renter-card__image-container">
        <img
          src={props.imgurl}
          alt={props.borrower}
          className="renter-card__image"
        />
      </div>
      <div className="renter-card__details">
        <h2 className="renter-card__name">{props.borrower}</h2>
        <p className="renter-card__dates">
          <strong>Start Date:</strong> {formatDate(props.start)} <br />
          <strong>End Date:</strong> {formatDate(props.end)}
        </p>
        <p className="renter-card__rent">
          <strong>Total Rent:</strong> Rs.{props.rent}
        </p>
      </div>
    </div>
  );
};

Renter.propTypes = {
  imgurl: PropTypes.string.isRequired,
  borrower: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  rent: PropTypes.number.isRequired,
};

export default Renter;