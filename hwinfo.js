var info = [];
var $info = $("#info");
var $availableMem;

function addInfo(key, value, id) {
  info.push({
    key: key,
    value: value
  });
  if (id!==null) {
      $info.append("<tr><td>" + key + "</td><td id=\"" + id + "\">" + value + "</td></tr>");
  } else {
      $info.append("<tr><td>" + key + "</td><td>" + value + "</td></tr>");
  }
}

function updateAvailableMemory() {
  chrome.system.memory.getInfo(function(info) {
    var amemory = info.availableCapacity;
    var amemoryInGB = amemory / 1024 / 1024 / 1024;
    $availableMem.html(amemoryInGB.toLocaleString() + " GB");
  });
}

function notify(title, content) {
  window.webkitNotifications.createNotification(null, name, content).show();
}

chrome.system.cpu.getInfo(function(info) {
  addInfo("CPU Count", info.numOfProcessors, "cpuCount");
  addInfo("CPU Model", info.modelName, "cpuModel");
  addInfo("Architecture", info.archName, "cpuArch");
});

chrome.system.memory.getInfo(function(info) {
  var tmemory = info.capacity;
  var tmemoryInGB = tmemory / 1024 / 1024 / 1024;
  var amemory = info.availableCapacity;
  var amemoryInGB = amemory / 1024 / 1024 / 1024;
  addInfo("Total Memory", tmemoryInGB.toLocaleString() + " GB", "totalMem");
  addInfo("Available Memory", amemoryInGB.toLocaleString() + " GB", "availableMem");
  $availableMem = $("#availableMem");
});

chrome.system.display.getInfo(function(displays) {
  addInfo("Number of Displays", displays.length);
});

setInterval(updateAvailableMemory, 2000);