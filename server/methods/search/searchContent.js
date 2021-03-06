Meteor.methods({
	"searchContent": function(searchterm, searchType) {
		check(searchterm, String);
		check(searchType, String);


		if (searchType !== "Music") {
			var type = (searchType === "Movies") ? "movie" : "tv";

			try {				
				var result = Meteor.call("TMDBSearch", searchterm, type)
			} catch (error) {
				logger.error("TMDBSearch Error -> " + error.message);
				return [];
			}
			return result;
		} else {
			return [];
		}	
	},
	"searchOptions": function () {
		var options = [];

		if (Settings.find({}).fetch()[0].searchOptionsMOVIES) {
			options.push("Movies");
		}

		if (Settings.find({}).fetch()[0].searchOptionsTV) {
			options.push("TV Shows");
		}

		return options;
	},
	"searchProfiles": function() {
		try {
			var settings = Settings.find().fetch()[0];			
			if (settings.couchPotatoENABLED) {			
				return CouchPotato.profileList();
			}
			return [];
		} catch (error) {
			logger.error("CouchPotato Error -> " + error.message);
			return [];
		}	
	}
});