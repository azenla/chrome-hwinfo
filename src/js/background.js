var optimal = {
  minWidth: 750,
  maxWidth: 750,
  minHeight: 750,
  maxHeight: 750
};

chrome.app.runtime.onLaunched.addListener(function(a) {
  chrome.app.window.create('hwinfo.html', {});
});

chrome.app.runtime.onRestarted.addListener(function (a) {
	console.log("Application Restarting");
});