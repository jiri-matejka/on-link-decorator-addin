import * as React from 'react';
import { Button } from 'office-ui-fabric-react';

import insertBookmarkToNotebook from '../insertBookmarkToNotebook';

export interface IInsertBoxProps {
	title: string,
	link: string,
	faviconUrl: string,
	faviconImageData: string,
	faviconMime: string
}

export default class InsertBox extends React.Component<IInsertBoxProps> {

	constructor(props: IInsertBoxProps, context) {
		super(props, context);

		this.render = this.render.bind(this);
		this.onInsertClick = this.onInsertClick.bind(this);
	}

	render() {
		return (
			<Button primary text="Insert" className="app-primary-button main-surface-flex-item" onClick={this.onInsertClick} />
		);
	}

	onInsertClick() {
        insertBookmarkToNotebook(this.props.link, this.props.title, this.props.faviconUrl, this.props.faviconImageData, this.props.faviconMime);
    }
}