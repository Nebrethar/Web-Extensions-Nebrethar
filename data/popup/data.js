/* function MonitorNetowkr copied from https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/webRequest/StreamFilter/ondata */
function monitorNetwork() {
	let filter = browser.webRequest.filterResponseData(details.requestID);
	let decoder = new TextDecoder("utf-8");

    filter.ondata = event => {
      filter.write(event.data);
	  let str = decoder.decode(event.data, {stream: true});
	  var text = document.getElementById("tage");
	  text.innerHTML = str;
    }
}
  });
}