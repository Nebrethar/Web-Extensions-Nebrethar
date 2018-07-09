/**
 *ADAPTED FROM "beastify" @@@@ https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Your_second_WebExtension
 */


/**
 * CSS to hide everything on the page,
 * except for elements that have the "pbjt-image" class.
 */
const hidePage = `body > :not(.pbjellify-image) {
                    display: none;
                  }`;

/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
function listenForClicks() {
  document.addEventListener("click", (e) => {

    /**
     * Given the name of a pbj, get the URL to the corresponding image.
     */
    function pbjtNameToURL(pbjName, tabs) {
      switch (pbjName) {
		  
        case "It's Peanut Butter Jelly Time!":
		document.getElementById('pbjt').play();
			return browser.extension.getURL("icons/pbjt.gif");;
      }
    }

    /**
     * Insert the page-hiding CSS into the active tab,
     * then get the pbjt URL and
     * send a "pbjt" message to the content script in the active tab.
     */
    function pbjt(tabs) {
      browser.tabs.insertCSS({code: hidePage}).then(() => {
        let url = pbjtNameToURL(e.target.textContent);
        browser.tabs.sendMessage(tabs[0].id, {
          command: "pbjellify",
          pbjURL: url
        });
      });
    }

    /**
     * Remove the page-hiding CSS from the active tab,
     * send a "exit" message to the content script in the active tab.
     */
    function exit(tabs) {
      browser.tabs.removeCSS({code: hidePage}).then(() => {
        browser.tabs.sendMessage(tabs[0].id, {
          command: "exit",
        });
      });
    }

    /**
     * Just log the error to the console.
     */
    function reportError(error) {
      console.error(`Could not pbjt: ${error}`);
    }

    /**
     * Get the active tab,
     * then call "pbjt()" or "exit()" as appropriate.
     */
    if (e.target.classList.contains("pbjt")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(pbjt)
        .catch(reportError);
    }
    else if (e.target.classList.contains("exit")) {
	  document.getElementById('pbjt').pause();
      browser.tabs.query({active: true, currentWindow: true})
        .then(exit)
        .catch(reportError);
    }
  });
}

/**
 * There was an error executing the script.
 * Display the popup's error message, and hide the normal UI.
 */
function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute peanut butter content script: ${error.message}`);
}

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
browser.tabs.executeScript({file: "/content_scripts/pbjellify.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError);