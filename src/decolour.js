const decolour = {

    enabled: true,
    did: false,
    sites: [],

    start: function() {

        if (this.did) return;

        // read settings and call action method
        chrome.storage.local.get(["decolour_enabled", "decolour_sites"],
            (vals) => {
                this.enabled = !(vals.decolour_enabled === false); // null is true
                this.sites = vals.decolour_sites || [];
                this.do();
            }
        );
    },

    do: function() {
        if (this.enabled) { // do
            document.body.style.filter = "grayscale(100%)";
            this.did = true;
        } else if (this.did) { // undo
            document.body.style.filter = "";
            this.did = false;
        }
    },

    read_message: function(msg) {
        if (msg.icon_clicked) {
            this.enabled = (msg.enabled === true);
            this.do();
        }
    }

};

// init
decolour.start();

// listen for icon click
chrome.runtime.onMessage.addListener((msg) => { decolour.read_message(msg); });
