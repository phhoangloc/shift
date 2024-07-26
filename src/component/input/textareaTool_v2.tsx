'use client'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { Editor, EditorState, RichUtils, Modifier, AtomicBlockUtils, CompositeDecorator } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';

type Props = {
    onChange: (e: string) => void,
    value: string,
    onGetPic?: () => void,
    pics?: string[]
}

const Image = (props: any) => {
    const { src } = props.contentState.getEntity(props.entityKey).getData();
    return <img src={src} alt="" style={{ maxWidth: '100%' }} />;
};
const decorator = new CompositeDecorator([
    {
        strategy: (contentBlock, callback, contentState) => {
            contentBlock.findEntityRanges((character) => {
                const entityKey = character.getEntity();
                return (
                    entityKey !== null && contentState.getEntity(entityKey).getType() === 'IMAGE'
                );
            }, callback);
        },
        component: Image,
    },
]);

const TextAreaTool_v2 = ({ onChange, value, onGetPic, pics }: Props) => {

    const inputRef = useRef<any>()
    const inputValueLeftRef = useRef<any>()

    const [focus, setFocus] = useState<boolean>(false)
    const [inputLeftValue, setInputLeftValue] = useState<string>("")
    const [inputType, setInputType] = useState<string>("")
    const [focusInput, setFocusInput] = useState<boolean>(false)

    const [editorState, setEditorState] = useState(EditorState.createEmpty(decorator));
    const selectionState = editorState.getSelection();
    const startKey = selectionState.getStartKey();
    const block = editorState.getCurrentContent().getBlockForKey(startKey);
    const newEditorState = EditorState.acceptSelection(editorState, selectionState)
    const blockType = block.getType();

    const [content, setContent] = useState<string>("");

    const createBlockStyle = (value: any, type: string) => {
        setEditorState(RichUtils.toggleBlockType(value, type));
    }
    const createInlineStyle = (value: any, type: string) => {
        setEditorState(RichUtils.toggleInlineStyle(value, type));
    }
    const createLink = (value: string) => {

        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', { url: value });
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newContentState = Modifier.applyEntity(
            contentStateWithEntity,
            editorState.getSelection(),
            entityKey
        );
        let newEditorState = EditorState.push(editorState, newContentState, 'apply-entity');
        newEditorState = newEditorState.getCurrentInlineStyle().has("UNDERLINE") ? RichUtils.toggleInlineStyle(newEditorState, '') : RichUtils.toggleInlineStyle(newEditorState, 'UNDERLINE');
        setEditorState(newEditorState);

    }
    const removeLink = () => {
        const selectionState = editorState.getSelection();
        if (!selectionState.isCollapsed()) {
            let newEditorState = RichUtils.toggleLink(editorState, selectionState, null);
            newEditorState = newEditorState.getCurrentInlineStyle().has("UNDERLINE") ? RichUtils.toggleInlineStyle(newEditorState, 'UNDERLINE') : RichUtils.toggleInlineStyle(newEditorState, '');
            setEditorState(newEditorState);
        }
    };
    const createImage = (value: string) => {
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', { src: process.env.FTP_URL + "img/shift/" + value });
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
        setEditorState(newEditorState);
    }
    useEffect(() => {
        const valueState = stateFromHTML(value)
        setEditorState(EditorState.createWithContent(valueState, decorator))
    }, [value])

    useEffect(() => {
        setContent(stateToHTML(editorState.getCurrentContent()))
    }, [editorState])

    useEffect(() => {
        onChange && onChange(content)
    }, [content])

    useEffect(() => {
        pics?.map((pic) => {
            createImage(pic)
        })
    }, [pics])
    const box: React.CSSProperties = {
        padding: "5px",
        margin: "10px 0",
        transition: "all 0.25s",
        position: "relative",
    }
    const boxFocus: React.CSSProperties = {
        padding: "5px",
        background: "inherit",
        color: "inherit",
    }
    const tool: React.CSSProperties = {
        width: "calc(100%)",
        background: "#f8f8f8",
        position: "sticky",
        top: "0px",
        display: "flex",
        flexWrap: "wrap",
    }

    const button: React.CSSProperties = {
        width: "40px",
        height: "40px",
        lineHeight: "40px",
        textAlign: "center",
        borderRadius: "5px",
        cursor: "pointer",
        boxSizing: "border-box",
        transition: "all 0.25s",
        margin: "5px"
    }
    const buttonUse: React.CSSProperties = {
        background: "#e8e8e8",
    }

    const icon: React.CSSProperties = {
        width: "40px",
        height: "40px",
        lineHeight: "40px",
        textAlign: "center",
        borderRadius: "5px",
        cursor: "pointer",
        boxSizing: "border-box",
        padding: "5px",
        margin: "5px 5px 0 0",
        boxShadow: "2px 2px 4px -2px #888",
        transition: "all 0.25s",
        background: "#006699",
        color: "white"
    }


    const input: React.CSSProperties = {
        width: "200px",
        height: "40px",
        boxSizing: "border-box",
        margin: "5px 5px 0px 0px",
        padding: "0 5px",
        transition: "all 0.5s",
        borderRadius: "5px",
    }


    const modalBox: React.CSSProperties = {
        width: "max-content",
        minHeight: "40px",
        left: "5px",
        opacity: 0,
        flexWrap: "wrap",
        overflow: "hidden",
        marginTop: "5px",
        position: "absolute",
        transition: "all 0.25s",
        zIndex: -1,
        display: "flex"
    }
    const modalBoxFocus: React.CSSProperties = {
        opacity: 1, height: "max-content", marginTop: "45px", zIndex: 2
    }

    const onSubmit = (t: string, vl: string,) => {
        switch (t) {
            case "link": createLink(vl);
                break
            case "img": createImage(vl)
                break
        }
        setInputLeftValue("")

    }


    return (
        <div style={focus || inputRef?.current?.innerHTML ? { ...box, ...boxFocus } : { ...box }} >

            <div style={{ ...tool }}>
                <p style={blockType === "header-one" ? { ...button, ...buttonUse } : { ...button }} onClick={() => createBlockStyle(editorState, "header-one")}>h1</p>
                <p style={blockType === "header-two" ? { ...button, ...buttonUse } : { ...button }} onClick={() => createBlockStyle(editorState, "header-two")}>h2</p>
                <p style={blockType === "header-three" ? { ...button, ...buttonUse } : { ...button }} onClick={() => createBlockStyle(editorState, "header-three")}>h3</p>
                <p style={blockType === "header-four" ? { ...button, ...buttonUse } : { ...button }} onClick={() => createBlockStyle(editorState, "header-four")}>h4</p>
                <p style={blockType === "header-five" ? { ...button, ...buttonUse } : { ...button }} onClick={() => createBlockStyle(editorState, "header-five")}>h5</p>
                <p style={blockType === "paragraph" ? { ...button, ...buttonUse } : { ...button }} onClick={() => createBlockStyle(editorState, "paragraph")}>p</p>
                <p style={newEditorState.getCurrentInlineStyle().has("BOLD") ? { ...button, ...buttonUse } : { ...button }} onClick={() => createInlineStyle(editorState, "BOLD")}>B</p>
                <p style={newEditorState.getCurrentInlineStyle().has("ITALIC") ? { ...button, ...buttonUse } : { ...button }} onClick={() => createInlineStyle(editorState, "ITALIC")}>i</p>
                <p style={button} onClick={() => { setFocusInput(!focusInput), setInputType("link") }}>url</p>
                <p style={button} onClick={() => { removeLink() }}>url -</p>
                <p style={button} onClick={() => { onGetPic && onGetPic() }}>IMG</p>
                <div style={focusInput ? { ...modalBox, ...modalBoxFocus } : modalBox}>
                    <input
                        ref={inputValueLeftRef}
                        style={{ ...input }} placeholder={inputType === "dl" ? '定義' : inputType === "link" ? "url" : "価値"}
                        onChange={(e) => setInputLeftValue(e.target.value)}
                        value={inputLeftValue}
                        onFocus={(e) => {
                            e.target.style.outline = 'none'
                        }}>
                    </input>
                    <CloseIcon style={icon} onClick={() => { setFocusInput(false), setInputType("") }} />
                    <CheckIcon style={icon} onClick={() => { onSubmit(inputType, inputLeftValue), setFocusInput(false), setInputType("") }} />
                </div>
            </div>

            <div className='dangerousBox'>
                <Editor editorState={editorState} onChange={(editorState) => setEditorState(editorState)} />
            </div>
        </div >
    )
}

export default TextAreaTool_v2