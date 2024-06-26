//	Javascript file for the WeatherCenter gadget
//	(c) 2009
//	WeatherCenter Gadget Team
//	Development: hadj 
//	Graphics: Tex
//	Testing: Digital	
////////////////////////////////////////////////////////////////////////




function WeatherEyeLoadSettings()
{
	loccode.value = System.Gadget.Settings.read("WElastSearch");
	loccode_id.value = System.Gadget.Settings.read("WElocationCode");

	updateInt[0].disabled = true;
	updateInt[1].checked = "1";
	updateIntValue.value = System.Gadget.Settings.read("WEupdateInterval");


	WEUnits_makeUnitSelector("ShowParametersOption1");
	WEUnits_makeUnitSelector("ShowParametersOption2");
	WEUnits_makeUnitSelector("ShowParametersOption3");
	WEUnits_makeUnitSelector("ShowParametersOption4");
	
}

/////////////////



function WEUnits_makeUnitSelector(ShowParametersOption)
{
var unitsArray = [
		{"name":lng_Stats["nothing"], "value":"nothing"},
		{"name":lng_Stats["flik"], "value":"flik"},
		{"name":lng_Stats["wind"], "value":"wind"},
		{"name":lng_Stats["humidity"], "value":"humidity"},
		{"name":lng_Stats["pressure"], "value":"pressure"},
		{"name":lng_Stats["pressuretrend"], "value":"pressuretrend"}]


for (i = 0; i < unitsArray.length; i++)
	{
		var sel = document.getElementById(ShowParametersOption);
		var opt = document.createElement("option");
		opt.value = unitsArray[i].value;
		opt.innerHTML = unitsArray[i].name;
		if (unitsArray[i].value == System.Gadget.Settings.read("WE"+ShowParametersOption)) opt.selected = true; 
		sel.appendChild(opt);
	}
} 



/////////////////


function WeatherEyeSearchCityCode(LocCode)
{
	var location = "http://weyepc.pelmorex.com/BlackBerry/PTIDataFeedManagerISAPI.dll/SearchCity?s=" + LocCode;

	clearResults();

 	var tmp = new ActiveXObject("Microsoft.XMLHTTP");
	tmp.open("GET", location, true);
	tmp.onreadystatechange=function()
	{
		if (tmp.readyState==4)
			{
				if (tmp.Status == 200) WeatherEyeParseCityResults(tmp.responseText);
				else {document.getElementById("loccode").value = lng_NoData; return;}
			}
	}
	tmp.Send(null);
}


//////////////////


function WeatherEyeParseCityResults(xmlData)
{
	var xml = xmlData.split("\r");	
		
	for (var h=0; h<xml.length; h++) {

		var xmlsplit = xml[h].split("|");

		if(typeof xmlsplit[1]!="undefined") {
			var option = document.createElement("OPTION");
			option.value=xmlsplit[1];
			option.innerText=xmlsplit[3];
			results.appendChild(option);
		}
	}
hide("load_indicator");
}

/////////////////////


	