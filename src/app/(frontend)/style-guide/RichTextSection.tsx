"use client";

import RichText from '@/components/RichText';
import type { DefaultTypedEditorState, SerializedTextNode } from '@payloadcms/richtext-lexical';

export function RichTextSection() {
  // Sample Lexical editor state with all heading levels and content types
  const sampleContent: DefaultTypedEditorState = {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      children: [
        {
          type: 'heading',
          tag: 'h1',
          version: 1,
          format: '',
          indent: 0,
          direction: null,
          children: [
            {
              type: 'text',
              version: 1,
              text: 'Heading 1 in Rich Text',
              format: 0,
              mode: 'normal',
              style: '',
              detail: 0,
            },
          ],
        },
        {
          type: 'paragraph',
          version: 1,
          format: '',
          indent: 0,
          direction: null,
          textFormat: 0,
          children: [
            {
              type: 'text',
              version: 1,
              text: 'This is how a paragraph renders inside rich text content. It uses the prose styling with proper line height, spacing, and color hierarchy.',
              format: 0,
              mode: 'normal',
              style: '',
              detail: 0,
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h2',
          version: 1,
          format: '',
          indent: 0,
          direction: null,
          children: [
            {
              type: 'text',
              version: 1,
              text: 'Heading 2 in Rich Text',
              format: 0,
              mode: 'normal',
              style: '',
              detail: 0,
            },
          ],
        },
        {
          type: 'paragraph',
          version: 1,
          format: '',
          indent: 0,
          direction: null,
          textFormat: 0,
          children: [
            {
              type: 'text',
              version: 1,
              text: 'H2 is commonly used for main section headings in blog posts and page content. It uses ',
              format: 0,
              mode: 'normal',
              style: '',
              detail: 0,
            },
            {
              type: 'text',
              version: 1,
              text: 'text-display-md',
              format: 1, // bold
              mode: 'normal',
              style: '',
              detail: 0,
            },
            {
              type: 'text',
              version: 1,
              text: ' (2.25rem / 36px) from the unified CSS variable system.',
              format: 0,
              mode: 'normal',
              style: '',
              detail: 0,
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h3',
          version: 1,
          format: '',
          indent: 0,
          direction: null,
          children: [
            {
              type: 'text',
              version: 1,
              text: 'Heading 3 in Rich Text',
              format: 0,
              mode: 'normal',
              style: '',
              detail: 0,
            },
          ],
        },
        {
          type: 'paragraph',
          version: 1,
          format: '',
          indent: 0,
          direction: null,
          textFormat: 0,
          children: [
            {
              type: 'text',
              version: 1,
              text: 'H3 headings use ',
              format: 0,
              mode: 'normal',
              style: '',
              detail: 0,
            },
            {
              type: 'text',
              version: 1,
              text: 'text-display-sm',
              format: 1,
              mode: 'normal',
              style: '',
              detail: 0,
            },
            {
              type: 'text',
              version: 1,
              text: ' (1.875rem / 30px) for subsection titles.',
              format: 0,
              mode: 'normal',
              style: '',
              detail: 0,
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h4',
          version: 1,
          format: '',
          indent: 0,
          direction: null,
          children: [
            {
              type: 'text',
              version: 1,
              text: 'Heading 4 in Rich Text',
              format: 0,
              mode: 'normal',
              style: '',
              detail: 0,
            },
          ],
        },
        {
          type: 'paragraph',
          version: 1,
          format: '',
          indent: 0,
          direction: null,
          textFormat: 0,
          children: [
            {
              type: 'text',
              version: 1,
              text: 'H4 uses ',
              format: 0,
              mode: 'normal',
              style: '',
              detail: 0,
            },
            {
              type: 'text',
              version: 1,
              text: 'text-xl',
              format: 1,
              mode: 'normal',
              style: '',
              detail: 0,
            },
            {
              type: 'text',
              version: 1,
              text: ' (1.25rem / 20px) - note this is different from text-display-xs.',
              format: 0,
              mode: 'normal',
              style: '',
              detail: 0,
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h5',
          version: 1,
          format: '',
          indent: 0,
          direction: null,
          children: [
            {
              type: 'text',
              version: 1,
              text: 'Heading 5 in Rich Text',
              format: 0,
              mode: 'normal',
              style: '',
              detail: 0,
            },
          ],
        },
        {
          type: 'paragraph',
          version: 1,
          format: '',
          indent: 0,
          direction: null,
          textFormat: 0,
          children: [
            {
              type: 'text',
              version: 1,
              text: 'H5 and H6 both use ',
              format: 0,
              mode: 'normal',
              style: '',
              detail: 0,
            },
            {
              type: 'text',
              version: 1,
              text: 'text-lg',
              format: 1,
              mode: 'normal',
              style: '',
              detail: 0,
            },
            {
              type: 'text',
              version: 1,
              text: ' (1.125rem / 18px) for minor headings.',
              format: 0,
              mode: 'normal',
              style: '',
              detail: 0,
            },
          ],
        },
        {
          type: 'heading',
          tag: 'h6',
          version: 1,
          format: '',
          indent: 0,
          direction: null,
          children: [
            {
              type: 'text',
              version: 1,
              text: 'Heading 6 in Rich Text',
              format: 0,
              mode: 'normal',
              style: '',
              detail: 0,
            },
          ],
        },
        {
          type: 'paragraph',
          version: 1,
          format: '',
          indent: 0,
          direction: null,
          textFormat: 0,
          children: [
            {
              type: 'text',
              version: 1,
              text: 'This is the smallest heading level, same size as H5.',
              format: 0,
              mode: 'normal',
              style: '',
              detail: 0,
            },
          ],
        },
        {
          type: 'paragraph',
          version: 1,
          format: '',
          indent: 0,
          direction: null,
          textFormat: 0,
          children: [
            {
              type: 'text',
              version: 1,
              text: 'Rich text also supports ',
              format: 0,
              mode: 'normal',
              style: '',
              detail: 0,
            },
            {
              type: 'link',
              version: 1,
              format: '',
              indent: 0,
              direction: null,
              fields: {
                linkType: 'custom',
                url: '#',
                newTab: false,
              },
              children: [
                {
                  type: 'text',
                  version: 1,
                  text: 'links with proper styling',
                  format: 0,
                  mode: 'normal',
                  style: '',
                  detail: 0,
                },
              ],
            } as unknown as SerializedTextNode,
            {
              type: 'text',
              version: 1,
              text: ', ',
              format: 0,
              mode: 'normal',
              style: '',
              detail: 0,
            },
            {
              type: 'text',
              version: 1,
              text: 'bold text',
              format: 1,
              mode: 'normal',
              style: '',
              detail: 0,
            },
            {
              type: 'text',
              version: 1,
              text: ', ',
              format: 0,
              mode: 'normal',
              style: '',
              detail: 0,
            },
            {
              type: 'text',
              version: 1,
              text: 'italic text',
              format: 2,
              mode: 'normal',
              style: '',
              detail: 0,
            },
            {
              type: 'text',
              version: 1,
              text: ', and inline ',
              format: 0,
              mode: 'normal',
              style: '',
              detail: 0,
            },
            {
              type: 'code',
              version: 1,
              text: 'code snippets',
              format: 0,
              mode: 'normal',
              style: '',
              detail: 0,
            } as unknown as SerializedTextNode,
            {
              type: 'text',
              version: 1,
              text: ' with proper formatting.',
              format: 0,
              mode: 'normal',
              style: '',
              detail: 0,
            },
          ],
        },
        {
          type: 'list',
          listType: 'bullet',
          start: 1,
          tag: 'ul',
          version: 1,
          format: '',
          indent: 0,
          direction: null,
          children: [
            {
              type: 'listitem',
              version: 1,
              value: 1,
              format: '',
              indent: 0,
              direction: null,
              checked: undefined,
              children: [
                {
                  type: 'text',
                  version: 1,
                  text: 'Unordered list item 1',
                  format: 0,
                  mode: 'normal',
                  style: '',
                  detail: 0,
                },
              ],
            },
            {
              type: 'listitem',
              version: 1,
              value: 2,
              format: '',
              indent: 0,
              direction: null,
              checked: undefined,
              children: [
                {
                  type: 'text',
                  version: 1,
                  text: 'Unordered list item 2 with proper spacing',
                  format: 0,
                  mode: 'normal',
                  style: '',
                  detail: 0,
                },
              ],
            },
            {
              type: 'listitem',
              version: 1,
              value: 3,
              format: '',
              indent: 0,
              direction: null,
              checked: undefined,
              children: [
                {
                  type: 'text',
                  version: 1,
                  text: 'List items inherit proper text color and line height',
                  format: 0,
                  mode: 'normal',
                  style: '',
                  detail: 0,
                },
              ],
            },
          ],
        },
        {
          type: 'list',
          listType: 'number',
          start: 1,
          tag: 'ol',
          version: 1,
          format: '',
          indent: 0,
          direction: null,
          children: [
            {
              type: 'listitem',
              version: 1,
              value: 1,
              format: '',
              indent: 0,
              direction: null,
              checked: undefined,
              children: [
                {
                  type: 'text',
                  version: 1,
                  text: 'Ordered list item 1',
                  format: 0,
                  mode: 'normal',
                  style: '',
                  detail: 0,
                },
              ],
            },
            {
              type: 'listitem',
              version: 1,
              value: 2,
              format: '',
              indent: 0,
              direction: null,
              checked: undefined,
              children: [
                {
                  type: 'text',
                  version: 1,
                  text: 'Ordered list item 2',
                  format: 0,
                  mode: 'normal',
                  style: '',
                  detail: 0,
                },
              ],
            },
            {
              type: 'listitem',
              version: 1,
              value: 3,
              format: '',
              indent: 0,
              direction: null,
              checked: undefined,
              children: [
                {
                  type: 'text',
                  version: 1,
                  text: 'Numbers are automatically styled with proper color',
                  format: 0,
                  mode: 'normal',
                  style: '',
                  detail: 0,
                },
              ],
            },
          ],
        },
        {
          type: 'quote',
          version: 1,
          format: '',
          indent: 0,
          direction: null,
          children: [
            {
              type: 'text',
              version: 1,
              text: 'Blockquotes are styled with a left border and proper spacing. They use the defined quote colors from the theme system.',
              format: 0,
              mode: 'normal',
              style: '',
              detail: 0,
            },
          ],
        },
      ],
      direction: null,
    },
  };

  return (
    <section id="richtext">
      <h2 className="text-display-md font-semibold text-primary mb-8">
        Rich Text Typography (Prose)
      </h2>

      <div className="mb-8 p-6 bg-secondary rounded-lg border border-primary">
        <h3 className="text-display-sm font-semibold text-primary mb-3">How Rich Text Works</h3>
        <div className="space-y-3 text-md text-secondary">
          <p>
            All text inside the RichText component uses the <code className="text-brand-secondary">.prose</code> class,
            which applies consistent typography styling defined in <code className="text-brand-secondary">src/styles/richtext.css</code>.
          </p>
          <p>
            The prose styles reference the same CSS variables from <code className="text-brand-secondary">theme.css</code> as
            component classes, ensuring headings are the same size whether they&apos;re in components or rich text.
          </p>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="mb-12">
        <h3 className="text-display-sm font-semibold text-primary mb-6">Typography Mapping</h3>
        <div className="overflow-x-auto">
          <table className="w-full border border-primary rounded-lg">
            <thead className="bg-secondary">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-primary border-b border-primary">Element</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-primary border-b border-primary">CSS Variable</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-primary border-b border-primary">Tailwind Class</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-primary border-b border-primary">Size</th>
              </tr>
            </thead>
            <tbody className="bg-primary">
              <tr className="border-b border-secondary">
                <td className="px-4 py-3 text-md text-secondary">h1</td>
                <td className="px-4 py-3 text-sm font-mono text-brand-secondary">--text-display-lg</td>
                <td className="px-4 py-3 text-sm font-mono text-brand-secondary">text-display-lg</td>
                <td className="px-4 py-3 text-sm text-tertiary">3rem (48px)</td>
              </tr>
              <tr className="border-b border-secondary">
                <td className="px-4 py-3 text-md text-secondary">h2</td>
                <td className="px-4 py-3 text-sm font-mono text-brand-secondary">--text-display-md</td>
                <td className="px-4 py-3 text-sm font-mono text-brand-secondary">text-display-md</td>
                <td className="px-4 py-3 text-sm text-tertiary">2.25rem (36px)</td>
              </tr>
              <tr className="border-b border-secondary">
                <td className="px-4 py-3 text-md text-secondary">h3</td>
                <td className="px-4 py-3 text-sm font-mono text-brand-secondary">--text-display-sm</td>
                <td className="px-4 py-3 text-sm font-mono text-brand-secondary">text-display-sm</td>
                <td className="px-4 py-3 text-sm text-tertiary">1.875rem (30px)</td>
              </tr>
              <tr className="border-b border-secondary">
                <td className="px-4 py-3 text-md text-secondary">h4</td>
                <td className="px-4 py-3 text-sm font-mono text-brand-secondary">--text-xl</td>
                <td className="px-4 py-3 text-sm font-mono text-brand-secondary">text-xl</td>
                <td className="px-4 py-3 text-sm text-tertiary">1.25rem (20px)</td>
              </tr>
              <tr className="border-b border-secondary">
                <td className="px-4 py-3 text-md text-secondary">h5, h6</td>
                <td className="px-4 py-3 text-sm font-mono text-brand-secondary">--text-lg</td>
                <td className="px-4 py-3 text-sm font-mono text-brand-secondary">text-lg</td>
                <td className="px-4 py-3 text-sm text-tertiary">1.125rem (18px)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-md text-secondary">p (body)</td>
                <td className="px-4 py-3 text-sm font-mono text-brand-secondary">--text-md</td>
                <td className="px-4 py-3 text-sm font-mono text-brand-secondary">text-md</td>
                <td className="px-4 py-3 text-sm text-tertiary">1rem (16px) desktop / 1.0625rem (17px) mobile</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-tertiary">
          ✓ All sizes use CSS variables from <code className="text-brand-secondary">theme.css</code>
          <br />
          ✓ Same semantic level = same size everywhere (component or prose)
          <br />
          ✓ Note: h4 uses <code className="text-brand-secondary">text-xl</code>, not <code className="text-brand-secondary">text-display-xs</code>
        </p>
      </div>

      {/* Live Example */}
      <div className="mb-8">
        <h3 className="text-display-sm font-semibold text-primary mb-6">Live Rich Text Example</h3>
        <p className="text-sm text-tertiary mb-4">
          This content is rendered using the actual <code className="text-brand-secondary">RichText</code> component
          with <code className="text-brand-secondary">enableProse=true</code> (default).
          All styling is applied via the <code className="text-brand-secondary">.prose</code> class.
        </p>
      </div>

      {/* Rendered Rich Text */}
      <div className="bg-secondary p-8 rounded-lg border border-primary">
        <RichText data={sampleContent} enableProse={true} enableGutter={false} />
      </div>

      {/* Additional Notes */}
      <div className="mt-8 p-6 bg-tertiary rounded-lg border border-primary">
        <h4 className="text-xl font-semibold text-primary mb-3">Key Points</h4>
        <ul className="space-y-2 text-md text-secondary">
          <li>• All heading sizes reference CSS variables from <code className="text-brand-secondary">theme.css</code></li>
          <li>• Text colors use semantic tokens (<code className="text-brand-secondary">text-primary</code>, <code className="text-brand-secondary">text-secondary</code>, etc.)</li>
          <li>• Links have hover states and proper underlines</li>
          <li>• Lists inherit proper spacing and marker colors</li>
          <li>• Dark mode automatically applies through <code className="text-brand-secondary">.dark-mode</code> selector</li>
          <li>• Blockquotes use brand color for left border</li>
        </ul>
      </div>
    </section>
  );
}
