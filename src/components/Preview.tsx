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

        return (<div className="preview">
                <img src={ `data:${this.props.faviconMime};base64,${this.props.faviconData}` } />
                <TextField  value={this.props.title} />
            </div>)
    }

}