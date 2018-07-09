function listenForClicks() {
  document.addEventListener("click", (e) => {
    function reportError(error) {
      console.error(`${error}`);
    }
  });
}
function reportExecuteScriptError(error) {
  console.error(`${error.message}`);
}
.then(listenForClicks)
.catch(reportExecuteScriptError);