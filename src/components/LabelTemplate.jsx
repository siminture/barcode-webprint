import React from "react";
import PropTypes from "prop-types";
import Barcode from "./Barcode";

const LabelTemplate = ({
  trackingNumber,
  fromCity,
  toCity,
  toAddress,
  toContactPhone,
  toContactMan,
}) => {
  return (
    <div className="label-wrapper">
      <div className="label">
        <Barcode value={trackingNumber} width={1.5} />
      </div>
      <div className="from-to">
        <div className="from">{fromCity}</div>
        <div className="arrow">&#8594;</div>
        <div className="to">{toCity}</div>
      </div>
      <div className="address">{toAddress}</div>
      <div className="contact">
        {toContactMan} {toContactPhone}
      </div>
    </div>
  );
};

LabelTemplate.propTypes = {
  trackingNumber: PropTypes.string,
  fromCity: PropTypes.string,
  toCity: PropTypes.string,
};

export default LabelTemplate;
