var info = [];
var $info = $("#info");
var $availableMem;

function addInfo(key, value, id) {
    info.push({
        key: key,
        value: value
    });
    if (id !== null)
        $info.append("<tr><td>" + key + "</td><td id=\"" + id + "\">" + value + "</td></tr>");
    else
        $info.append("<tr><td>" + key + "</td><td>" + value + "</td></tr>");
}

function updateAvailableMemory() {
    chrome.system.memory.getInfo(function (info) {
        var amemory = info.availableCapacity;
        var amemoryInGB = amemory / 1024 / 1024 / 1024;
        $availableMem.html(amemoryInGB.toLocaleString() + " GB");
    });
}

function updateCounts() {
    chrome.system.storage.getInfo(function (devices) {
        $("#deviceCount").html(devices.length);
    });

    chrome.system.display.getInfo(function (displays) {
        $("#displayCount").html(displays.length);
    });
}

chrome.system.cpu.getInfo(function (info) {
    addInfo("CPU Count", info.numOfProcessors, "cpuCount");
    addInfo("CPU Model", info.modelName, "cpuModel");
    addInfo("Architecture", info.archName, "cpuArch");
});

chrome.system.memory.getInfo(function (info) {
    var tmemory = info.capacity;
    var tmemoryInGB = tmemory / 1024 / 1024 / 1024;
    var amemory = info.availableCapacity;
    var amemoryInGB = amemory / 1024 / 1024 / 1024;
    addInfo("Total Memory", tmemoryInGB.toLocaleString() + " GB", "totalMem");
    addInfo("Available Memory", amemoryInGB.toLocaleString() + " GB", "availableMem");
    $availableMem = $("#availableMem");
});

chrome.system.display.getInfo(function (displays) {
    addInfo("Display Count", displays.length, "displayCount");
});

chrome.system.storage.getInfo(function (devices) {
    addInfo("Device Count", devices.length, "deviceCount");
});

setInterval(updateAvailableMemory, 2000);
setInterval(updateCounts, 2000);

$(document).bind('keypress', 'a', function () {
    bootbox.alert("<b>Hardware Info is created by Kenneth Endfinger</b>");
});

$(document).bind('keypress', 'f', function () {
    var appWindow = chrome.app.window.current();
    if (!appWindow.isFullscreen())
        appWindow.fullscreen();
    else
        appWindow.restore();
});