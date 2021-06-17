import React, { useRef } from "react";
import ReactToPrint from "react-to-print";

import "./App.css";
import LabelList from "./components/LabelList";
import Barcode from "./components/Barcode";

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

function App() {
  const printContentRef = useRef();
  const [text, setText] = React.useState("ThePackage1");

  const onTextChange = (event) => {
    setText(event.target.value);
  };

  const [renderer, setRenderer] = React.useState("svg");
  const onRendererChange = (event) => {
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

          <div className="toolbar">
            <select
              className="renderer-select"
              onChange={onRendererChange}
              defaultValue={renderer}
            >
              <option value="svg">svg</option>
              <option value="canvas">canvas</option>
              <option value="img">img</option>
            </select>
            <input
              className="barcode-input"
              defaultValue={text}
              onChange={onTextChange}
            />
          </div>

          <div style={{ textAlign: "center" }}>
            <Barcode value={text} renderer={renderer} font="Arial, Helvetica, sans-serif" />
          </div>
        </div>
        <div className="right">
          <h3>Print Labels</h3>
          <div className="toolbar">
            <input
              className="label-quantity"
              type="number"
              step={1}
              min="1"
              max="999"
              defaultValue={labelQty}
              onChange={onLabelQtyChange}
            />
            <ReactToPrint
              trigger={() => {
                return <button>Print labels</button>;
              }}
              content={() => printContentRef.current}
              onAfterPrint={onAfterPrint}
            />
            <input
              type="checkbox"
              id="showPrintContentVisible"
              name="showPrintContentVisible"
              onChange={onPrintContentVisibleChange}
              defaultChecked={printContentVisible}
            />
            <label htmlFor="showPrintContentVisible"> Show Print content</label>
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
