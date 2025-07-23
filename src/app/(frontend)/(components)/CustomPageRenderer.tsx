import React, { JSX } from 'react'

interface CustomPageRendererProps {
  content: any
  className?: string
}

export default function CustomPageRenderer({ content, className = '' }: CustomPageRendererProps) {
  if (!content) return null

  const renderContent = (content: any) => {
    // Handle string content (fallback)
    if (typeof content === 'string') {
      return <p className="mb-4">{content}</p>
    }

    // Handle Lexical editor content
    if (content.root && content.root.children) {
      return content.root.children.map((node: any, index: number) => {
        switch (node.type) {
          case 'paragraph':
            return (
              <p key={index} className="mb-4 leading-relaxed">
                {node.children?.map((child: any, childIndex: number) => {
                  if (child.type === 'text') {
                    let element: React.ReactNode = child.text

                    // Apply formatting
                    if (child.format) {
                      if (child.format & 1) element = <strong key={childIndex}>{element}</strong>
                      if (child.format & 2) element = <em key={childIndex}>{element}</em>
                      if (child.format & 8) element = <u key={childIndex}>{element}</u>
                    }

                    return element
                  }
                  return child.text || ''
                })}
              </p>
            )

          case 'heading':
            const HeadingTag = `h${node.tag || 2}` as keyof JSX.IntrinsicElements
            const headingClasses = {
              h1: 'text-4xl font-bold text-forest-800 mb-6',
              h2: 'text-3xl font-bold text-forest-800 mb-5',
              h3: 'text-2xl font-semibold text-forest-700 mb-4',
              h4: 'text-xl font-semibold text-forest-700 mb-3',
              h5: 'text-lg font-medium text-forest-700 mb-2',
              h6: 'text-base font-medium text-forest-700 mb-2',
            }

            return (
              <HeadingTag
                key={index}
                className={
                  headingClasses[HeadingTag as keyof typeof headingClasses] || headingClasses.h2
                }
              >
                {node.children?.map((child: any) => child.text).join('')}
              </HeadingTag>
            )

          case 'list':
            const ListTag = node.listType === 'number' ? 'ol' : 'ul'
            const listClasses =
              node.listType === 'number'
                ? 'list-decimal list-inside mb-4 space-y-2'
                : 'list-disc list-inside mb-4 space-y-2'

            return (
              <ListTag key={index} className={listClasses}>
                {node.children?.map((listItem: any, itemIndex: number) => (
                  <li key={itemIndex} className="text-earth-700">
                    {listItem.children?.map((child: any) => child.text).join('')}
                  </li>
                ))}
              </ListTag>
            )

          case 'quote':
            return (
              <blockquote
                key={index}
                className="border-l-4 border-forest-300 pl-6 italic text-earth-600 mb-6"
              >
                {node.children?.map((child: any) => child.text).join('')}
              </blockquote>
            )

          default:
            return (
              <div key={index} className="mb-4">
                {node.children?.map((child: any) => child.text).join('')}
              </div>
            )
        }
      })
    }

    return <p className="mb-4 text-earth-500">Content format not recognized</p>
  }

  return (
    <div className={`prose prose-lg max-w-none text-earth-700 ${className}`}>
      {renderContent(content)}
    </div>
  )
}
