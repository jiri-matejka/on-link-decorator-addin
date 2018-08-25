import * as React from 'react';
import { Shimmer, ShimmerElementType as ElemType } from 'office-ui-fabric-react';
import { MessageBar, TextField, Label } from 'office-ui-fabric-react';

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
                   <Label>Icon and title</Label>
                   
                    {this.props.isLoading && 
                        <Shimmer
                            shimmerElements={[{ type: ElemType.circle, height: 30 }, { type: ElemType.gap, width: 5 }, { type: ElemType.line, height: 30 }]}
                      />
                    }
                    {this.props.isErrored &&
                        <MessageBar className="message-bar">
                            Icon not downloaded: { this.props.error }
                        </MessageBar>                            
                    }
                    {!this.props.isLoading && 
                        <div className="preview">
                            <img className="image" src={ `data:${this.props.faviconMime};base64,${this.props.faviconData}` } />
                            <TextField className="title-box" value={this.props.title} autoFocus />
                        </div>
                    }
                    
                </div>)
    }

}