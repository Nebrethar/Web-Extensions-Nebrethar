(function() {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  /**
   * Given a URL to a banana image, remove all existing beasts, then
   * create and style an IMG node pointing to
   * that image, then insert the node into the document.
   */
  function insertBanana(pbjURL) {
    removeExistingBananas();
    let bananaImage = document.createElement("img");
    bananaImage.setAttribute("src", pbjURL);
    bananaImage.style.height = "100vh";
    bananaImage.className = "pbjellify-image";
    document.body.appendChild(bananaImage);
  }

  /**
   * Remove every peanut butter jelly banana from the page.
   */
  function removeExistingBananas() {
    let existingBananas = document.querySelectorAll(".pbjellify-image");
    for (let pbjt of existingBananas) {
      pbjt.remove();
    }
  }

  /**
   * Listen for messages from the background script.
   * Call "pbjellify()" or "reset()".
  */
  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "pbjellify") {
      insertBanana(message.pbjURL);
    } else if (message.command === "reset") {
      removeExistingBananas();
    }
  });

})();