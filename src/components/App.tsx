import * as React from 'react';
import { Button } from 'office-ui-fabric-react';
import * as OfficeHelpers from '@microsoft/office-js-helpers';

import Header from './Header';

import { UrlBoxContainer } from '../containers/UrlBoxContainer';
import { PreviewContainer } from '../containers/PreviewContainer';

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

    click = async () => {
        try {
            await OneNote.run(async context => {      
                return context.sync();
            });
        } catch(error) {
            OfficeHelpers.UI.notify(error);
            OfficeHelpers.Utilities.log(error);
        };
    }

    onInsertClick() {

    }

    render() {
        return (
            <div className="ms-welcome" >                
                <Header/>
                <UrlBoxContainer/>
                <PreviewContainer/>                
                <Button primary text="Insert" className="app-primary-button main-surface-flex-item" onClick={this.onInsertClick} />
            </div>
        );
    }

  
}
