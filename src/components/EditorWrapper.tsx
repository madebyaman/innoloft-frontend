import Placeholder from '@tiptap/extension-placeholder';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useState } from 'react';

import ContentEditor from './Editor';
import EditorMenu from './EditorMenu';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updateDescription } from '../store/product-slice';

export const ContentEditorWrapper = () => {
  const [showMenu, setShowMenu] = useState(false);
  const content = useAppSelector((state) => state.product.product?.description);
  const dispatch = useAppDispatch();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write something ...',
      }),
    ],
    content,
    onFocus() {
      setShowMenu(true);
    },
    onBlur({ editor }) {
      editor && dispatch(updateDescription(editor.getHTML()));
    },
  });

  return (
    <div className="border border-gray-200 p-2 shadow-sm">
      <div className="px-4 z-10">
        {/* Sticky bar for editor menu */}
        <EditorMenu isDisabled={!showMenu} editor={editor} />
      </div>
      {/* Content area */}
      <ContentEditor editor={editor} />
    </div>
  );
};
