

function insertEventData(eventData) {
	var totalValue = eventData;
}



    browser.runtime.onMessage.addListener((message) => {
    if (message.command === "event") {
      insertEventData(message.eventData);
    }
}
