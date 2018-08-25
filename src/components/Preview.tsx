import * as React from 'react';
import { Spinner, SpinnerSize, TextField } from 'office-ui-fabric-react';
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
                    <div className="preview">
                        {this.props.isLoading && 
                            <Spinner size={SpinnerSize.medium} key="spinner" />
                        }
                        {!this.props.isLoading && 
                            <React.Fragment>
                                <img className="image" src={ `data:${this.props.faviconMime};base64,${this.props.faviconData}` } />
                                <TextField className="title-box" value={this.props.title} borderless autoFocus />
                            </React.Fragment>
                        }
                    </div>
                </div>)
    }

}