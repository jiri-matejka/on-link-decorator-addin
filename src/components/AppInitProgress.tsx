import * as React from 'react';
import { Spinner, SpinnerType } from 'office-ui-fabric-react';

export interface AppInitProgressProps {
    logo: string;
    message: string;
    title: string;
}

export default class AppInitProgress extends React.Component<AppInitProgressProps> {
    render() {
        const {
            logo,
            message,
            title,
        } = this.props;

        return (
            <section className='ms-welcome__progress ms-u-fadeIn500'>
                <img width='90' height='90' src={logo} alt={title} title={title} />
                <h1 className='ms-fontSize-su ms-fontWeight-light ms-fontColor-neutralPrimary'>{title}</h1>
                <Spinner type={SpinnerType.large} label={message} />
            </section>
        );
    }
}
