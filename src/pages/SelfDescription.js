import React, { useState } from 'react'
import {
  BtnBold,
  BtnItalic,
  createButton,
  Editor,
  EditorProvider,
  Toolbar
} from 'react-simple-wysiwyg';

const BtnAlignCenter = createButton('Align center', '≡', 'justifyCenter');

function SelfDescription() {
  const [value, setValue] = useState('simple text');

  function onChange(e) {
    setValue(e.target.value);
  }
  return (
    <EditorProvider>
      <Editor value={value} onChange={onChange}>
        <Toolbar>
          <BtnBold />
          <BtnItalic />
          <BtnAlignCenter />
        </Toolbar>
      </Editor>
    </EditorProvider>
  )
}

export default SelfDescription