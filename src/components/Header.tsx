import * as React from 'react';

import './Header.css'

export default class Header extends React.Component {
    render() {
        return (
            <section className='ms-bgColor-neutralLighter ms-u-fadeIn500'>
                <img id='header-logo' width='48' height='48' src='assets/icons8-bookmark-page-48.png' />
                <p id="header-motto" className="ms-fontWeight-light">Beautify your links by automatically add favicon</p>                
            </section>
        );
    }
}
