function found(results) {
		console.log('Reults amount to ${results.count}.');
		if (results.count > 0) {
			browser.find.highlightResults();
		}
		
}

browser.find.find(" ").then(found);