"use client";

import { type Editor } from "@tiptap/react";

import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Underline,
  Quote,
  Undo,
  Redo,
  Code,
} from "lucide-react";
import { Toggle } from "./toggle";

interface ToolbarProps {
  editor: Editor | null;
}

export const Toolbar = ({ editor }: ToolbarProps) => {
  if (!editor) return null;
  return (
    <div className="border border-input bg-transparent rounded-sm">
      <Toggle
        size="sm"
        onPressedChange={() => {
          editor?.chain().focus().toggleBold().run();
        }}
        pressed={editor?.isActive("bold")}
      >
        <Bold className="w-4 h-4" />
      </Toggle>
      <Toggle
        size="sm"
        onPressedChange={() => {
          editor?.chain().focus().toggleItalic().run();
        }}
        pressed={editor?.isActive("italic")}
      >
        <Italic className="w-4 h-4" />
      </Toggle>
      <Toggle
        size="sm"
        onPressedChange={() => {
          editor?.chain().focus().toggleUnderline().run();
        }}
        pressed={editor?.isActive("underline")}
      >
        <Underline className="w-4 h-4" />
      </Toggle>
      <Toggle
        size="sm"
        onPressedChange={() => {
          editor?.chain().focus().toggleStrike().run();
        }}
        pressed={editor?.isActive("strike")}
      >
        <Strikethrough className="w-4 h-4" />
      </Toggle>
      <Toggle
        size="sm"
        onPressedChange={() => {
          editor?.chain().focus().toggleHeading({ level: 2 }).run();
        }}
        pressed={editor?.isActive("heading")}
      >
        <Heading2 className="w-4 h-4" />
      </Toggle>
      <Toggle
        size="sm"
        onPressedChange={() => {
          editor?.chain().focus().toggleBulletList().run();
        }}
        pressed={editor?.isActive("bulletList")}
      >
        <List className="w-4 h-4" />
      </Toggle>
      <Toggle
        size="sm"
        onPressedChange={() => {
          editor?.chain().focus().toggleOrderedList().run();
        }}
        pressed={editor?.isActive("orderedList")}
      >
        <ListOrdered className="w-4 h-4" />
      </Toggle>
      <Toggle
        size="sm"
        onPressedChange={() => {
          editor?.chain().focus().toggleBlockquote().run();
        }}
        pressed={editor?.isActive("blockquote")}
      >
        <Quote className="w-4 h-4" />
      </Toggle>
      <Toggle
        size="sm"
        onPressedChange={() => {
          editor?.chain().focus().toggleCode().run();
        }}
        pressed={editor?.isActive("code")}
      >
        <Code className="w-4 h-4" />
      </Toggle>
      <Toggle
        size="sm"
        onPressedChange={() => {
          editor?.chain().focus().undo().run();
        }}
        pressed={editor?.isActive("undo")}
      >
        <Undo className="w-4 h-4" />
      </Toggle>
      <Toggle
        size="sm"
        onPressedChange={() => {
          editor?.chain().focus().redo().run();
        }}
        pressed={editor?.isActive("redo")}
      >
        <Redo className="w-4 h-4" />
      </Toggle>
    </div>
  );
};
