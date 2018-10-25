import * as OfficeHelpers from '@microsoft/office-js-helpers';

export async function dumpPage() {
    try {
        await OneNote.run(async context => {

            var page = context.application.getActivePage();

            page.load("contents");

            await context.sync();

            console.log("Page contains " + page.contents.count + " items");

            for(var i = 0; i < page.contents.count; i++) {
                
                page.contents.load("items");
                await context.sync();

                                
                console.log(`[${i}] : ${page.contents.items[i].type}`);
                
                if(page.contents.items[i].type == 'Outline') {
                    
                    const item = page.contents.items[i];                    
                    item.load("outline");
                    
                    
                    await context.sync();                    

                    const outline = item.outline;

                    outline.load("paragraphs");

                    console.log("before sync paragraphs")

                    await context.sync();

                    console.log("after sync paragraphs")

                    console.log(`outline ${i} contains ${outline.paragraphs.count} paragraphs`);

                    console.log("after log paragraphs")

                    for (var j = 0; j < outline.paragraphs.count; j++) {
                        var para = outline.paragraphs.items[j];

                        para.load("richText");

                        await context.sync();

                        var rich = para.richText;

                        var html = rich.getHtml();

                        await context.sync();

                        console.log(`outline ${i} paragraph ${j}: ${html.value}`);
                    }
                }
            }
            
            return context.sync();
        });
    } catch (error) {
        OfficeHelpers.UI.notify(error);
        OfficeHelpers.Utilities.log(error);
    };
}



function each<T>(obj: Array<T>, callback) {
    var value, i = 0,
        length = obj.length;
       
    
    for (; i < length; i++) {
        value = callback.call(obj[i], i, obj[i]);

        if (value === false) {
            break;
        }
    }
       
    return obj;
}



export async function dumpParagraphs() {
    OneNote.run(function (context) {

        // Get the collection of pageContent items from the page.
        var pageContents = context.application.getActivePage().contents;
    
        // Get the first PageContent on the page, and then get its outline's paragraphs.
        var outlinePageContents = [];
        var paragraphs = [];
        var richTextParagraphs = [];
        console.log("before load id, type");
        // Queue a command to load the id and type of each page content in the outline.
        pageContents.load("id,type");
    
        // Run the queued commands, and return a promise to indicate task completion.
        return context.sync()
            .then(function () {
                console.log("after first sync");

                // Load all page contents of type Outline
                each(pageContents.items, function(index, pageContent) {
                    if(pageContent.type == 'Outline')
                    {
                        pageContent.load('outline,outline/paragraphs,outline/paragraphs/type');
                        outlinePageContents.push(pageContent);
                    }
                });
                return context.sync();
            })
            .then(function () {
                console.log("after second then");
                // Load all rich text paragraphs across outlines
                each(outlinePageContents, function(index, outlinePageContent) {
                    var outline = outlinePageContent.outline;
                    paragraphs = paragraphs.concat(outline.paragraphs.items);
                });
                each(paragraphs, function(index, paragraph) {
                    if(paragraph.type == 'RichText')
                    {
                        richTextParagraphs.push(paragraph);
                        paragraph.load("id,richText/text");
                    }
                });
                return context.sync();
            })
            .then(function () {
                // Display all rich text paragraphs to the console
                each(richTextParagraphs, function(index, richTextParagraph) {
                    var richText = richTextParagraph.richText;
                    console.log(
                        "Paragraph found with richtext content : " + 
                        richText.text + " and richtext id : " + richText.id);
                });
                return context.sync();
            });
    })
    .catch(function(error) {
        console.log("Error: " + error);
        if (error instanceof OfficeExtension.Error) {
            console.log("Debug info: " + JSON.stringify(error.debugInfo));
        }
    }); 
}

