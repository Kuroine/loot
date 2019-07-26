"use strict"

const DefaultSettings = {
    enable: true,
    enableAuto: true,
    lootDelay: 10,
    loopInterval: 10,

    blacklist: [
        7214, // Scroll of Resurrection
        8000, // Rejuvenation Mote
        8001, // HP Recovery Mote
        8002, // MP Replenishment Mote
        8003, // Spirited MP Replenishment Mote
        8004, // Strong Resistance Mote
        8005, // Healing Mote
        8008, 8009, 8010, 8011, 8012, 8013, 8014, 8015, 8016, 8017, 8018, 8019, 8020, 8021, 8022, // Arun's Vitae I-XV Mote
        8023, // Arun's Tear Mote
        89110, 89100, 89010, 89000, //Green halidoms
        88938, 88932, 88901, 88897, 88896, 88934, 88935, 88894, 88937, 88931, 88893, 88902, 88933, 88904, 88899, 88900, 88939, 88903, 88936, 88898, 88892 //Blighted Stuffs
    ],
    bahaarlist:
    [
        98656 //Sacred Mallet
    ],
    veil:
    [
        98590 // veil
    ]
}

module.exports = function MigrateSettings(from_ver, to_ver, settings) {
    if (from_ver === undefined) {
        // Migrate legacy config file
        return Object.assign(Object.assign({}, DefaultSettings), settings);
    } else if (from_ver === null) {
        // No config file exists, use default settings
        return DefaultSettings;
    } else {
        // Migrate from older version (using the new system) to latest one
        if (from_ver + 1 < to_ver) {
            // Recursively upgrade in one-version steps
            settings = MigrateSettings(from_ver, from_ver + 1, settings);
            return MigrateSettings(from_ver + 1, to_ver, settings);
        }

        // If we reach this point it's guaranteed that from_ver === to_ver - 1, so we can implement
        // a switch for each version step that upgrades to the next version. This enables us to
        // upgrade from any version to the latest version without additional effort!
        switch(to_ver)
        {
			// keep old settings, add new ones
			default:
				let oldsettings = settings
				
				settings = Object.assign(DefaultSettings, {});
				
				for(let option in oldsettings) {
					if(settings[option]) {
						settings[option] = oldsettings[option]
					}
				}

				if(from_ver < to_ver) console.log('[Loot] Your settings have been updated to version ' + to_ver + '. You can edit the new config file after the next relog.')
				break;
        }

        return settings;
    }
}