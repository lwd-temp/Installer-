//	Javascript file for the WeatherCenter gadget
//	(c) 2009
//	WeatherCenter Gadget Team
//	Development: hadj 
//	Graphics: Tex
//	Testing: Digital	
////////////////////////////////////////////////////////////////////////




function AccuLoadSettings()
{
	loccode.value = System.Gadget.Settings.read("AlastSearch");
	loccode_id.value = System.Gadget.Settings.read("AlocationCode");

	updateInt[0].disabled = true;
	updateInt[1].checked = "1";
	updateIntValue.value = System.Gadget.Settings.read("AupdateInterval");
	
		
	AccuUnits_makeUnitSelector("ShowParametersOption1");
	AccuUnits_makeUnitSelector("ShowParametersOption2");
	AccuUnits_makeUnitSelector("ShowParametersOption3");
	AccuUnits_makeUnitSelector("ShowParametersOption4");
	
}

/////////////////



function AccuUnits_makeUnitSelector(ShowParametersOption)
{
var unitsArray = [
		{"name":lng_Stats["nothing"], "value":"nothing"},
		{"name":lng_Stats["flik"], "value":"flik"},
		{"name":lng_Stats["wind"], "value":"wind"},
		{"name":lng_Stats["gust"], "value":"gust"},
		{"name":lng_Stats["humidity"], "value":"humidity"},
		{"name":lng_Stats["precipitation"], "value":"precipitation"},
		{"name":lng_Stats["thunderstorm"], "value":"thunderstorm"},
		{"name":lng_Stats["pressure"], "value":"pressure"},
		{"name":lng_Stats["pressuretrend"], "value":"pressuretrend"},
		{"name":lng_Stats["visibility"], "value":"visibility"},
		{"name":lng_Stats["uvindex"], "value":"uvindex"},
		{"name":lng_Stats["uvlevel"], "value":"uvlevel"},
		{"name":lng_Stats["sunrise"], "value":"sunrise"},
		{"name":lng_Stats["sunset"], "value":"sunset"},
		{"name":lng_Stats["moonrise"], "value":"moonrise"},
		{"name":lng_Stats["moonset"], "value":"moonset"},
		{"name":lng_Stats["moonterminator"], "value":"moonterminator"},
		{"name":lng_Stats["latitude"], "value":"latitude"},
		{"name":lng_Stats["longitude"], "value":"longitude"},
		{"name":lng_Stats["airquality"], "value":"airquality"}]


for (i = 0; i < unitsArray.length; i++)
	{
		var sel = document.getElementById(ShowParametersOption);
		var opt = document.createElement("option");
		opt.value = unitsArray[i].value;
		opt.innerHTML = unitsArray[i].name;
		if (unitsArray[i].value == System.Gadget.Settings.read("A"+ShowParametersOption)) opt.selected = true; 
		sel.appendChild(opt);
	}
} 



/////////////////


function AccuSearchCityCode(LocCode)
{
	var location = "http://vwidget.accuweather.com/widget/vista4/locate_city.asp?location=" + LocCode;

	clearResults();

	var tmp = new ActiveXObject("Microsoft.XMLHTTP");
	tmp.open("GET", location, true);
	tmp.onreadystatechange=function()
	{
		if (tmp.readyState==4)
			{
				if (tmp.Status == 200) AccuParseCityResults(tmp.responseXML.documentElement);
				else {document.getElementById("loccode").value = lng_NoData; return;}
			}
	}
	tmp.Send(null);
}


//////////////////


function AccuParseCityResults(xmlData)
{
	tempNode = xmlData.getElementsByTagName("./citylist").item(0);
	tempNodes = tempNode.getElementsByTagName('location');
	for (count = 0; count < tempNodes.length; count++) {
		var option = document.createElement("OPTION");
		cityNode = tempNodes[count];
		option.value = cityNode.getAttribute("location");
		option.innerText = cityNode.getAttribute("city") + ", " + cityNode.getAttribute("state");
		results.appendChild(option);
	}
hide("load_indicator");	
}

/////////////////////


	