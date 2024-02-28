import { useState } from "react";

import ReactQuill, { Quill } from "react-quill";
import { ImageResize } from "quill-image-resize-module-ts";

import "quill/dist/quill.core.css";
import "react-quill/dist/quill.snow.css";
import { defaultData } from "./defaultData";

import "./App.css";

Quill.register("modules/imageResize", ImageResize as any);

function App() {
  const [convertedText, setConvertedText] = useState(defaultData);

  return (
    <div
      style={{
        width: "100vw",
        boxSizing: "border-box",
        maxHeight: "100vh",
        overflowY: "auto",
        overflowX: "hidden",
        display: "grid",
        placeItems: "center",
        padding: "1rem",
      }}>
      <ReactQuill
        theme="snow"
        value={convertedText}
        modules={{
          imageResize: {
            parchment: Quill.import("parchment"),
            modules: ["Resize", "DisplaySize", "Toolbar"],

            displayStyles: {
              backgroundColor: "black",
              border: "none",
              color: "white",
            },
          },

          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
              { list: "ordered" },
              { list: "bullet" },
              { list: "check" },
              { indent: "-1" },
              { indent: "+1" },
            ],
            ["link", "image"],

            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ font: [] }],
            [{ align: [] }],

            ["clean"],
          ],
        }}
        onChange={(e) => {
          setConvertedText(e);
          // console.log(e);
        }}
        className="text-editor"
      />

      <ReactQuill
        theme="snow"
        readOnly
        value={convertedText}
        modules={{ toolbar: [] }}
        className="text-editor text-editor-borderless"
      />
    </div>
  );
}

export default App;
