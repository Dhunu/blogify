"use client";

import { useCurrentEditor, EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import ListItem from "@tiptap/extension-list-item";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import { Markdown } from "tiptap-markdown";

import {
    FaBold,
    FaCode,
    FaHighlighter,
    FaImage,
    FaItalic,
    FaLink,
    FaListOl,
    FaListUl,
    FaParagraph,
    FaQuoteLeft,
    FaStrikethrough,
    FaSubscript,
    FaSuperscript,
    FaUnderline,
} from "react-icons/fa6";
import { LuHeading1, LuHeading2, LuHeading3 } from "react-icons/lu";
import { BiCodeBlock } from "react-icons/bi";
import { MdHorizontalRule, MdRedo, MdUndo } from "react-icons/md";
import {
    GrTextAlignLeft,
    GrTextAlignRight,
    GrTextAlignCenter,
    GrTextAlignFull,
} from "react-icons/gr";
import { useCallback, useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

const MenuBar = () => {
    const { editor } = useCurrentEditor();

    if (!editor) {
        return null;
    }

    const addImage = useCallback(() => {
        const url = window.prompt("URL");

        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    }, [editor]);

    return (
        <div className="w-full flex flex-wrap items-center justify-between lg:justify-start gap-5 border rounded-md py-2 px-5 rounded-b-none relative border-b-neutral-600 bg-black z-30">
            <button
                type="button"
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className={
                    editor.isActive("heading", { level: 1 })
                        ? "p-1 bg-neutral-700 rounded-sm"
                        : "p-1"
                }
            >
                <LuHeading1 />
            </button>
            <button
                type="button"
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className={
                    editor.isActive("heading", { level: 2 })
                        ? "p-1 bg-neutral-700 rounded-sm"
                        : "p-1"
                }
            >
                <LuHeading2 />
            </button>
            <button
                type="button"
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                className={
                    editor.isActive("heading", { level: 3 })
                        ? "p-1 bg-neutral-700 rounded-sm"
                        : "p-1"
                }
            >
                <LuHeading3 />
            </button>
            <div className="h-4 px-[0.5px] bg-white/60" />
            <button
                type="button"
                onClick={() =>
                    editor.chain().focus().setTextAlign("left").run()
                }
                className={
                    editor.isActive({ textAlign: "left" })
                        ? "p-1 bg-neutral-700 rounded-sm"
                        : "p-1"
                }
            >
                <GrTextAlignLeft />
            </button>
            <button
                type="button"
                onClick={() =>
                    editor.chain().focus().setTextAlign("center").run()
                }
                className={
                    editor.isActive({ textAlign: "center" })
                        ? "p-1 bg-neutral-700 rounded-sm"
                        : "p-1"
                }
            >
                <GrTextAlignCenter />
            </button>
            <button
                type="button"
                onClick={() =>
                    editor.chain().focus().setTextAlign("right").run()
                }
                className={
                    editor.isActive({ textAlign: "right" })
                        ? "p-1 bg-neutral-700 rounded-sm"
                        : "p-1"
                }
            >
                <GrTextAlignRight />
            </button>
            <button
                type="button"
                onClick={() =>
                    editor.chain().focus().setTextAlign("justify").run()
                }
                className={
                    editor.isActive({ textAlign: "justify" })
                        ? "p-1 bg-neutral-700 rounded-sm"
                        : "p-1"
                }
            >
                <GrTextAlignFull />
            </button>
            <div className="h-4 px-[0.5px] bg-white/60" />
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleSuperscript().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={
                    editor.isActive("superscript")
                        ? "p-1 bg-neutral-700 rounded-sm"
                        : "p-1"
                }
            >
                <FaSuperscript />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleSubscript().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={
                    editor.isActive("subscript")
                        ? "p-1 bg-neutral-700 rounded-sm"
                        : "p-1"
                }
            >
                <FaSubscript />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={
                    editor.isActive("bold")
                        ? "p-1 bg-neutral-700 rounded-sm"
                        : "p-1"
                }
            >
                <FaBold />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={
                    editor.isActive("italic")
                        ? "p-1 bg-neutral-700 rounded-sm"
                        : "p-1"
                }
            >
                <FaItalic />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                className={
                    editor.isActive("strike")
                        ? "p-1 bg-neutral-700 rounded-sm"
                        : "p-1"
                }
            >
                <FaStrikethrough />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                className={
                    editor.isActive("underline")
                        ? "p-1 bg-neutral-700 rounded-sm"
                        : "p-1"
                }
            >
                <FaUnderline />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleCode().run()}
                disabled={!editor.can().chain().focus().toggleCode().run()}
                className={
                    editor.isActive("code")
                        ? "p-1 bg-neutral-700 rounded-sm"
                        : "p-1"
                }
            >
                <FaCode />
            </button>
            <div className="h-4 px-[0.5px] bg-white/60" />

            <button
                type="button"
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={
                    editor.isActive("paragraph")
                        ? "p-1 bg-neutral-700 rounded-sm"
                        : "p-1"
                }
            >
                <FaParagraph />
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHighlight().run()}
                className={
                    editor.isActive("highlight")
                        ? "p-1 bg-neutral-700 rounded-sm"
                        : "p-1"
                }
            >
                <FaHighlighter />
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={
                    editor.isActive("bulletList")
                        ? "p-1 bg-neutral-700 rounded-sm"
                        : "p-1"
                }
            >
                <FaListUl />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={
                    editor.isActive("orderedList")
                        ? "p-1 bg-neutral-700 rounded-sm"
                        : "p-1"
                }
            >
                <FaListOl />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={
                    editor.isActive("codeBlock")
                        ? "p-1 bg-neutral-700 rounded-sm"
                        : "p-1"
                }
            >
                <BiCodeBlock />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={
                    editor.isActive("blockquote")
                        ? "p-1 bg-neutral-700 rounded-sm"
                        : "p-1"
                }
            >
                <FaQuoteLeft />
            </button>
            <button type="button" onClick={addImage}>
                <FaImage />
            </button>
            <button
                type="button"
                onClick={() =>
                    editor
                        .chain()
                        .focus()
                        .setLink({
                            href: window.prompt("URL") || "",
                        })
                }
            >
                <FaLink />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
            >
                <MdHorizontalRule />
            </button>
            <div className="h-4 px-[0.5px] bg-white/60" />
            <button
                type="button"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}
            >
                <MdUndo />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}
            >
                <MdRedo />
            </button>
        </div>
    );
};

const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure(),
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false,
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false,
        },
        codeBlock: false,
    }),
    CodeBlockLowlight.configure({
        lowlight: createLowlight(common),
    }),
    Link.configure({
        openOnClick: true,
        autolink: false,
        protocols: ["http", "https"],
        linkOnPaste: true,
        validate(url) {
            return /^(https?:\/\/)?([\w.]+)\.([a-z]{2,6}\.?)(\/[\w.]*)*\/?$/.test(
                url
            );
        },
    }),
    TextAlign.configure({
        types: ["heading", "paragraph"],
        defaultAlignment: "left",
    }),
    Subscript.configure({}),
    Superscript.configure({}),
    Highlight.configure({}),
    Underline.configure({}),
    Image.configure({
        inline: true,
    }),
    Markdown,
];

export default function BlogEditor({
    content,
    setContent,
}: {
    content: string;
    setContent: (content: string) => void;
}) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-full flex flex-col gap-1 h-32">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-[88px] w-full" />
            </div>
        );
    }
    return (
        <EditorProvider
            onUpdate={(editor) => {
                setContent(editor.editor.storage.markdown.getMarkdown());
            }}
            content={content}
            slotBefore={<MenuBar />}
            extensions={extensions}
            editorProps={{
                attributes: {
                    class: "bg-neutral-900 prose prose-invert max-w-none w-full border border-t-0 rounded-md rounded-t-none p-5 focus:outline-none  h-full min-h-20",
                },
            }}
        />
    );
}
