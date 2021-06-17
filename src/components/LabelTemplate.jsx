import React from "react";
import PropTypes from "prop-types";
import Barcode from "./Barcode";

const LabelTemplate = ({ trackingNumber, fromCity, toCity }) => {
  return (
    <div className="label-wrapper">
      <div className="label">
        <Barcode value={trackingNumber} width={1.5} />
      </div>
      <div className="from">{fromCity}</div>
      <div className="to">{toCity}</div>
    </div>
  );
};

LabelTemplate.propTypes = {
  trackingNumber: PropTypes.string,
  fromCity: PropTypes.string,
  toCity: PropTypes.string,
};

export default LabelTemplate;
