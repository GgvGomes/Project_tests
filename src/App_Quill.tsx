import { useEffect, useRef, useState } from "react";

import ReactQuill, { Quill } from "react-quill";
import { ImageResize } from "quill-image-resize-module-ts";

import "quill/dist/quill.core.css";
import "react-quill/dist/quill.snow.css";
import { defaultData } from "./defaultData";

import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

import { PDFViewer } from "@react-pdf/renderer";

import "./App.css";
import Invoice from "./Invoice";

Quill.register("modules/imageResize", ImageResize as any);

function App() {
  const [convertedText, setConvertedText] = useState(defaultData);
  const divRef = useRef<ReactQuill>(null);
  const [pdf, setPdf] = useState("");

  // const doc = new jsPDF();

  // useEffect(() => {
  const handleClick = () => {
    const input: HTMLElement | null = document.getElementById("myPage");
    // console.log(divRef.current);
    if (input)
      html2canvas(input, { scale: 1.5 })
        .then((canvas: HTMLCanvasElement) => {
          // ======================================================
          // const imgData = canvas.toDataURL("image/png");
          // const pdf = new jsPDF();

          // console.log(divRef.current?.clientHeight, divRef.current?.clientWidth);

          // // pdf.output("dataurlnewwindow", { filename: "download.pdf" });
          // window.open(pdf.output("bloburl"));
          // pdf.save("download.pdf");

          // ======================================================
          const imgData = canvas.toBlob(
            (blob) => {
              if (blob) {
                // blob to base64 string
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () => {
                  const base64String = reader.result as string;

                  // const pdf = new jsPDF();
                  // pdf.addImage(base64String, "JPEG", 0, 0, 100, 100);
                  // // pdf.output("dataurlnewwindow", { filename: "download.pdf" });
                  // window.open(pdf.output("bloburl"));
                  // pdf.save("download.pdf");

                  setPdf(base64String);
                };
              }
            },
            "image/jpeg",
            1
          );

          // console.log("abu");
        })
        .catch((e) => console.log(e));
  };
  // }, [input]);

  return (
    <>
      <div
        style={{
          width: "100vw",
          minHeight: "100vh",
          maxHeight: "100vh",
          boxSizing: "border-box",
          overflowY: "auto",
          overflowX: "hidden",
          display: "grid",
          placeItems: "center",
          padding: "1rem",
        }}>
        {/* <p>asdasdsa</p> */}
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
          // ref={divRef}
          // ref={}
          id="myPage"
          theme="snow"
          readOnly
          value={convertedText}
          modules={{ toolbar: [] }}
          className="text-editor text-editor-borderless"
        />
      </div>

      {pdf != "" && (
        <PDFViewer style={{ width: "100vw", height: "100vh" }}>
          <Invoice src={pdf} />
        </PDFViewer>
      )}

      <button style={{ position: "absolute", left: 80, top: 80 }} onClick={handleClick}>
        click
      </button>
    </>
  );
}

export default App;
