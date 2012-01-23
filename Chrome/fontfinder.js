function fontFinder(info, tab)
{	
	chrome.tabs.sendRequest(tab.id, {method: "getSelection"}, function(response) {
	});
}

var id = chrome.contextMenus.create({"title": "Font Finder", "contexts":["selection"], "onclick": fontFinder});

