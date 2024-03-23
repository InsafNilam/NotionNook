import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import React from "react";
import { Toolbar } from "./toolbar";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";

const TipTap = ({
  onChange,
  description,
}: {
  description: string;
  onChange: (content: string) => void;
}) => {
  const handleChange = (content: string) => {
    onChange(content);
  };
  const editor = useEditor({
    extensions: [
      Heading.configure({
        HTMLAttributes: { class: "text-xl font-bold", levels: [2] },
      }),
      StarterKit,
      Underline,
      BulletList,
      OrderedList,
      ListItem,
    ],
    content: description,
    editorProps: {
      attributes: {
        class:
          "flex flex-col px-2 py-2 justify-start border border-input min-h-[150px] rounded-sm break-all whitespace-pre-line",
      },
    },
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
  });
  return (
    <div className="w-full space-y-2">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TipTap;
