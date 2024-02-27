import { useCallback, useEffect, useMemo, useState } from "react";

import ReactQuill from "react-quill";
import "quill/dist/quill.core.css";
import "react-quill/dist/quill.snow.css";

function App() {
  // const onEditorStateChange = (editorState) => {
  //   setState({
  //     editorState,
  //   });
  // };
  const [convertedText, setConvertedText] = useState("Some default content");

  // -> https://github.com/zenoamaro/react-quill
  // => https://github.com/zenoamaro/react-quill#quick-start
  return (
    <div
      style={{ width: "100vw", height: "100vh", display: "grid", placeItems: "center" }}>
      <ReactQuill
        theme="snow"
        value={convertedText}
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
            ["link", 'image', 'video'],

            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ font: [] }],
            [{ align: [] }],

            ["clean"],
          ],
        }}
        onChange={setConvertedText}
        style={{ minHeight: "300px" }}
      />
    </div>
  );
}

export default App;
