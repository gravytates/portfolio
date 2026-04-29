import { generateHTML } from '@tiptap/html'
import { StarterKit } from '@tiptap/starter-kit'
import { Image } from '@tiptap/extension-image'
import { Link } from '@tiptap/extension-link'
import type { JSONContent } from '@tiptap/core'

interface TiptapRendererProps {
  content: JSONContent
  className?: string
}

/**
 * Server component — renders ProseMirror JSON to HTML server-side.
 * Avoids shipping the full Tiptap bundle to the client for read-only display.
 * Content is admin-authored only, so dangerouslySetInnerHTML is safe here.
 */
export function TiptapRenderer({ content, className }: TiptapRendererProps) {
  const html = generateHTML(content, [StarterKit, Image, Link])

  return (
    <div
      className={`prose prose-zinc prose-lg max-w-none ${className ?? ''}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
