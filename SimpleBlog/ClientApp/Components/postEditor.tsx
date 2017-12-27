import * as React from 'react';
import { Editor } from 'react-draft-wysiwyg';

export default class PostEditor extends React.Component<{}, {}> {
    render() {
        return (
            <Editor />
        );
    }
}