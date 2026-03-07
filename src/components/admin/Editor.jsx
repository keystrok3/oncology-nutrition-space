import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";

// ── Toolbar button ────────────────────────────────────────────
function ToolbarButton({ onClick, active, disabled, children, title }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`px-2.5 py-1.5 rounded font-body text-sm transition-colors duration-150 ${
        active
          ? "bg-sage text-white"
          : "text-charcoal/70 hover:bg-neutral hover:text-charcoal"
      } disabled:opacity-30 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
}

// ── Main Editor ───────────────────────────────────────────────
export default function Editor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: false }),
      Link.configure({ openOnClick: false }),
      Placeholder.configure({
        placeholder: "Start writing your article here...",
      }),
    ],
    // Initialize with existing content when editing a post
    content: value ?? "",
    onUpdate: ({ editor }) => {
      // Return HTML string to parent — stored as post body
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  // ── Add image by URL ────────────────────────────────────────
  function addImage() {
    const url = window.prompt("Enter image URL:");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  }

  // ── Add/edit link ───────────────────────────────────────────
  function setLink() {
    const url = window.prompt("Enter URL:", editor.getAttributes("link").href);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().unsetLink().run();
    } else {
      editor.chain().focus().setLink({ href: url, target: "_blank" }).run();
    }
  }

  return (
    <div className="border border-neutral rounded-md overflow-hidden">

      {/* ── Toolbar ──────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-1 px-3 py-2 border-b border-neutral bg-white">

        {/* Headings */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })}
          title="Heading 2"
        >
          H2
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive("heading", { level: 3 })}
          title="Heading 3"
        >
          H3
        </ToolbarButton>

        <span className="w-px h-5 bg-neutral mx-1" />

        {/* Inline marks */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          title="Bold"
        >
          B
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          title="Italic"
        >
          I
        </ToolbarButton>

        <span className="w-px h-5 bg-neutral mx-1" />

        {/* Lists */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          title="Bullet list"
        >
          • List
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          title="Numbered list"
        >
          1. List
        </ToolbarButton>

        <span className="w-px h-5 bg-neutral mx-1" />

        {/* Blockquote */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
          title="Blockquote"
        >
          " Quote
        </ToolbarButton>

        <span className="w-px h-5 bg-neutral mx-1" />

        {/* Link */}
        <ToolbarButton
          onClick={setLink}
          active={editor.isActive("link")}
          title="Add link"
        >
          Link
        </ToolbarButton>

        {/* Image */}
        <ToolbarButton
          onClick={addImage}
          title="Add image"
        >
          Image
        </ToolbarButton>

        <span className="w-px h-5 bg-neutral mx-1" />

        {/* Undo / Redo */}
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Undo"
        >
          ↩
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Redo"
        >
          ↪
        </ToolbarButton>
      </div>

      {/* ── Editable content area ────────────────────────────── */}
      <EditorContent
        editor={editor}
        className="min-h-[400px] px-4 py-3 bg-white font-body text-sm text-charcoal
                   prose prose-sm max-w-none
                   focus:outline-none
                   [&_.ProseMirror]:outline-none
                   [&_.ProseMirror]:min-h-[380px]
                   [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]
                   [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-charcoal/30
                   [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none
                   [&_.ProseMirror_h2]:font-heading
                   [&_.ProseMirror_h2]:text-xl
                   [&_.ProseMirror_h2]:mt-6
                   [&_.ProseMirror_h2]:mb-2
                   [&_.ProseMirror_h3]:font-heading
                   [&_.ProseMirror_h3]:text-lg
                   [&_.ProseMirror_h3]:mt-4
                   [&_.ProseMirror_h3]:mb-2
                   [&_.ProseMirror_blockquote]:border-l-4
                   [&_.ProseMirror_blockquote]:border-sage
                   [&_.ProseMirror_blockquote]:pl-4
                   [&_.ProseMirror_blockquote]:italic
                   [&_.ProseMirror_blockquote]:text-charcoal/70
                   [&_.ProseMirror_ul]:list-disc
                   [&_.ProseMirror_ul]:pl-5
                   [&_.ProseMirror_ol]:list-decimal
                   [&_.ProseMirror_ol]:pl-5
                   [&_.ProseMirror_a]:text-sage
                   [&_.ProseMirror_a]:underline
                   [&_.ProseMirror_img]:rounded-md
                   [&_.ProseMirror_img]:max-w-full"
      />
    </div>
  );
}