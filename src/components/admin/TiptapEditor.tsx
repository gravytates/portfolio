'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { Image } from '@tiptap/extension-image'
import { Link } from '@tiptap/extension-link'
import { Placeholder } from '@tiptap/extension-placeholder'
import { forwardRef, useImperativeHandle } from 'react'
import type { JSONContent } from '@tiptap/core'

export interface TiptapEditorHandle {
  getJSON: () => JSONContent
  isEmpty: () => boolean
}

interface TiptapEditorProps {
  initialContent?: JSONContent
  placeholder?: string
}

export const TiptapEditor = forwardRef<TiptapEditorHandle, TiptapEditorProps>(
  function TiptapEditor({ initialContent, placeholder = 'Start writing…' }, ref) {
    const editor = useEditor({
      extensions: [
        StarterKit,
        Image,
        Link.configure({ openOnClick: false }),
        Placeholder.configure({ placeholder }),
      ],
      ...(initialContent !== undefined ? { content: initialContent } : {}),
      immediatelyRender: false,
      editorProps: {
        attributes: {
          class: 'prose prose-sm max-w-none focus:outline-none min-h-[200px] px-4 py-3',
        },
      },
    })

    useImperativeHandle(ref, () => ({
      getJSON: () => editor?.getJSON() ?? { type: 'doc', content: [] },
      isEmpty: () => editor?.isEmpty ?? true,
    }))

    return (
      <div className="border border-zinc-200 rounded-lg overflow-hidden bg-white focus-within:ring-2 focus-within:ring-brand-blue/40 focus-within:border-brand-blue">
        {/* Toolbar */}
        <div className="flex gap-1 px-2 py-1.5 border-b border-zinc-100 bg-zinc-50">
          {[
            { label: 'B', title: 'Bold', action: () => editor?.chain().focus().toggleBold().run(), isActive: editor?.isActive('bold') },
            { label: 'I', title: 'Italic', action: () => editor?.chain().focus().toggleItalic().run(), isActive: editor?.isActive('italic') },
            { label: 'H2', title: 'Heading 2', action: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(), isActive: editor?.isActive('heading', { level: 2 }) },
            { label: 'H3', title: 'Heading 3', action: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(), isActive: editor?.isActive('heading', { level: 3 }) },
            { label: '¶', title: 'Paragraph', action: () => editor?.chain().focus().setParagraph().run(), isActive: editor?.isActive('paragraph') },
            { label: '"', title: 'Blockquote', action: () => editor?.chain().focus().toggleBlockquote().run(), isActive: editor?.isActive('blockquote') },
            { label: '—', title: 'Horizontal rule', action: () => editor?.chain().focus().setHorizontalRule().run(), isActive: false },
          ].map(({ label, title, action, isActive }) => (
            <button
              key={title}
              type="button"
              title={title}
              onClick={action}
              className={`
                px-2 py-1 rounded text-xs font-mono transition-colors
                ${isActive
                  ? 'bg-brand-blue text-white'
                  : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-200'
                }
              `}
            >
              {label}
            </button>
          ))}
        </div>
        <EditorContent editor={editor} />
      </div>
    )
  },
)
