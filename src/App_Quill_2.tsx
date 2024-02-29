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
            [{ header: [1, 2, 3, 4, 5, false] }],
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
        onChange={(e, delta, source, editor) => {
          // console.log(delta, 'dsadsa')
          setConvertedText(e);
          console.log(e);

          // console.log(e, delta, source, editor);
          // Delta da pra criar uma lib e construir algo de vrdd

          // console.log(editor.getBounds(0));
          console.log(editor.getContents());
          // console.log(editor.getHTML());
          // console.log(editor.getSelection());
        }}
        className="text-editor"
      />

      <ReactQuill
        theme="snow"
        readOnly
        // onChange={(value, delta, source, editor) => {}}
        value={convertedText}
        modules={{ toolbar: [] }}
        className="text-editor text-editor-borderless"
      />
    </div>
  );
}

export default App;
