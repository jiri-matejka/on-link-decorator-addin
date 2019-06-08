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
                
                const paragraph = context.application.getActiveParagraphOrNull();
                

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
        // const {
        //     title,
        //     isOfficeInitialized,
        // } = this.props;

        // if (!isOfficeInitialized) {
        //     return (
        //         <Progress
        //             title={title}
        //             logo='assets/logo-filled.png'
        //             message='Please sideload your addin to see app body.'
        //         />
        //     );
        // }

        let elements = new Array(3);

        elements.push (<Header />);

        elements.push(<UrlBoxContainer />);
        elements.push(<PreviewContainer/>);

        

        elements.push(<Button primary text="Insert" className="app-primary-button" 
            onClick={this.onInsertClick} />)


        return React.createElement("div", {className: "ms-welcome"}, elements);
        
    }

  
}
