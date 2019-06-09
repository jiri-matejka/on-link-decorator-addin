import { faviconFetchStarted, faviconFetchFailed, faviconFetchCompleted } from './actionTypes'

function postWithData (url = ``, data = {}) {
	// Default options are marked with *
	  return fetch(url, {
		  method: "POST", // *GET, POST, PUT, DELETE, etc.
		  mode: "cors", // no-cors, cors, *same-origin
		  cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		  credentials: "same-origin", // include, same-origin, *omit
		  headers: {
			  "Content-Type": "application/json; charset=utf-8",
			  // "Content-Type": "application/x-www-form-urlencoded",
		  },
		  redirect: "follow", // manual, *follow, error
		  referrer: "no-referrer", // no-referrer, *client
		  body: JSON.stringify(data), // body data type must match "Content-Type" header
	  })
	  .then(response => response.json()) // parses response to JSON
	  .catch(error => console.error(`Fetch Error =\n`, error));
}

export function fetchFavicon(url: string) {
	return function(dispatch) {
		
		dispatch(faviconFetchStarted(url));

		postWithData("https://onenoteutilities/AddinServices/api/pageinfo", { address: url })
				.then(function(response) {
				if(response === undefined) {
					dispatch(faviconFetchFailed("No favicon found", url));
					return;
				}
				const error = response.Error;
				const faviconData = response.FaviconData;
				const faviconMime = response.FaviconMime;
				const title = response.Title;
				const resultUrl = response.ResultUrl;
				const faviconUrl = response.FaviconUrl;

				if(error !== "") {
					dispatch(faviconFetchFailed(error, url));
					console.log(error);
					return;
				}
				
				dispatch(faviconFetchCompleted(url, faviconData, faviconMime, title, resultUrl, faviconUrl));

				// if(faviconData !== undefined) {
				// 	this.props.onFaviconObtained(faviconData, faviconMime, title);
				// }

			}
			).catch(function(err) {
				console.log("Error when obtaining favicon: ", err);
				dispatch(faviconFetchFailed(err, url));
			});

	}
}