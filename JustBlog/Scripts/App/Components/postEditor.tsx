import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import EditorToolbar from './PostEditor/editorToolbar';

export interface IMyEditorState {
    editorState: EditorState;
}

export default class PostEditor extends React.Component<{}, IMyEditorState> {
    constructor(props: any) {
        super(props);
        this.state = { editorState: EditorState.createEmpty() };
    }
    onChange(e: EditorState) {
        this.setState({ editorState: e });
    }
    handleKeyCommand(command: any) {
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
        if (newState) {
            this.onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }
    handleStyleChanged(style: any) {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, style));
    }
    render() {
        return (
            <div>
                <EditorToolbar onStyleChanged={this.handleStyleChanged.bind(this)} />
                <div className="editor">
                    <Editor
                        editorState={this.state.editorState}
                        handleKeyCommand={this.handleKeyCommand.bind(this)}
                        onChange={this.onChange.bind(this)}
                    />
                </div>
            </div>
        );
    }
}