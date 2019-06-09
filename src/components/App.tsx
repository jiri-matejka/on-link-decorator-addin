import * as React from 'react';

import Header from './Header';

import { UrlBoxContainer } from '../containers/UrlBoxContainer';
import { PreviewContainer } from '../containers/PreviewContainer';
import { InsertBoxContainer } from '../containers/InsertBoxContainer';

import './AppStyles.css'

export interface AppProps {   
    isOfficeInitialized: boolean;
}

export default class App extends React.Component<AppProps> {    
    constructor(props, context) {
        super(props, context);
        this.render = this.render.bind(this);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="ms-welcome" >                
                <Header/>
                <UrlBoxContainer/>
                <PreviewContainer/>                
                <InsertBoxContainer />
            </div>
        );
    }

  
}
