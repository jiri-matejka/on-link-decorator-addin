import * as React from 'react';
import { TextField } from 'office-ui-fabric-react';

export interface UrlBoxProps {
	onUrlEntered: any,
	isUrlValid: boolean
}


export class UrlBox extends React.Component<UrlBoxProps> {
    constructor(props, context) {
        super(props, context);
      
		this.onTextFieldBlur = this.onTextFieldBlur.bind(this);
		this.render = this.render.bind(this);
	}

	render() {
		
		return (
			<TextField label="Url" key="txtbox" 
				errorMessage={!this.props.isUrlValid ? "Url not valid" : null} 
				placeholder="Insert your bookmark link"
				onBlur={this.onTextFieldBlur} />
		)
	}
		
	onTextFieldBlur(newValue: React.FocusEvent<HTMLElement>) {		
		const url = (newValue.currentTarget as HTMLInputElement).value;

		this.props.onUrlEntered(url);	
				
	}

	
	

	
}
