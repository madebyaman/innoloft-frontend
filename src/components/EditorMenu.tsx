import { Editor } from '@tiptap/react';
import clsx from 'clsx';
import {
  BsCode,
  BsDash,
  BsListOl,
  BsListUl,
  BsTypeBold,
  BsTypeItalic,
} from 'react-icons/bs';
import { FaQuoteLeft, FaRedo, FaUndo } from 'react-icons/fa';

const VerticalRule = () => (
  <hr
    className="hidden sm:block"
    style={{
      width: '1px',
      height: '30px',
      backgroundColor: '#e9ebf0',
      marginLeft: '5px',
      marginRight: '5px',
    }}
  />
);

type IconButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  isActive?: boolean;
  icon: React.ReactNode;
};

function IconButton({ isActive, icon, ...props }: IconButtonProps) {
  return (
    <button
      type="button"
      className={clsx(
        'inline-flex items-center p-2 border border-border-slate-100 rounded-full shadow-sm disabled:opacity-50 disabled:cursor-not-allowed',
        isActive
          ? 'bg-gray-700 text-white'
          : 'bg-transparent text-gray-800 hover:bg-slate-100'
      )}
      {...props}
    >
      {icon}
    </button>
  );
}

const EditorMenu = ({
  editor,
  isDisabled,
}: {
  editor: Editor | null;
  isDisabled: boolean;
}) => {
  if (!editor) {
    return null;
  }

  /**
   * When someone selects a heading, text to the heading. And if they select normal text, change text to paragraph
   */
  const changeText = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (
      e.target.value === '2' ||
      e.target.value === '3' ||
      e.target.value === '4'
    ) {
      const level = parseInt(e.target.value) as 1 | 2 | 3 | 4 | 5 | 6;
      editor.chain().focus().toggleHeading({ level }).run();
    } else if (e.target.value === 'normal') {
      editor.chain().focus().setParagraph().run();
    }
  };

  /**
   * Get current text value. For example, If it is h2, then Large Header will be selected in EditorMenu select
   */
  function changeTextValue() {
    if (editor?.isActive('paragraph')) {
      return 'normal';
    } else if (editor?.isActive('heading', { level: 2 })) {
      return '2';
    } else if (editor?.isActive('heading', { level: 3 })) {
      return '3';
    } else if (editor?.isActive('heading', { level: 4 })) {
      return '4';
    }
  }

  return (
    <div className="flex flex-wrap py-2 gap-2 sm:items-center">
      <select
        onChange={changeText}
        placeholder="Change text"
        value={changeTextValue()}
        disabled={isDisabled}
        className="mr-2"
      >
        <option value={'2'}>Large Header</option>
        <option value={'3'}>Medium Header</option>
        <option value={'4'}>Small Header</option>
        <option value={'normal'}>Normal Text</option>
      </select>
      <VerticalRule />
      <div className="flex items-center gap-2">
        <IconButton
          disabled={isDisabled}
          onClick={() => editor.chain().focus().toggleBold().run()}
          aria-label="Bold"
          isActive={editor.isActive('bold')}
          icon={<BsTypeBold style={{ fontSize: '18px' }} />}
        />
        <IconButton
          disabled={isDisabled}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          aria-label="Italic"
          isActive={editor.isActive('italic')}
          icon={<BsTypeItalic style={{ fontSize: '18px' }} />}
        />
        <IconButton
          disabled={isDisabled}
          onClick={() => editor.chain().focus().toggleCode().run()}
          aria-label="Code"
          isActive={editor.isActive('code')}
          icon={<BsCode style={{ fontSize: '18px' }} />}
        />
        <VerticalRule />
      </div>
      <div className="flex items-center gap-2">
        <IconButton
          disabled={isDisabled}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          aria-label="Unordered List"
          isActive={editor.isActive('bulletList')}
          icon={<BsListUl style={{ fontSize: '18px' }} />}
        />
        <IconButton
          disabled={isDisabled}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          aria-label="Ordered List"
          isActive={editor.isActive('orderedList')}
          icon={<BsListOl style={{ fontSize: '18px' }} />}
        />
        <IconButton
          disabled={isDisabled}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          aria-label="Blockquote"
          isActive={editor.isActive('blockquote')}
          icon={<FaQuoteLeft style={{ fontSize: '12px' }} />}
        />
        <IconButton
          disabled={isDisabled}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          aria-label="Horizontal Rule"
          icon={<BsDash style={{ fontSize: '18px' }} />}
        />
        <VerticalRule />
      </div>
      <div className="flex items-center gap-2">
        <IconButton
          disabled={isDisabled}
          onClick={() => editor.chain().focus().undo().run()}
          aria-label="Undo"
          icon={<FaUndo style={{ fontSize: '13px' }} />}
        />
        <IconButton
          disabled={isDisabled}
          onClick={() => editor.chain().focus().redo().run()}
          aria-label="Redo"
          icon={<FaRedo style={{ fontSize: '13px' }} />}
        />
      </div>
    </div>
  );
};

export default EditorMenu;
