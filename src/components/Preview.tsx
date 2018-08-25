import * as React from 'react';
import { Spinner, SpinnerSize, TextField } from 'office-ui-fabric-react';
import { MessageBar } from 'office-ui-fabric-react';

import './Preview.css';

export interface IPreviewStaticProps
{
    isLoading: boolean,
    isVisible: boolean,
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
        if(!this.props.isVisible)
            return null;

        return  (
                <div>
                    <h2 className="ms-font-xxl">Preview</h2>
                   
                    {this.props.isLoading && 
                        <Spinner size={SpinnerSize.medium} key="spinner" label="Loading icon and title" />
                    }
                    {this.props.isErrored &&
                        <MessageBar className="message-bar">
                            Icon not downloaded: { this.props.error }
                        </MessageBar>                            
                    }
                    {!this.props.isLoading && 
                        <div className="preview">
                            <img className="image" src={ `data:${this.props.faviconMime};base64,${this.props.faviconData}` } />
                            <TextField className="title-box" value={this.props.title} borderless autoFocus />
                        </div>
                    }
                    
                </div>)
    }

}