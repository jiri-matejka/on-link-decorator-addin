import * as React from 'react';
import { TextField, Label, Spinner } from 'office-ui-fabric-react';

import './Preview.css';

export interface IPreviewStaticProps
{
    isLoading: boolean,    
    isErrored: boolean,    
    hasFavicon: boolean,
    faviconData: string,
    faviconMime: string,
    title: string,
    error: string
}

export interface IPreviewDispatchProps {

} 

interface IPreviewProps extends IPreviewStaticProps, IPreviewDispatchProps 
{}


export default class Preview extends React.Component<IPreviewProps> {
    
    constructor(props) {
        super(props);
        this.render = this.render.bind(this);
    }

    render() {        
        const src = this.props.faviconData != null ? 
            `data:${this.props.faviconMime};base64,${this.props.faviconData}`
            : 'assets/icons8-bookmark-page-48.png';
        const imgTitle = this.props.faviconData != null ? "" : "Default icon is used because the website does not provide favicon";

        const placeholder : string = this.props.isErrored ? `Icon not downloaded: ${this.props.error}` : (this.props.isLoading ? "Loading the icon..." : "Title of your bookmark");
        const title : string = this.props.isErrored ? "" : (this.props.isLoading ? "" : this.props.title);

        return  (
                <div className="main-surface-flex-item">
                   <Label>Icon and title</Label>      
                    
                    <div className="preview">
                        {this.props.isLoading &&
                            <Spinner className="preview-spinner" />
                        }
                        {!this.props.isLoading &&
                            <img className="preview-image" src={ src } title={imgTitle} />
                        }
                        <TextField className="preview-title-box" value={title} placeholder={placeholder} />
                    </div>
                
                    
                </div>)
    }

}