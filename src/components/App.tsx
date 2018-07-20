import * as React from 'react';
//import { Button, ButtonType } from 'office-ui-fabric-react';
import Header from './Header';
//import Progress from './Progress';
import UrlBox from './UrlBox';

import * as OfficeHelpers from '@microsoft/office-js-helpers';

export interface AppProps {
    title: string;
    isOfficeInitialized: boolean;
}

export interface AppState {    
}

export default class App extends React.Component<AppProps, AppState> {    
    constructor(props, context) {
        super(props, context);
        this.state = {
            listItems: []
        };
    }

    componentDidMount() {
        this.setState({
            listItems: [
                {
                    icon: 'Ribbon',
                    primaryText: 'Achieve more with Office integration'
                },
                {
                    icon: 'Unlock',
                    primaryText: 'Unlock features and functionality'
                },
                {
                    icon: 'Design',
                    primaryText: 'Create and visualize like a pro'
                }
            ]
        });
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

        return (
            <div className='ms-welcome'>
                <Header logo='assets/logo-filled.png' title={this.props.title} message='Welcome' />
                
                <UrlBox onFaviconObtained={this.onFaviconObtained} />
            </div>
        );
    }

    onFaviconObtained(faviconUrl: string) {
        faviconUrl = faviconUrl;
    }
}
