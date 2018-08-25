import * as React from 'react';
import { TextField } from 'office-ui-fabric-react';

export interface UrlBoxProps {
	onUrlEntered: any,
	isUrlValid: boolean
}

interface IUrlBoxState {
	lastUrl: string
}

export class UrlBox extends React.Component<UrlBoxProps, IUrlBoxState> {
    constructor(props, context) {
        super(props, context);
      
		this.onTextFieldBlur = this.onTextFieldBlur.bind(this);
		this.render = this.render.bind(this);

		this.state = {
			lastUrl: null
		}
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

		if(this.state.lastUrl !== url)	{
			this.setState({lastUrl: url});
			this.props.onUrlEntered(url);	
		}

				
	}

	
	

	
}
