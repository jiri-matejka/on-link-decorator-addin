import { connect } from 'react-redux'
import { validUrlEntered, invalidUrlEntered } from '../actionTypes'
import { fetchFavicon } from '../asyncActions'
import { IAppState, UrlState } from '../stateDefinition'
import { UrlBox } from '../components/UrlBox'

function isValidUrl(href: string): boolean {
	
	if(href.indexOf(".") == -1) {
		return false;
	}

	if(!href.startsWith("http://") && !href.startsWith("https://")) {
		href = "https://" + href;
	}

	var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
		'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
		'((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
		'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
		'(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
		'(\\#[-a-z\\d_]*)?$','i'); // fragment locator
	
	return pattern.test(href);

}

function mapDispatchToProps(dispatch) {
	return {
		onUrlEntered: url => {
			const isValid: boolean = isValidUrl(url);
			if (!isValid) {
				dispatch(invalidUrlEntered());
			}
			else {
				dispatch(validUrlEntered(url));
				dispatch(fetchFavicon(url));
			}
		}
	}
};

function mapStateToProps(state : IAppState)  {
	return {
		// empty or valid == valid
		isUrlValid: state.urlState !== UrlState.INVALID_URL_ENTERED
	}
}

export const UrlBoxContainer = connect(mapStateToProps, mapDispatchToProps)(UrlBox);