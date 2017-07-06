import React from 'react';

export interface IHeaderProps {
    header: string;
    subheader: string;
    imageFileName: string;
}

export default class Header extends React.Component<IHeaderProps, {}> {
    render() {
        const imageStyle = {
            backgroundImage: "url('Content/Images/" + this.props.imageFileName + "')"
        };
        return (
            <header className="intro-header" style={imageStyle}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                            <div className="site-heading">
                                <h1>{this.props.header}</h1>
                                <hr className="small" />
                                <span className="subheading">{this.props.subheader}</span>                             
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}