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
        <div style={{marginTop:'30px'}}></div>
            <EditorProvider>
                <Editor value={values?.desp?.value} onChange={(e) => setFieldValue('desp.value', e.target.value)} style={{ backgroundColor: 'white', height:'200px'}} placeholder='Please write about yourself!'>
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