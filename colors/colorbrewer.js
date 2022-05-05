var schemeNames = {sequential: ["BuGn","BuPu","GnBu","OrRd","PuBu","PuBuGn","PuRd","RdPu","YlGn","YlGnBu","YlOrBr","YlOrRd"],
					singlehue:["Blues","Greens","Greys","Oranges","Purples","Reds"],
					diverging: ["BrBG","PiYG","PRGn","PuOr","RdBu","RdGy","RdYlBu","RdYlGn","Spectral"],
					qualitative: ["Accent","Dark2","Paired","Pastel1","Pastel2","Set1","Set2","Set3"],
					tidyquant: ["Dark", "Green", "Light"],
					awtools: ["ppalette", "bpalette", "mpalette", "spalette", "a_palette", "names"],
					ggsci1: ["nrc_npg","default_aaas","default_nejm","lanonc_lancet","default_jama","default_jco","default_ucscgb","category10_d3","category20_d3","category20b_d3","category20c_d3","default_igv","default_locuszoom","default_uchicago","light_uchicago","dark_uchicago","hallmarks_dark_cosmic","hallmarks_light_cosmic","signature_substitutions_cosmic","springfield_simpsons"],
					ggsci2: ["planetexpress_futurama","schwifty_rickandmorty","uniform_startrek","legacy_tron","default_gsea","red_material","pink_material","deep_purple_material","indigo_material","blue_material","light_blue_material","teal_material","green_material","light_green_material","lime_material","amber_material","orange_material","deep_orange_material","brown_material","blue_grey_material"],
					scico1: ["acton","bam","bamako","bamO","batlow","batlowK","batlowW","berlin","bilbao","broc","brocO","buda","bukavu","cork","corkO","davos","devon","fes","grayC","hawaii"],
					scico2: ["imola","lajolla","lapaz","lisbon","nuuk","oleron","oslo","roma","romaO","tofino","tokyo","turku","vanimo","vik","vikO"],
					rcartocolor1: ["ag_Sunset","ag_GrnYl","Tropic","Temps","TealRose","Geyser","Fall","Earth","ArmyRose","Vivid","Safe","Prism","Pastel","Bold","Antique","TealGrn","Teal","SunsetDark","Sunset","RedOr"], 
					rcartocolor2: ["PurpOr","Purp","PinkYl","Peach","OrYel","Mint","Magenta","Emrld","DarkMint","BurgYl","Burg","BrwnYl","BluYl","BluGrn"],
					yarrr: ["basel","pony","xmen","decision","southpark","eternal","evildead","usualsuspects","ohbrother","appletv","brave","bugs","cars","nemo","rat","up","espresso","ipod","info","info2"],
					wesanderson: ["BottleRocket1","BottleRocket2","Rushmore1","Rushmore","Royal2","Zissou1","Darjeeling1","Darjeeling2","FantasticFox1","Moonrise3","Cavalcanti1","IsleofDogs1","IsleofDogs2"],
					beyonce1: ["X1","X2","X3","X5","X6","X11","X12","X18","X23","X28","X33","X35","X37","X38","X39","X40","X41","X43","X44","X46"],
					beyonce2: ["X47","X48","X49", "X50","X51","X52","X54","X55","X56","X58","X59","X70","X72","X74","X75","X79","X80","X90","X92","X93"],
					beyonce3: ["X101","X102","X103","X104","X105","X108","X109","X111","X115","X117","X118","X121","X122","X123","X125","X126","X127","X128","X129","X130"]};

var visibleMap,
	selectedScheme = "Set2",
	numClasses = 5;

$("#num-classes").change(function(){
	setNumClasses($(this).val());
});
$(".scheme-type").change(function(){
	setSchemeType($(this).attr("id"));
});
$("#color-system").change(updateValues);
$("#layers input").change(layerChange);
$("#filters input").change(showSchemes);

$("#transparency-slider").mousedown(function(){
	var max = $("#transparency-track").width();
	var handle = $(this);
	function handleMove(e){
		var l = Math.max(3,3+Math.min(e.pageX - $("#transparency-track").offset().left,max));
		handle.css("left",l);
		$("#county-map g").css("opacity",1-(l-4)/max);
	};
	function handleUp(){
		$(document).off( "mousemove",handleMove );
		$(document).off( "mouseup",handleUp );
	};
	$(document).on( "mousemove",handleMove );
	$(document).on( "mouseup",handleUp );
});

$("#road-color").spectrum({
	color: "#f33",
	showInput:true,
	change: function(color){
		if ( !$("#overlays").children().length ) return;
		$("#road-lines").css("stroke",color.toHexString());
	}
});
$("#city-color").spectrum({
	color: "#000",
	showInput:true,
	change: function(color){
		if ( !$("#overlays").children().length ) return;
		$("#cities").css("fill",color.toHexString());
	}
});
$("#border-color").spectrum({
	color: "#000",
	showInput:true,
	change: function(color){
		$("#county-map g").css("stroke",color.toHexString());
	}
});
$("#bg-color").spectrum({
	color: "#fff",
	showInput:true,
	change: function(color){
		$("#county-map rect").css("fill",color.toHexString());
	}
});

$("#terrain, #solid-color").change(function(){
	if ( $("#terrain").is(":checked") ){
		if ( !$("#terrain-img").length ) $("#map-container").prepend( $("<img id='terrain-img' src='map/terrain.jpg' />").css("left",-31).css("top",-58) );
		$("#county-map rect").css("opacity",0);
		if ( $("#transparency-slider").position().left < 4 ){
			$("#transparency-slider").css("left",$("#transparency-track").position().left + 43);
			$("#county-map g").css("opacity",.5);
		}
	} else {
		$("#county-map rect").css("opacity",1);
		if ( $("#transparency-slider").position().left == $("#transparency-track").position().left + 43 ){
			$("#transparency-slider").css("left",3);
			$("#county-map g").css("opacity",1);
		}
	}
});


function setNumClasses(n)
{
	numClasses = n;
	showSchemes();
}

var selectedSchemeType;
function setSchemeType(type)
{
	selectedSchemeType = type;

	$( "#num-classes option" ).removeAttr( "disabled" );
	switch( selectedSchemeType )
	{
		case "sequential":
			if( $( "#num-classes" ).val() >= 10 )
			{
				$( "#num-classes" ).val( 9 );
				numClasses = 9;
			}
			$( "#num-classes option[name=10], #num-classes option[name=11], #num-classes option[name=12], #num-classes option[name=16], #num-classes option[name=31], #num-classes option[name=34], #num-classes option[name=51]" ).attr( "disabled", "disabled" );
			break;
		case "diverging":
			if( $( "#num-classes" ).val() >= 12 )
			{
				$( "#num-classes" ).val( 11 );
				numClasses = 11;
			}
			$( "#num-classes option[name=12], #num-classes option[name=16], #num-classes option[name=31], #num-classes option[name=34], #num-classes option[name=51]" ).attr( "disabled", "disabled" ).attr( "disabled", "disabled" );
			break;
		case "qualitative":
			if( $( "#num-classes" ).val() >= 13 )
			{
				$( "#num-classes" ).val( 12 );
				numClasses = 12;
			}
			$( " #num-classes option[name=16], #num-classes option[name=31], #num-classes option[name=34], #num-classes option[name=51]" ).attr( "disabled", "disabled" ).attr( "disabled", "disabled" );
			break;
		case "tidyquant":
			if( $( "#num-classes" ).val() >= 13 )
			{
				$( "#num-classes" ).val( 12 );
				numClasses = 12;
			}
			$( "#num-classes option[name=16], #num-classes option[name=31], #num-classes option[name=34], #num-classes option[name=51]" ).attr( "disabled", "disabled" ).attr( "disabled", "disabled" );
			break;
		case "awtools":
			if( $( "#num-classes" ).val() >= 17 )
			{
				$( "#num-classes" ).val( 16 );
				numClasses = 16;
			}
			$( "#num-classes option[name=31], #num-classes option[name=34], #num-classes option[name=51]" ).attr( "disabled", "disabled" ).attr( "disabled", "disabled" );
			break;
	}
	showSchemes();
}

function showSchemes()
{
	$("#ramps").empty();
	for ( var i in schemeNames[selectedSchemeType]){
		if ( checkFilters(schemeNames[selectedSchemeType][i]) == false ) continue;
		var ramp = $("<div class='ramp "+schemeNames[selectedSchemeType][i]+"'></div>"),
			svg = "<svg width='15' height='75'>";
		for ( var n = 0; n < 5; n++ ){
			svg += "<rect fill="+colorbrewer[schemeNames[selectedSchemeType][i]][5][n]+" width='15' height='15' y='"+n*15+"'/>";
		}
		svg += "</svg>";
		$("#ramps").append(ramp.append(svg).click( function(){
			if ( $(this).hasClass("selected") ) return;
			setScheme( $(this).attr("class").substr(5) );
		}));
	}
	if ( selectedSchemeType == "sequential" ){
		$("#scheme1").css("width","160px");
		$("#multi").show().text("Multi-hue:");
		$("#scheme2").css("width","90px");
		$("#single").show().text("Single hue:");

		$("#singlehue").empty().css("display","inline-block");
		for ( i in schemeNames.singlehue){
			if ( checkFilters(schemeNames.singlehue[i]) == false ) continue;
			var ramp = $("<div class='ramp "+schemeNames.singlehue[i]+"'></div>"),
				svg = "<svg width='15' height='75'>";
			for ( var n = 0; n < 5; n++ ){
				svg += "<rect fill="+colorbrewer[schemeNames.singlehue[i]][5][n]+" width='15' height='15' y='"+n*15+"'/>";
			}
			svg += "</svg>";
			$("#singlehue").append(ramp.append(svg).click( function(){
				if ( $(this).hasClass("selected") ) return;
				setScheme( $(this).attr("class").substr(5) );
			}));
		}
	} else {
		$("#scheme1").css("width","100%");
		$("#multi").hide();
		$("#singlehue").empty();
		$("#single").hide();
	}

	$(".score-icon").show();
	$("#color-system").show();
	if ( $(".ramp."+selectedScheme)[0] ){
		setScheme( selectedScheme );
	} else if ( $("#ramps").children().length ) setScheme( $("#ramps .ramp:first-child").attr("class").substr(5) );
	else clearSchemes();
}

function clearSchemes()
{
	$("#counties g path").css("fill","#ccc");
	$("#color-chips").empty();
	$("#color-values").empty();
	$("#ramps").css("width","100%");
	$("#scheme-name").html("");
	$(".score-icon").hide();
	$("#color-system").hide();
	$("#ramps").append("<p>No color schemes match these criteria.</p><p>Please choose fewer data classes, a different data type, and/or fewer filtering options.</p>");
}

function setScheme(s)
{
	$("#county-map g").removeClass(selectedScheme).addClass(s);
	$(".ramp.selected").removeClass("selected");
	selectedScheme = s;
	$(".ramp."+selectedScheme).addClass("selected");
	$("#scheme-name").html(numClasses+"-class "+selectedScheme);
	applyColors();
	drawColorChips();
	$("#permalink").val("https://tidyfriday.cn/colors/?type="+selectedSchemeType+"&scheme="+selectedScheme+"&n="+numClasses);
	window.location.hash = "type="+selectedSchemeType+"&scheme="+selectedScheme+"&n="+numClasses;

	updateValues();

	var cssString = "";
	for ( var i = 0; i < numClasses; i ++ ){
		cssString += "."+selectedScheme+" .q"+i+"-"+numClasses+"{fill:" + colorbrewer[selectedScheme][numClasses][i] + "}";
		if ( i < numClasses - 1 ) cssString += " ";
	}
	$("#copy-css input").val(cssString);

	$(".score-icon").attr("class","score-icon");
	var f = checkColorblind(s);
	$("#blind-icon").addClass( !f ? "bad" : (f == 1 ? "ok" : "maybe") ).attr("title",numClasses+"-class "+selectedScheme + " is " + getWord(f)+"color blind friendly");
	f = checkCopy(s);
	$("#copy-icon").addClass( !f ? "bad" : (f == 1 ? "ok" : "maybe") ).attr("title",numClasses+"-class "+selectedScheme + " is " + getWord(f)+"photocopy friendly");
	f = checkScreen(s);
	$("#screen-icon").addClass( !f ? "bad" : (f == 1 ? "ok" : "maybe") ).attr("title",numClasses+"-class "+selectedScheme + " is " + getWord(f)+"LCD friendly");
	f = checkPrint(s);
	$("#print-icon").addClass( !f ? "bad" : (f == 1 ? "ok" : "maybe") ).attr("title",numClasses+"-class "+selectedScheme + " is " + getWord(f)+"print friendly");

	function getWord(w){
		if ( !w ) return "not ";
		if ( w == 1 ) return "";
		if ( w == 2 ) return "possibly not ";
	}
}

/* function getJSON()
{
	var jsonString = "[";
	for ( var i = 0; i < numClasses; i ++ ){
		jsonString += "'" + colorbrewer[selectedScheme][numClasses][i] + "'";
		if ( i < numClasses - 1 ) jsonString += ",";
	}
	jsonString += "]";

	return jsonString;
} */

function checkFilters(scheme,f)
{
	if ( !colorbrewer[scheme][numClasses] ) return false;
	if ( $("#blindcheck").is(":checked") && checkColorblind(scheme) != 1 ) return false;
	if ( $("#printcheck").is(":checked") && checkPrint(scheme) != 1 ) return false;
	if ( $("#copycheck").is(":checked") && checkCopy(scheme) != 1) return false;
	return true;
}
function checkColorblind(scheme)
{
	return colorbrewer[scheme].properties.blind.length > 1 ? colorbrewer[scheme].properties.blind[numClasses-3] : colorbrewer[scheme].properties.blind[0];
}
function checkPrint(scheme)
{
	return colorbrewer[scheme].properties.print.length > 1 ? colorbrewer[scheme].properties.print[numClasses-3] : colorbrewer[scheme].properties.print[0];
}
function checkCopy(scheme)
{
	return colorbrewer[scheme].properties.copy.length > 1 ? colorbrewer[scheme].properties.copy[numClasses-3] : colorbrewer[scheme].properties.copy[0];
}
function checkScreen(scheme)
{
	return colorbrewer[scheme].properties.screen.length > 1 ? colorbrewer[scheme].properties.screen[numClasses-3] : colorbrewer[scheme].properties.screen[0];
}

function applyColors()
{
	if ( !colorbrewer[selectedScheme][numClasses] ){
		$("#counties g path").css("fill","#ccc");
		return;
	}
	for ( var i = 0; i < numClasses; i++ ){
		if ( $("#borderscheck").is(":checked") ) $("#county-map g .q"+i+"-"+numClasses).css("stroke",colorbrewer[selectedScheme][numClasses][i]);
		$(".q"+i+"-"+numClasses).css("fill",colorbrewer[selectedScheme][numClasses][i]);
	}
}

function drawColorChips()
{
	var svg = "<svg width='20' height='270'>";
	for ( var i = 0; i < numClasses; i++ ){
		svg += "<rect fill="+colorbrewer[selectedScheme][numClasses][i]+" width='20' height='"+Math.min(24,parseInt(265/numClasses))+"' y='"+i*Math.min(24,parseInt(265/numClasses))+"'/>";
	}
	$("#color-chips").empty().append(svg);
	updateValues();
}

function updateValues()
{
	$("#color-values").empty();
	var str = "";
	var s = $("#color-system").val().toLowerCase();
	var jsonString = "";
	$("#color-chips rect").each(function(i){
		var val = ( s == "cmyk" ? getCMYK(selectedScheme,numClasses,i) : getColorDisplay($(this).css("fill")) );
		str += val + "\n";

		var jsonVal = getColorDisplay($(this).css("fill")).replace(/,/g, " ");
		if ( s == "hex" ) {
			jsonString += '"' + jsonVal + '"';
		} else {
			jsonString += '"' + jsonVal + '"';
		}
		if ( s == "hex" ) {
			if ( i < numClasses - 1 ) jsonString += ", ";
		} else {
			if ( i < numClasses - 1 ) jsonString += " ";
		}
	});
	str = str.replace( /\n$/, "" );

	$("#color-values").append("<textarea readonly style='line-height:"+Math.min(24,parseInt(265/numClasses))+"px; height:"+Math.min(24,parseInt(265/numClasses))*numClasses+"px'>"+str+"</textarea>");
	$( "#ase" ).attr( "href", "export/ase/" + selectedScheme + "_" + numClasses + ".ase" );
	$( "#gpl" ).attr( "href", "export/gpl/" + selectedScheme + "_" + numClasses + ".gpl" );
	$("#copy-json input").val(jsonString);
}

function getColorDisplay(c,s)
{
	if ( c.indexOf("#") != 0 ){
		var arr = c.replace(/[a-z()\s]/g,"").split(",");
		var rgb = {r:arr[0],g:arr[1],b:arr[2]};
	}
	s = s || $("#color-system").val().toLowerCase();
	if ( s=="hex" ){
		if ( rgb ) return rgbToHex(rgb.r,rgb.g,rgb.b);
		return c;
	}
	if ( s=="rgb" || s=="cmyk" ){
		if (!rgb) rgb = hexToRgb(c);
		return rgb.r + "," + rgb.g + "," + rgb.b;
	}

}
function getCMYK( scheme, classes, n ){
	return cmyk[scheme][classes][n].toString();
}
var highlight;
$("#counties").svg({
	loadURL: "map/map.svg",
	onLoad: function(){
		$("#counties svg")
			.attr("id","county-map")
			.attr("width",756)
			.attr("height",581);
		$("#map-container").css("background-image","none");
		init();
		$("#counties path").mouseover(function(){
			var c = $(this).css("fill");
			var cl = $(this).attr("class").match(new RegExp("q[0-9]+-"+numClasses))[0];
			cl = parseInt(cl.substring(cl.indexOf("q")+1,cl.indexOf("-"))) + 1;
			$("#probe").empty().append(
				"<p>"+selectedScheme+" class " + cl +"<br/>"+
				"RGB: " + getColorDisplay(c,"rgb")+"<br/>"+
				"CMYK: " + getCMYK(selectedScheme,numClasses,cl-1)+"<br/>"+
				"HEX: " + getColorDisplay(c,"hex")+"</p>"
			);
			highlight = $(this).clone().css({"pointer-events":"none","stroke":"#000","stroke-width":"2"}).appendTo("#county-map g");
			$("#probe").show();
		});
		$("#counties path").mousemove(function(e){
			$("#probe").css({left: Math.min(920,e.pageX - $("#wrapper").offset().left + 10), top: e.pageY - $("#wrapper").offset().top - 75 });
		});
		$("#counties path").mouseout(function(){$("#probe").hide();highlight.remove();});
	}
});

function init()
{
	var type = getParameterByName("type") || "qualitative";
	var scheme = getParameterByName("scheme") || "Set2";
	var n = getParameterByName("n") || 5;
	$("#"+type).prop("checked",true);
	$("#num-classes").val(n);
	setSchemeType(type);
	setNumClasses(n);
	setScheme(scheme);
}

function layerChange()
{
	switch( $(this).attr("id") ){
		case "roadscheck":
		if ( $(this).is(":checked") ){
			if ( !$("#overlays").children().length )
				loadOverlays("roads");
			else
				$("#roads").show();
		} else {
			$("#roads").hide();
		}
		break;

		case "citiescheck":
		if ( $(this).is(":checked") ){
			if ( !$("#overlays").children().length )
				loadOverlays("cities");
			else
				$("#cities").show();
		} else {
			$("#cities").hide();
		}
		break;

		case "borderscheck":
		if ($(this).is(":checked")) $("#county-map g").children().css({"stroke":"inherit","stroke-width":"0.50"});
		else {
			var i=numClasses; while(i--){
				$("#county-map g .q"+i+"-"+numClasses).css({"stroke":colorbrewer[selectedScheme][numClasses][i],"stroke-width":"1"});
			}
		}
	}
}

function loadOverlays(o)
{
	$("#overlays").svg({
		loadURL: "map/overlays.svg",
		onLoad: function(){
			$("#overlays svg").attr("width",756).attr("height",581);
			if ( o == "cities" ) $("#roads").hide();
			else $("#cities").hide();
			$("#cities").css("fill",$("#city-color").spectrum("get").toHexString());
			$("#road-lines").css("stroke",$("#road-color").spectrum("get").toHexString());
		}
	});
}
$(".learn-more, #how, #credits, #downloads").click(function(e){
	e.stopPropagation();
	var page;
	switch( $(this).attr("id") ){
		case "number-learn-more":
		$("#learnmore-title").html("NUMBER OF DATA CLASSES");
		page = "number.html";
		break;

		case "schemes-learn-more":
		$("#learnmore-title").html("TYPES OF COLOR SCHEMES");
		page = "schemes.html";
		break;

		case "filters-learn-more":
		$("#learnmore-title").html("USABILITY ICONS");
		page = "usability.html";
		break;

		case "how":
		$("#learnmore-title").html("HOW TO USE: MAP DIAGNOSTICS");
		page = "howtouse.html";
		break;

		case "credits":
		$("#learnmore-title").html("CREDITS");
		page = "credits.html";
		break;

		case "downloads":
		$("#learnmore-title").html("DOWNLOADS");
		page = "downloads.html";
		break;

		case "context-learn-more":
		$("#learnmore-title").html("MAP CONTEXT and BACKGROUND");
		page = "context.html";
		break;
	}
	if ( page ){
		$("#learnmore #content").load("learnmore/"+page,function(){
			$("#learnmore").show().css("margin-top",($("#wrapper").height()/2-$("#learnmore").height()/2));
		});
		$("#mask").show();
	}
});
$("#learnmore #close, #mask").click(function(){
	$("#learnmore #content").empty();
	$("#learnmore, #mask").hide();
});

$( "#export #tab" ).toggle(
	function(){
		$( "#export" ).animate( { "left" : "265px" } );
	},
	function(){
		$( "#export" ).animate( { "left" : "0px" } );
	})

function rgb2cmyk (r,g,b) {
	var computedC = 0;
	var computedM = 0;
	var computedY = 0;
	var computedK = 0;

	// BLACK
	if (r==0 && g==0 && b==0) {
	computedK = 1;
	return [0,0,0,100];
	}

	computedC = 1 - (r/255);
	computedM = 1 - (g/255);
	computedY = 1 - (b/255);

	var minCMY = Math.min(computedC,
			  Math.min(computedM,computedY));
	computedC = (computedC - minCMY) / (1 - minCMY) ;
	computedM = (computedM - minCMY) / (1 - minCMY) ;
	computedY = (computedY - minCMY) / (1 - minCMY) ;
	computedK = minCMY;

	return [Math.round(computedC*100),Math.round(computedM*100),Math.round(computedY*100),Math.round(computedK*100)];
}
function rgbToHex(r, g, b) {
    return "#" + ( (1 << 24) | (r << 16) | (g << 8) | b ).toString(16).slice(1);
}
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function getParameterByName(name)
{
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&#]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.href);
  if(results == null)
    return null;
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}
