function fontFinder()
{
	
	var selectionParentNodeElementID = '';

	selection = window.getSelection();

	mousedownContainer = selection.anchorNode;
	mouseupContainer = selection.focusNode;

	selectionString = selection.toString();
	selectionLength = selectionString.length;
	var intSelectionAnchorOffset = selection.anchorOffset;
	var intSelectionFocusOffset = selection.focusOffset;

	childNodeOfParentNodeForAnchorToSeek = mouseupContainer;
	parentNodeForAnchor = mouseupContainer.parentNode;
	parentNodeTagName = parentNodeForAnchor.nodeName;


	if(parentNodeForAnchor.hasAttribute("ID")) {
		selectionParentNodeElementID = parentNodeForAnchor.getAttribute("ID");
		element = document.getElementById(selectionParentNodeElementID);
	} else {
		var arrDocumentGetElementsByTagName = document.getElementsByTagName(parentNodeTagName);
		elementsloop:for(var i=0; i<arrDocumentGetElementsByTagName.length; i++) {
			childnodesloop:for(var j=0; j<arrDocumentGetElementsByTagName[i].childNodes.length; j++) {
				if(arrDocumentGetElementsByTagName[i].childNodes[j] == childNodeOfParentNodeForAnchorToSeek) {
					//parentNodeIndex = i;
					//selectionThisNodeIndex = j;
					element = document.getElementsByTagName(parentNodeTagName)[i];
					break elementsloop;
				}
			}
		}
	}

	// SET ALL VARIABLES


	// Colors
	fontColorRGB = getstyle(element,'color');
	fontColorHex = getColor(fontColorRGB);
	fontBgColorRGB = getstyle(element,'background-color');
	if (fontBgColorRGB != 'transparent') {
		fontBgColorHex = "background-color: #" + getColor(fontBgColorRGB) + "\n";
	} else {
		fontBgColorHex = "";
	}

	if(selectionLength == 0) {
		alert("Nothing selected!");
		return false;
	} else if(mousedownContainer != mouseupContainer) {
		alert("You have selected multiple elements - Please select a single element and try again.");
		return;
	}


	// Font
	fontFamily = getstyle(element,'font-family');
	fontSize = roundAndRemove(getstyle(element,'font-size'));

	// Spacing
	lineHeight = getstyle(element,'line-height');
	if (lineHeight != 'normal') {
		lineHeightEM = roundAndRemove(lineHeight);
		lineHeightEM = lineHeightEM / fontSize;
		lineHeightEM = roundTwoPlaces(lineHeightEM);
		lineHeightPX = roundAndRemove(lineHeight);
		lineHeight = lineHeightEM + "em (" + lineHeightPX + "px)";
	}

	verticalAlign = getstyle(element,'vertical-align');
	letterSpacing = getstyle(element,'letter-spacing');
	wordSpacing = getstyle(element,'word-spacing');

	// Decoration \ Transformation

	fontWeight = getstyle(element,'font-weight');
	if (fontWeight == "400") {
		fontWeight = "normal";
	}
	if (fontWeight == "401") {
		fontWeight = "bold";
	}

	fontStyle = getstyle(element,'font-style');
	fontVariant = getstyle(element,'font-variant');
	textTransform = getstyle(element,'text-transform');
	textDecoration = getstyle(element,'text-decoration');
	textAlign = getstyle(element,'text-align');
	textIndent = getstyle(element,'text-indent');

	// Element Details
	elementName = parentNodeTagName.toLowerCase();
	elementID = selectionParentNodeElementID;
	if (elementID == '') {
		elementID = "Not Applicable";
	}
	elementClass = parentNodeForAnchor.getAttribute("CLASS");
	if (!elementClass) {
		elementClass = "Not Applicable";
	}
	var detective = new Detector()
	var fonts = fontFamily.split(',');
	var fontRendered = '';
	for (var i=0; i < fonts.length; i++) {
		if (!fontRendered) {
			if(detective.test(fonts[i])) {
				fontRendered = fonts[i];
			}
		}
	};
	if (!fontRendered) { fontRendered = 'System Default'; }




	// CREATE ALERT BOX
	alert(
	"Color\n" +
	"===============================\n" + 
	"color: #" + fontColorHex + "\n" +
	"color: " + fontColorRGB + "\n" +
	fontBgColorHex + 
	"background-color: " + fontBgColorRGB + "\n\n" +
	"Font\n" +
	"===============================\n" + 
	"font-family (stack): " + fontFamily + "\n" +
	"Font being rendered: " + fontRendered + "\n" +
	"font-size: " + fontSize + "px\n\n" +
	"Spacing\n" +
	"===============================\n" + 
	"line-height: " + lineHeight + "\n" +
	"vertical-align: " + verticalAlign + "\n" + 
	"letter-spacing: " + letterSpacing + "\n" +
	"word-spacing: " + wordSpacing + "\n\n" + 
	"Decoration \\ Transformation\n" +
	"===============================\n" + 
	"font-weight: " + fontWeight + "\n" +
	"font-style: " + fontStyle + "\n" + 
	"font-variant: " + fontVariant + "\n" + 
	"text-transform: " + textTransform + "\n" + 
	"text-decoration: " + textDecoration + "\n" + 
	"text-align: " + textAlign + "\n" + 
	"text-indent: " + textIndent + "\n\n" + 
	"Element Details\n" +
	"===============================\n" + 
	"Element Type: <" + elementName + ">\n" + 
	"Element ID: " + elementID + "\n" +
	"Element Class: " + elementClass + "\n"
	);
}

var Detector = function(){
	var h = document.getElementsByTagName("BODY")[0];
	var d = document.createElement("DIV");
	var s = document.createElement("SPAN");
	d.appendChild(s);
	d.style.fontFamily = "sans";
	s.style.fontFamily = "sans";
	s.style.fontSize   = "72px";
	s.innerHTML        = "mmmmmmmmmmlil";
	h.appendChild(d);
	var defaultWidth   = s.offsetWidth;	
	var defaultHeight  = s.offsetHeight;
	h.removeChild(d);
	function debug(font) {
		h.appendChild(d);
		var f = [];
		f[0] = s.style.fontFamily = font;	
		f[1] = s.offsetWidth;				
		f[2] = s.offsetHeight;				
		h.removeChild(d);
		font = font.toLowerCase();
		if (font == "serif") {
			f[3] = true;
		} else {
			f[3] = (f[1] != defaultWidth || f[2] != defaultHeight);
		}
		return f;
	}
	function test(font){
		f = debug(font);
		return f[3];
	}
	this.detailedTest = debug;
	this.test = test;	
};

function getstyle(element,style)
{
	return document.defaultView.getComputedStyle(element,null).getPropertyValue(style);
}

function RGBtoHex(R,G,B) 
{
	return toHex(R)+toHex(G)+toHex(B)
}

function toHex(N) 
{
	if (N==null) return "XX";
	N=parseInt(N); 
	if (N==0 || isNaN(N)) return "00";
	N=Math.max(0,N); N=Math.min(N,255); N=Math.round(N);
	return "0123456789ABCDEF".charAt((N-N%16)/16) + "0123456789ABCDEF".charAt(N%16);
}

function removeSpaces(string) 
{
	var tstring = "";
	string = '' + string;
	splitstring = string.split(" ");
	for(i = 0; i < splitstring.length; i++)
	tstring += splitstring[i];
	return tstring;
}

function getColor(string)
{
	string = string.substring(4);
	stringLength = string.length - 1;
	string = string.substring(0,stringLength);
	string = removeSpaces(string);
	string = string.split(',');
	string = RGBtoHex(string[0],string[1],string[2])
	return string;
}

function roundTwoPlaces(string)
{
	result = Math.round(string*100)/100;
	return result;
}

function removePX(string)
{
	result = string.substring(0,string.length - 2);
	return result;
}

function roundAndRemove(string)
{
	result = removePX(string);
	result = roundTwoPlaces(result);
	return result;
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if (request.method == "getSelection") {
		fontFinder();
	}
});

