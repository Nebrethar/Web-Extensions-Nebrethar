function found(results) {
		console.log('Reults amount to ${results.count}.');
		if (results.count > 0) {
			browser.find.highlightResults();
		}	
}

function go(newState) {
	if (newState === 'idle') {
		browser.find.find(" ").then(found);
	}
}

var querying = browser.idle.queryState(1);
querying.then(go);