import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo2,
  Strikethrough,
  UnderlineIcon,
  Undo2,
} from "lucide-react";
import { useEffect, useState } from "react";

const Btn = ({
  onClick,
  isActive = false,
  disabled = false,
  children,
  title,
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={`p-1.5 rounded-md text-xs transition-colors duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${isActive ? "bg-link-hover hover: font-medium shadow-xs" : "bg-transparent text-black dark:text-white hover:bg-light-main dark:hover:bg-dark-main"}`}
  >
    {children}
  </button>
);

const MenuBar = ({ editor }) => {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor.isActive("bold"),
      isItalic: ctx.editor.isActive("italic"),
      isStrike: ctx.editor.isActive("strike"),
      isUnderline: ctx.editor.isActive("underline"),
      isHighlight: ctx.editor.isActive("highlight"),
      isAlignLeft: ctx.editor.isActive({ textAlign: "left" }),
      isAlignCenter: ctx.editor.isActive({ textAlign: "center" }),
      isAlignRight: ctx.editor.isActive({ textAlign: "right" }),
      isAlignJustify: ctx.editor.isActive({ textAlign: "justify" }),
      isBulletList: ctx.editor.isActive("bulletList"),
      isOrderedList: ctx.editor.isActive("orderedList"),
      isBlockquote: ctx.editor.isActive("blockquote"),
      canUndo: ctx.editor.can().undo(),
      canRedo: ctx.editor.can().redo(),
    }),
  });

  return (
    <div className="p-2 bg-light-second dark:bg-dark-second rounded-t-lg overflow-x-auto">
      <div className="flex items-center gap-1">
        <Btn
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editorState.canUndo}
          title="Orqaga"
        >
          <Undo2 className="w-4 h-4" />
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editorState.canRedo}
          title="Oldinga"
        >
          <Redo2 className="w-4 h-4" />
        </Btn>

        <div className="w-px h-4 bg-zinc-700 mx-1"></div>

        <Btn
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editorState.isBold}
          title="Qalin (Bold)"
        >
          <Bold className="w-4 h-4" />
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editorState.isItalic}
          title="Qiya (Italic)"
        >
          <Italic className="w-4 h-4" />
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editorState.isStrike}
          title="Chizilgan (Strike)"
        >
          <Strikethrough className="w-4 h-4" />
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editorState.isUnderline}
          title="Tagiga chizilgan"
        >
          <UnderlineIcon className="w-4 h-4" />
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          isActive={editorState.isHighlight}
          title="Ajratib ko'rsatish"
        >
          <Highlighter className="w-4 h-4" />
        </Btn>

        <div className="w-px h-4 bg-zinc-700 mx-1"></div>

        <Btn
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          isActive={editorState.isAlignLeft}
          title="Chapga"
        >
          <AlignLeft className="w-4 h-4" />
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          isActive={editorState.isAlignCenter}
          title="O'rtaga"
        >
          <AlignCenter className="w-4 h-4" />
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          isActive={editorState.isAlignRight}
          title="O'ngga"
        >
          <AlignRight className="w-4 h-4" />
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          isActive={editorState.isAlignJustify}
          title="Kenglik bo'yicha"
        >
          <AlignJustify className="w-4 h-4" />
        </Btn>

        <div className="w-px h-4 bg-zinc-700 mx-1"></div>

        <Btn
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editorState.isBulletList}
          title="Nuqtali ro'yxat"
        >
          <List className="w-4 h-4" />
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editorState.isOrderedList}
          title="Raqamli ro'yxat"
        >
          <ListOrdered className="w-4 h-4" />
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editorState.isBlockquote}
          title="Iqtibos"
        >
          <Quote className="w-4 h-4" />
        </Btn>
      </div>
    </div>
  );
};

export default function TextEditor({ value = "", onChange }) {
  const [, setTick] = useState(0);
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        underline: false,
      }),
      Underline,
      Highlight.configure({
        HTMLAttributes: {
          class: "bg-amber-400/20 text-amber-300 px-1 py-0.5 rounded",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML());
      }
    },
    onTransaction: () => {
      setTick((prev) => prev + 1);
    },
    editorProps: {
      attributes: {
        class:
          "focus:outline-none min-h-[80px] p-4 text-black dark:text-white leading-relaxed " +
          "[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-2 " +
          "[&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-2 " +
          "[&_blockquote]:border-l-4 [&_blockquote]:border-gray-400 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-2",
      },
    },
  });

  useEffect(() => {
    if (editor && value && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div>
      <MenuBar editor={editor} />
      <div className="">
        <EditorContent editor={editor} className="" />
      </div>
    </div>
  );
}
