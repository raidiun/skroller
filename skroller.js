var skroller = {
	
	logScroll:	function() {
					console.log(document.body.scrollTop);
					},
	
	init:		function() {
					var skrollables = document.getElementsByClassName("skrollSpecial");
					var currentScroll = document.body.scrollTop;
					skroller.specialScrollElements = [];
					
					for(var idx=0, l=skrollables.length;idx<l;idx++) {
						var newSkrollable = {};
						
						newSkrollable.elem = skrollables[idx];
						newSkrollable.opts = skroller.getOpts(skrollables[idx]);
						newSkrollable.vals = [];
						
						for(entry in newSkrollable.opts) {
							if(/[0-9]/.test(entry)) {
								newSkrollable.vals.push(entry);
								}
							}
						
						skroller.specialScrollElements.push(newSkrollable);
						}
					skroller.update();
					},
	
	addElem:	function(newElement) {
					newSkrollable.elem = elem;
					newSkrollable.opts = skroller.getOpts(elem);
					newSkrollable.vals = [];
		
					for(entry in newSkrollable.opts) {
						if(/[0-9]/.test(entry)) {
							newSkrollable.vals.push(entry);
							}
						}
		
					skroller.specialScrollElements.push(newSkrollable);
					},
	
	update:		function() {
					//Updates all relevant elements
					var currentScroll = window.pageYOffset;
					var wSkr;
					
					for(var idx=0, l=skroller.specialScrollElements.length;idx<l;idx++) {
						wSkr = skroller.specialScrollElements[idx];
						skroller.calcVals(wSkr,currentScroll);
						}
					},
	
	parseStyle:	function(styleStr) {
					styleStr = styleStr.slice(1,-1);
					var styleStrArr = styleStr.split(";");
					var styleObj = {}, styleOptStrSplit;
		
					for(var idx=0, l=styleStrArr.length;idx<l;idx++) {
						if(styleStrArr[idx] != "") {
							styleOptStrSplit = (styleStrArr[idx]).split(":");
							styleObj[styleOptStrSplit[0]] = skroller.uNumPair(styleOptStrSplit[1]);
							}
						}
					return(styleObj);
					},
	
	uNumPair:	function(inputString) {
					var uNumPairObject = {};
					if((/rgba/).test(inputString)) {//This and the following don't really need to be regex as will always be at start of string...
						var array = inputString.split(",");
						array[0] = (array[0]).slice(5);
						array[3] = (array[3]).slice(0,-1);
						
						uNumPairObject.unit = 'rgba';//hex, rgba, else literal unit
						uNumPairObject.r = Number(array[0]);
						uNumPairObject.g = Number(array[1]);
						uNumPairObject.b = Number(array[2]);
						uNumPairObject.a = Number(array[3]);
						return(uNumPairObject);
						}
					else {
						if((/#/).test(inputString)) {
							uNumPairObject.unit = 'hex';//hex, rgba, else literal unit
							uNumPairObject.r = parseInt("0x" + inputString.slice(1,3));
							uNumPairObject.g = parseInt("0x" + inputString.slice(3,5));
							uNumPairObject.b = parseInt("0x" + inputString.slice(5));
							return(uNumPairObject);
							}
						else {
							uNumPairObject.unit = inputString.replace(/[0-9\.\-]/g,"");//hex, rgba, else literal unit
							uNumPairObject.value = inputString.replace(/[^0-9\.\-]/g,"");
							return(uNumPairObject);
							}
						}
					},
	
	getOpts:	function(element) {
					//Parses options from the data-skroller attribute
					var regexSemiColon = /;(?![^\(]*\))/g;//Matches any semicolon not contained in parentheses
				    var regexFullColon = /:(?![^\(]*\))/g;//Matches any colon not contained in parentheses
					var optionString = element.getAttribute("data-skroller");
				    var skrOptionsStrs;
				    var skrOptions = {};
					
					skrOptionsStrs = optionString.split(regexSemiColon);
					
					for (var idx=0, l = skrOptionsStrs.length; idx<l; idx++) {
						var splitStr = skrOptionsStrs[idx].split(regexFullColon);
					    if((splitStr[0])[-1] == '%') {//If last value is a '%', is a style with relative scroll
						    splitStr[0] = skroller.getRScroll(splitStr[0]);
							}
					    skrOptions[splitStr[0]] = splitStr[1];
						}
											   
				    for(option in skrOptions) {
						if ((/\b[0-9]+\b/).test(option)) { //If option consists of only digits, next associated value is a style
						    skrOptions[option] = skroller.parseStyle(skrOptions[option]);
							}
					    else {
						    //skrOptions[option] = skroller.uNumPair(skrOptions[option]);
							}
						}
				    return(skrOptions);
					},
	
    getRScroll:	function(optionScrollValue) {
				    var fullHeight = window.innerHeight;
				    var oSVNumeric = Number(optionScrollValue.slice(0,-1));
				    return((oSVNumeric/100)*fullHeight);
					},
											   
	transitionType:	{
					linear:		0,
					quadratic:	1,
					cubic:		2
					},
	
	getParam:	function(wSkr,transitionType) {
					//The effect parameter is a measure of the proportion of the element that is past the centre of the viewport
					//With respect to a mono-effect system (callType = mono), 0-1 is over the length of the element
					//With respect to a bi-effect system (callType = bidi)
					//In this case the parameter varies from 0-1-0 over the element
		
					var elemBCR = wSkr.elem.getBoundingClientRect();
					var elemHeight = elemBCR.bottom - elemBCR.top;
					var distOfTopAboveMedian = (window.innerHeight/2) - elemBCR.top;
					var param;
		
					if(callType === skroller.callType.mono) {
						param = distOfTopAboveMedian/elemHeight;
						}
					if(callType === skroller.callType.bidi) {
						if(distOfTopAboveMedian>(elemHeight/2)) {
							param = 2 - ((2*distOfTopAboveMedian)/elemHeight);
							}
						else {
							param = (2*distOfTopAboveMedian)/elemHeight;
							}
						}
		
		
					if(param<0) {return(0);}
					else {
						if(param>1) {return(1);}
						else {return(param);}
						}
					},
				
	calcVals:	function(wSkr,currentScroll) {
				    var idx = 0;
				    var valsList = wSkr.vals;
				    if(currentScroll<=valsList[idx]) {//Element takes initial values
					    skroller.setStyle(wSkr,wSkr.opts[valsList[idx]]);
						}
				    else {
					    if(currentScroll>=valsList[(valsList.length)-1]) {//Element takes last values
						    skroller.setStyle(wSkr,wSkr.opts[valsList[(valsList.length)-1]]);
							}
					    else {
							while(currentScroll>Number(valsList[idx+1])) {
								idx++;
								}
						    var gap = valsList[idx+1] - valsList[idx];
						    var distIntoGap = currentScroll - valsList[idx];
						    var style = skroller.blendStyles(wSkr.opts[valsList[idx]],wSkr.opts[valsList[idx+1]],(distIntoGap/gap));
						    skroller.setStyle(wSkr,style);
							}
						}
					},
	
	blendStyles:function(style1,style2,blendFactor) {
				    var blendedStyle = {};
				    for(entry in style1) {
					    blendedStyle[entry] = {};
					    for(part in style1[entry]) {
							if(part != "unit") {
								var partGap = (style2[entry])[part] - (style1[entry])[part];
								(blendedStyle[entry])[part]  = Number((style1[entry])[part]) + (partGap*blendFactor);
								}
							if(part == 'r' || part == 'g' || part == 'b') {
							    (blendedStyle[entry])[part] = Math.round((blendedStyle[entry])[part]);
								}
							}
					    (blendedStyle[entry])["unit"] = (style1[entry])["unit"];
					    }
					return(blendedStyle);
				    },
	
    setStyle:	function(wSkr,style) {
				    for(attribute in style) {
					    wSkr.elem.style[attribute] = skroller.attrToStr(style[attribute]);
						}
					},
	
   attrToStr:	function(attributeVal) {
				    switch(attributeVal.unit) {
					   case 'hex':
						   return("#" + attributeVal.r.toString(16) + attributeVal.g.toString(16) + attributeVal.b.toString(16));
					   case 'rgba':
						   return("rgba(" + attributeVal.r + "," + attributeVal.g + "," + attributeVal.b + "," + attributeVal.a + ")");
					   default:
						   return(attributeVal.value + attributeVal.unit);
					   }
					}
	};