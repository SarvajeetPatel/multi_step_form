import { useFormikContext } from 'formik';
import React from 'react'
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
  const { setFieldValue, values, errors } = useFormikContext();

  return (
    <>
      <EditorProvider>
        <Editor value={values.desp.value} onChange={(e) => setFieldValue('desp.value', e.target.value)}>
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnAlignCenter />
          </Toolbar>
        </Editor>
      </EditorProvider>
      <br />
      <div className='validate'> {errors?.desp?.value} </div>
    </>
  )
}

export default SelfDescription