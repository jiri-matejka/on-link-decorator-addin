import * as React from 'react';
import { TextField } from 'office-ui-fabric-react';
import './Preview.css';

export interface IPreviewProps
{
    faviconData: string,
    faviconMime: string,
    title: string
}

export default class Preview extends React.Component<IPreviewProps> {
    
    constructor(props) {
        super(props);
        this.render = this.render.bind(this);
    }

    render() {

        return (
            <div>
                <h2 className="ms-font-xxl">Preview</h2>
                <div className="preview">
                
                    <img className="image" src={ `data:${this.props.faviconMime};base64,${this.props.faviconData}` } />
                    <TextField className="title-box" value={this.props.title} borderless />
                </div>
            </div>)
    }

}