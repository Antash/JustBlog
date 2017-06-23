/*import React from 'react';
import { Editor, EditorState } from 'draft-js';

export interface IMyEditorState {
    state: EditorState,
    onChange: (state: EditorState) => void
}

export default class MyEditor extends React.Component<IMyEditorState, IMyEditorState> {
    constructor(props: IMyEditorState) {
        super(props);
        this.state = { editorState: EditorState.createEmpty(),  };
        this.state.onChange = (editorState) => this.setState({ editorState });
    }
    render() {
        return (
            <Editor editorState={this.state.editorState} onChange={this.onChange} />
        );
    }
}*/ 
//# sourceMappingURL=postEditor.js.map