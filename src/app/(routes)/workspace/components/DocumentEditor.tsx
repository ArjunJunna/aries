"use client";
import { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
// @ts-ignore
import Header from "@editorjs/header";
// @ts-ignore
import Quote from "@editorjs/quote";
// @ts-ignore
import CodeTool from "@editorjs/code";
// @ts-ignore
import Marker from "@editorjs/marker";
// @ts-ignore
import List from "@editorjs/list";
// @ts-ignore
import Checklist from "@editorjs/checklist";
// @ts-ignore
import Paragraph from "@editorjs/paragraph";
// @ts-ignore
import Warning from "@editorjs/warning";

import { updateFileById } from "../action";
import { toast } from "sonner";
import { File } from "@/lib/types";

const rawDocument = {
  time: 1550476186479,
  blocks: [
    {
      data: {
        text: "Document Name",
        level: 2,
      },
      id: "123",
      type: "header",
    },
    {
      data: {
        level: 4,
      },
      id: "1234",
      type: "header",
    },
  ],
  version: "2.8.1",
};

type DocumentEditorProps = {
  onTriggerSave: boolean;
  fileData: File;
};


const DocumentEditor = ({ onTriggerSave, fileData }: DocumentEditorProps) => {
  const ref = useRef<EditorJS>();

  //const [document, setDocument] = useState(rawDocument);
  useEffect(() => {
    fileData && initEditor();
  }, [fileData]);

  useEffect(() => {
    onTriggerSave && onSaveDocument();
  }, [onTriggerSave]);

  const initEditor = () => {
    const editor = new EditorJS({
      tools: {
        header: {
          class: Header,
          shortcut: "CMD+SHIFT+H",
          config: {
            placeholder: "Enter a Header",
          },
        },
        code: CodeTool,
        Marker: {
          class: Marker,
          shortcut: "CMD+SHIFT+M",
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+O",
          config: {
            quotePlaceholder: "Enter a quote",
            captionPlaceholder: "Quote's author",
          },
        },
        list: {
          class: List,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        paragraph: Paragraph,
        warning: Warning,
      },

      holder: "editorjs",
      data: fileData?.document ? JSON.parse(fileData.document) : rawDocument,
    });
    ref.current = editor;
  };

  const onSaveDocument = () => {
    if (ref.current) {
      ref.current
        .save()
        .then((outputData) => {
          console.log("Article data: ", outputData);
          updateFileById(fileData.id, {document:JSON.stringify(outputData)}).then(
            (resp) => {
              toast("Document Updated!");
            },
            (e) => {
              toast("Server Error!");
            },
          );
        })
        .catch((error) => {
          console.log("Saving failed: ", error);
        });
    }
  };
  return (
    <div>
      <div id="editorjs" className="ml-20"></div>
    </div>
  );
};

export default DocumentEditor;
