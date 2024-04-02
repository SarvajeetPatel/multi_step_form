import React, { useContext, useState } from 'react'
import {
  BtnBold,
  BtnItalic,
  createButton,
  Editor,
  EditorProvider,
  Toolbar
} from 'react-simple-wysiwyg';
import NoteContext from '../context/NoteContext';

const BtnAlignCenter = createButton('Align center', '≡', 'justifyCenter');

function SelfDescription({ handleNext }) {
  const [value, setValue] = useState('');
  const { setDesp } = useContext(NoteContext);
  const [errors, setError] = useState('');
  function onChange(e) {
    setValue(e.target.value);
  }

  function handleSubmit() {
    if (!value) {
      setError('Enter a description!')
    } else {
      setError('');
      setDesp(value)
      console.log(!value, "desp")
      handleNext(value);
    }
  }

  return (
    <>
      <EditorProvider>
        <Editor value={value} onChange={onChange}>
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnAlignCenter />
          </Toolbar>
        </Editor>
      </EditorProvider>
      <br />
      <div className='validate'> {errors} </div>
      <button type='submit' onClick={handleSubmit}> SAVE </button>
    </>
  )
}

export default SelfDescription