import React from 'react';

export interface IEditorToolbarProps {
    onStyleChanged: (style: any) => void;
}

export default class EditorToolbar extends React.Component<IEditorToolbarProps, {}> {
    onBoldClick() {
        this.props.onStyleChanged('BOLD');
    }

    onItalicClick() {
        this.props.onStyleChanged('ITALIC');
    }

    onUnderlineClick() {
        this.props.onStyleChanged('UNDERLINE');
    }

    render() {
        return (
            <div>
                <button className="toolButton" onClick={this.onBoldClick.bind(this)}>Bold</button>
                <button className="toolButton" onClick={this.onItalicClick.bind(this)}>Italic</button>
                <button className="toolButton" onClick={this.onUnderlineClick.bind(this)}>Underline</button>
            </div>
        );
    }
}