"use client";
import dynamic from "next/dynamic";
import ReactQuill, { Quill } from "react-quill";
// @ts-ignore
import quillEmoji from "react-quill-emoji"
import { useMemo } from "react";

import "react-quill-emoji/dist/quill-emoji.css";
import "react-quill/dist/quill.snow.css";
const modules = {
  toolbar: {
    container: [["bold", "italic"], ["emoji"]]
  },
  "emoji-toolbar": true,
  "emoji-textarea": true,
  "emoji-shortname": true
};


interface EditorProps {
  onChange: (value: string) => void;
  value: string;
};

export const Editor = ({
  onChange,
  value,
}:EditorProps) => {


  Quill.register(
    {
      "formats/emoji": quillEmoji.EmojiBlot,
      "modules/emoji-toolbar": quillEmoji.ToolbarEmoji,
      "modules/emoji-textarea": quillEmoji.TextAreaEmoji,
      "modules/emoji-shortname": quillEmoji.ShortNameEmoji
    },
    true
  );

  return (
    <div className="">
      <ReactQuill
      modules={{
        toolbar: {
          container: [
            [
              { header: "1" },
              { header: "2" },
              { header: [3, 4, 5, 6] },
              { font: [] }
            ],
            [{ color: [] }, { background: [] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            
          ]
        },
        "emoji-toolbar": true,
        "emoji-textarea": true,
        "emoji-shortname": true
      }}
      theme="snow"
      value={value}
      onChange={onChange}
    />
    </div>
  );
};

export default Editor