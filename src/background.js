function icon_clicked() {

    chrome.storage.local.get(["decolour_enabled", "decolour_sites"],
        (vals) => {

            let enabled = !!(vals.decolour_enabled === false); // toggle
            // let sites = vals.decolour_sites || []; // FIXME in v0.2

            // change icon and save settings
            chrome.browserAction.setIcon({ path: enabled ? "decolour.svg" : "decolour_.svg" });
            chrome.storage.local.set({ "decolour_enabled": enabled }, () => {});

            // send a message to active tab
            const msg = { "icon_clicked": true, "enabled": enabled };
            chrome.tabs.query({ currentWindow: true, active: true },
                (tabs) => {
                    for (let tab of tabs) { chrome.tabs.sendMessage(tab.id, msg); }
                }
            );
        }
    );
}

function init() {
    chrome.storage.local.get(["decolour_enabled"],
        (vals) => {
            let enabled = !(vals.decolour_enabled === false); // null is true
            chrome.browserAction.setIcon({ path: enabled ? "decolour.svg" : "decolour_.svg" });
        }
    );
    chrome.browserAction.onClicked.addListener(icon_clicked);
}

init();
