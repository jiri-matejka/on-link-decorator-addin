import * as React from 'react';
import { MessageBar, TextField, Label, Spinner } from 'office-ui-fabric-react';

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

        const placeholder : string = this.props.isLoading ? "Loading the icon" : "Title of your bookmark";
        const title : string = this.props.isLoading ? "" : this.props.title;

        return  (
                <div>
                   <Label>Icon and title</Label>
                                      
                    {this.props.isErrored &&
                        <MessageBar className="message-bar">
                            Icon not downloaded: { this.props.error }
                        </MessageBar>                            
                    }
                    
                    <div className="preview">
                        {this.props.isLoading &&
                            <Spinner className="image" />
                        }
                        {!this.props.isLoading &&
                            <img className="image" src={ src } />
                        }
                        <TextField className="title-box" value={title} placeholder={placeholder} />
                    </div>
                
                    
                </div>)
    }

}