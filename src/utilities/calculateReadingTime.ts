/**
 * Calculate reading time from rich text content
 * Based on average reading speed of 200 words per minute
 */

interface RichTextNode {
  type?: string;
  text?: string;
  children?: RichTextNode[];
}

interface LexicalRoot {
  root?: {
    children?: RichTextNode[];
  };
}

const extractTextFromRichText = (content: RichTextNode[]): string => {
  let text = '';

  const traverse = (nodes: RichTextNode[]): void => {
    for (const node of nodes) {
      if (typeof node.text === 'string') {
        text += node.text + ' ';
      }
      if (Array.isArray(node.children)) {
        traverse(node.children);
      }
    }
  };

  traverse(content);
  return text.trim();
};

const isLexicalContent = (content: unknown): content is LexicalRoot => {
  return (
    typeof content === 'object' &&
    content !== null &&
    'root' in content &&
    typeof (content as LexicalRoot).root === 'object' &&
    (content as LexicalRoot).root !== null &&
    Array.isArray((content as LexicalRoot).root?.children)
  );
};

const isRichTextArray = (content: unknown): content is RichTextNode[] => {
  return Array.isArray(content) && content.every(item =>
    typeof item === 'object' && item !== null
  );
};

export const calculateReadingTime = (content: unknown): string => {
  try {
    let textContent = '';

    if (isRichTextArray(content)) {
      textContent = extractTextFromRichText(content);
    } else if (isLexicalContent(content) && content.root?.children) {
      textContent = extractTextFromRichText(content.root.children);
    } else if (typeof content === 'string') {
      textContent = content;
    }

    if (!textContent) return '1 min read';

    // Count words (split by whitespace and filter empty strings)
    const wordCount = textContent
      .split(/\s+/)
      .filter(word => word.length > 0).length;

    // Calculate reading time (200 words per minute)
    const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

    return `${readingTimeMinutes} min read`;
  } catch (error) {
    console.warn('Error calculating reading time:', error);
    return '1 min read';
  }
};