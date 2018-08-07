import * as React from 'react';
import { IPreviewProps } from './Preview'

export default class Preview extends React.Component<IPreviewProps> {
    
    constructor(props) {
        super(props);
        this.render = this.render.bind(this);
	}

	// Renderless component
	render() {
		return null;
	}
}