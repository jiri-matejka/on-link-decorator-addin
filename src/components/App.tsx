import * as React from 'react';
import { Button } from 'office-ui-fabric-react';
import * as OfficeHelpers from '@microsoft/office-js-helpers';

import Header from './Header';

import { UrlBoxContainer } from '../containers/UrlBoxContainer';
import { PreviewContainer } from '../containers/PreviewContainer';


export interface AppProps {
    title: string
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
                /**
                 * Insert your OneNote code here
                 */
                return context.sync();
            });
        } catch(error) {
            OfficeHelpers.UI.notify(error);
            OfficeHelpers.Utilities.log(error);
        };
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

        elements.push (<Header logo='assets/logo-filled.png' title={this.props.title} message='Welcome' />);

        elements.push(<UrlBoxContainer />);
        elements.push(<PreviewContainer/>);

        elements.push(<Button primary text="Insert" />)


        return React.createElement("div", {className: "ms-welcome"}, elements);
        
    }

  
}
