import React from "react";
import PropTypes from "prop-types";
import LabelTemplate from "./LabelTemplate";

function LabelList({ items }) {
  return items.map((box) => (
    <LabelTemplate {...box} key={box.trackingNumber} />
  ));
}

LabelList.defaultProps = {
  items: [],
};
LabelList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(LabelTemplate.propTypes)),
};

export default LabelList;
