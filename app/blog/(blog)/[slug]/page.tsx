import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'

export default function App() {
  const markdown = `
  # Todo List
  - [x] Learn Markdown
  - [ ] Build App

  | Name  | Age |
  |-------|-----|
  | John  | 23  |
  | Alice | 25  |

  ~~Mistake~~
  `;

  return (
    <div className="text-lg">
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {markdown}
    </ReactMarkdown>
    </div>
  );
}
