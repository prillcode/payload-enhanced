import React from 'react'

interface LexicalTextNode {
  type: 'text'
  text: string
  format?: number
  style?: string
}

interface LexicalParagraphNode {
  type: 'paragraph'
  children: LexicalTextNode[]
  format?: string
}

interface LexicalHeadingNode {
  type: 'heading'
  children: LexicalTextNode[]
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

interface LexicalRootNode {
  type: 'root'
  children: (LexicalParagraphNode | LexicalHeadingNode)[]
}

interface LexicalContent {
  root: LexicalRootNode
}

interface LexicalRendererProps {
  content: any
  className?: string
}

/**
 * Renders Lexical editor content with proper formatting
 */
export default function LexicalRenderer({ content, className = 'prose prose-lg max-w-none text-earth-700' }: LexicalRendererProps) {
  // Handle legacy string format
  if (typeof content === 'string') {
    return (
      <div className={className}>
        <p>{content}</p>
      </div>
    )
  }

  // Handle null/undefined
  if (!content || !content.root) {
    return null
  }

  const renderTextNode = (node: LexicalTextNode, index: number) => {
    let text = node.text

    // Handle formatting (bold, italic, etc.)
    if (node.format) {
      // Lexical format is a bitmask: 1 = bold, 2 = italic, 4 = strikethrough, 8 = underline
      if (node.format & 1) text = <strong key={`bold-${index}`}>{text}</strong>
      if (node.format & 2) text = <em key={`italic-${index}`}>{text}</em>
      if (node.format & 4) text = <s key={`strike-${index}`}>{text}</s>
      if (node.format & 8) text = <u key={`underline-${index}`}>{text}</u>
    }

    return <span key={index}>{text}</span>
  }

  const renderNode = (node: LexicalParagraphNode | LexicalHeadingNode, index: number) => {
    if (!node.children) return null

    const children = node.children.map((child, childIndex) => {
      if (child.type === 'text') {
        return renderTextNode(child, childIndex)
      }
      return null
    })

    switch (node.type) {
      case 'heading':
        const HeadingTag = node.tag
        return (
          <HeadingTag key={index} className="font-bold text-forest-800 mb-4">
            {children}
          </HeadingTag>
        )
      case 'paragraph':
        return (
          <p key={index} className="mb-4 last:mb-0">
            {children}
          </p>
        )
      default:
        return (
          <p key={index} className="mb-4 last:mb-0">
            {children}
          </p>
        )
    }
  }

  try {
    const root = content.root as LexicalRootNode
    
    if (!root.children || !Array.isArray(root.children)) {
      return null
    }

    return (
      <div className={className}>
        {root.children.map((child, index) => renderNode(child, index))}
      </div>
    )
  } catch (error) {
    console.warn('Error rendering Lexical content:', error)
    return (
      <div className={className}>
        <p>Content unavailable</p>
      </div>
    )
  }
}