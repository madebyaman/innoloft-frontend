import { Editor, EditorContent } from '@tiptap/react';

/**
 * Tiptap editor component. It also displays title.
 */
const ContentEditor = ({ editor }: { editor: Editor | null }) => {
  return (
    <div className="prose">
      <EditorContent editor={editor} />
    </div>
  );
};

export default ContentEditor;
