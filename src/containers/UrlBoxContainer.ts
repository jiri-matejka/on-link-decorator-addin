import { connect } from 'react-redux'
import { validUrlEntered, invalidUrlEntered } from '../actionTypes'
import { fetchFavicon } from '../asyncActions'
import { IAppState, UrlState } from '../stateDefinition'
import { UrlBox } from '../components/UrlBox'

function getHostName(href: string) {
	var match = href.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
	if(!match)
		return null;
	else return match[2];
	
	// return match && {
	//     href: href,
	//     protocol: match[1],
	//     host: match[2],
	//     hostname: match[3],
	//     port: match[4],
	//     pathname: match[5],
	//     search: match[6],
	//     hash: match[7]
	// }
}

function mapDispatchToProps(dispatch) {
	return {
		onUrlEntered: url => {
			const hostname: string = getHostName(url);
			if (hostname === null) {
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