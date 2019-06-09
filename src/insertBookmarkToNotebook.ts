import * as OfficeHelpers from '@microsoft/office-js-helpers';

const insertBookmarkToNotebook = async (link: string, title: string, faviconData: string, faviconMime: string) => {  

	try {
		await OneNote.run(async context => {
			
		   var page = context.application.getActivePage();
			
			page.load("contents");                

			await context.sync();                

			// console.log("outlines: " + page.contents.items.length) ;
			// console.log("page rest api id: " + restApiId.value) ;

			page.contents.load("outline");

			await context.sync();    

			// getting active outline does not work since at the time of clicking the Insert button in our addin,
			// the notebook does not have a focus. This can be a bug in the Office Addin API.
			// For now we just pick the first outline
			const outline = page.contents.items[0].outline;
							
			//console.log("outline id is " + outline.id);
			//outline.load("paragraphs");
			//data:${imageMimeType};base64,${image}
			
			outline.appendHtml(
				`<table border=\"0\"><tr><td><img src="data:${faviconMime};base64,${faviconData}" width="16" height="16"></td><td><a href="${link}">${title}</a></td></table>`);			

		  return context.sync();
		});
	} catch(error) {
		OfficeHelpers.UI.notify(error);
		OfficeHelpers.Utilities.log(error);
	};
}

export default insertBookmarkToNotebook