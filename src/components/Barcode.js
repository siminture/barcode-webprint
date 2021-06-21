import React from "react";
import PropTypes from "prop-types";
import JsBarcode from "jsbarcode";

function Barcode({ renderer: Renderer, value, ...options }) {
  const rendererRef = React.useRef();

  React.useEffect(() => {
    value && JsBarcode(rendererRef.current, value, options);
  }, [value, options]);

  if (value) return <Renderer ref={rendererRef} />;

  return null;
}

Barcode.propTypes = {
  renderer: PropTypes.oneOf(["svg", "canvas", "img"]),
  value: PropTypes.string,
  format: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  displayValue: PropTypes.bool,
  fontOptions: PropTypes.string,
  font: PropTypes.string,
  textAlign: PropTypes.string,
  textPosition: PropTypes.string,
  textMargin: PropTypes.number,
  fontSize: PropTypes.number,
  background: PropTypes.string,
  lineColor: PropTypes.string,
  margin: PropTypes.number,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
};

Barcode.defaultProps = {
  renderer: "svg",
  font: "sans-serif, Arial, Helvetica",
};

// function WrappedBarcode(props) {
//   return (
//     <ErrorBoundary>
//       <Barcode {...props} />
//     </ErrorBoundary>
//   );
// }

export default Barcode;
