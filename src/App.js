import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import LabelList from "./components/LabelList";
import Barcode from "./components/Barcode";
import ErrorBoundary from "./components/ErrorBoundary";

import "./App.css";

function createBox(qty = 5) {
  const boxes = [];

  for (let index = 1; index <= qty; index++) {
    boxes.push({
      trackingNumber: "56XYYTRACKNUMBER" + index,
      fromCity: "广州",
      toCity: "上海",
    });
  }
  return boxes;
}

var defaultValues = {
  CODE128: "Example 1234",
  CODE128A: "EXAMPLE",
  CODE128B: "Example text",
  CODE128C: "12345678",
  EAN13: "1234567890128",
  EAN8: "12345670",
  UPC: "123456789999",
  CODE39: "EXAMPLE TEXT",
  ITF14: "10012345000017",
  ITF: "123456",
  MSI: "123456",
  MSI10: "123456",
  MSI11: "123456",
  MSI1010: "123456",
  MSI1110: "123456",
  pharmacode: "1234",
};

function App() {
  const printContentRef = useRef();
  const errorBoundaryRef = useRef();

  const [format, setFormat] = React.useState("CODE128");

  const [text, setText] = React.useState(defaultValues[format]);

  const onTextChange = (event) => {
    errorBoundaryRef.current.reset();
    setText(event.target.value);
  };

  const onFormatChange = (event) => {
    errorBoundaryRef.current.reset();
    const newFormat = event.target.value;
    setFormat(newFormat);
    setText(defaultValues[newFormat]);
  };

  const [renderer, setRenderer] = React.useState("svg");
  const onRendererChange = (event) => {
    errorBoundaryRef.current.reset();
    setRenderer(event.target.value);
  };

  const [labelQty, setLabelQty] = React.useState(5);
  const onLabelQtyChange = (event) => {
    setLabelQty(event.target.value);
  };

  const [printContentVisible, setPrintContentVisible] = React.useState(true);
  const onPrintContentVisibleChange = (event) => {
    setPrintContentVisible(event.target.checked);
  };

  const printContentWrapperStyle = {
    display: printContentVisible ? "block" : "none",
    margin: "0 auto",
  };

  const boxes = createBox(labelQty);

  const onAfterPrint = () => {
    console.log("Print Labels done!");
  };

  return (
    <div className="App">
      <div style={{ display: "flex", height: "100%" }}>
        <div className="left">
          <h3>Barcode Sample</h3>
          <div className="row toolbar">
            <label>
              Renderer
              <select
                className="form-control"
                onChange={onRendererChange}
                defaultValue={renderer}
              >
                <option value="svg">svg</option>
                <option value="canvas">canvas</option>
                <option value="img">img</option>
              </select>
            </label>

            <label>
              Format
              <select
                className="form-control"
                onChange={onFormatChange}
                defaultValue={format}
              >
                <option value="CODE128">CODE128 auto</option>
                <option value="CODE128A">CODE128 A</option>
                <option value="CODE128B">CODE128 B</option>
                <option value="CODE128C">CODE128 C</option>
                <option value="EAN13">EAN13</option>
                <option value="EAN8">EAN8</option>
                <option value="UPC">UPC</option>
                <option value="CODE39">CODE39</option>
                <option value="ITF14">ITF14</option>
                <option value="ITF">ITF</option>
                <option value="MSI">MSI</option>
                <option value="MSI10">MSI10</option>
                <option value="MSI11">MSI11</option>
                <option value="MSI1010">MSI1010</option>
                <option value="MSI1110">MSI1110</option>
                <option value="pharmacode">Pharmacode</option>
              </select>
            </label>
          </div>

          <div className="row toolbar">
            <label>
              Barcode Text
              <input
                className="barcode-input form-control"
                value={text}
                onChange={onTextChange}
              />
            </label>
          </div>
          <div>
            <ErrorBoundary ref={errorBoundaryRef}>
              <Barcode
                value={text}
                renderer={renderer}
                font="Arial, Helvetica, sans-serif"
                format={format}
              />
            </ErrorBoundary>
          </div>
        </div>
        <div className="right">
          <h3>Print Labels</h3>
          <div className="toolbar">
            <label>
              Quantity
              <input
                className="form-control"
                type="number"
                step={1}
                min="1"
                max="999"
                defaultValue={labelQty}
                onChange={onLabelQtyChange}
              />
            </label>
            <ReactToPrint
              trigger={() => {
                return <button>Print labels</button>;
              }}
              content={() => printContentRef.current}
              onAfterPrint={onAfterPrint}
            />

            <label>
              <input
                type="checkbox"
                onChange={onPrintContentVisibleChange}
                defaultChecked={printContentVisible}
              />
              Show Print content
            </label>
          </div>
          <div style={printContentWrapperStyle}>
            <div ref={printContentRef}>
              <LabelList items={boxes} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
