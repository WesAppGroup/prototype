var event_data_url = "http://stumobile0.wesleyan.edu/events/all";

console.log("attempting to fetch event data from server")
$.get(
	event_data_url, function(data) {
		event_data = data
		console.log("got event data");
	}
);
console.log("finished get event data attempt")

var event_data =
	[{
	"value": {
		"eventLatitude": 41.5555,
		"eventCategory": "Student Groups",
		"eventLink": "N/A",
		"eventDescription": "11/18/2013 09:00 am - 06:00 pm Come visit this local artisan (Nan) who magically combines beads, crystals, and stones into beautiful pieces of jewelry.",
		"eventLocation": "Usdan Vendor F1",
		"eventTime": 2485266983583,
		"eventLongitude": -72.6575,
		"eventName": "Nan Vechitto"
	},
	"key": 1
}, {
	"value": {
		"eventLatitude": 41.5555,
		"eventCategory": "Admissions",
		"eventLink": "http://admission.wesleyan.edu/visit/",
		"eventDescription": "11/18/2013 09:00 am - 10:15 am Get the official Wesleyan tour from current Wesleyan students who will tell you everything you want to know.",
		"eventLocation": "Office of Admission",
		"eventTime": 1384783200,
		"eventLongitude": -72.6575,
		"eventName": "Campus Tour (Offered again at noon and 3 p.m.)"
	},
	"key": 2
}, {
	"value": {
		"eventLatitude": 41.5555,
		"eventCategory": "Admissions",
		"eventLink": "http://admission.wesleyan.edu/visit/",
		"eventDescription": "11/18/2013 10:30 am - 11:30 am An hour long detailed presentation on the Wesleyan admission process by a dean with the chance to ask questions.",
		"eventLocation": "Office of Admission",
		"eventTime": 1384788600,
		"eventLongitude": -72.6575,
		"eventName": "Information Session (Offered again at 2 p.m.)"
	},
	"key": 3
}, {
	"value": {
		"eventLatitude": 41.5555,
		"eventCategory": "Sports",
		"eventLink": "http://www.wesleyan.edu/athletics/adultfitness",
		"eventDescription": "11/18/2013 12:00 pm - 12:50 pm An introduction to basic yoga postures and breath awareness, with a focus on proper alignment of the body.  Suitable for beginners.  Please bring a sticky mat.",
		"eventLocation": "Multi Use Rm 2",
		"eventTime": 1384794000,
		"eventLongitude": -72.6575,
		"eventName": "Adult Fitness - Yoga (Mixed Level)"
	},
	"key": 4
}, {
	"value": {
		"eventLatitude": 41.5555,
		"eventCategory": "Student Groups",
		"eventLink": "N/A",
		"eventDescription": "11/18/2013 04:15 pm - 06:00 pm Students should read these stories, with particular attention to the short episodes involving and surrounding the death of the doctor's child, the circus goose, and Lipa's infant child respectively in the three works of the title.",
		"eventLocation": "Fisk 210 (Class of 2003/Hulley Classroom)",
		"eventTime": 1384809300,
		"eventLongitude": -72.6575,
		"eventName": "Three Deaths:  A Child, a Goose, and an Infant.  A Discussion of Death in Chekhov's Stories \"Enemies\" \"Kashtanka,\" and \"In the Ravine.\""
	},
	"key": 5
}, {
	"value": {
		"eventLatitude": 41.5555,
		"eventCategory": "Film",
		"eventLink": "N/A",
		"eventDescription": "11/18/2013 05:00 pm - 06:30 pm James D. Fernandez, New York University",
		"eventLocation": "Film Studies 190 (Powell Family Cinema)",
		"eventTime": 1385267004011,
		"eventLongitude": -72.6575,
		"eventName": "Spanish Immigrants in the US, 1898-1936"
	},
	"key": 6
}, {
	"value": {
		"eventLatitude": 41.5555,
		"eventCategory": "Student Groups",
		"eventLink": "N/A",
		"eventDescription": "11/18/2013 06:00 pm - 08:30 pm Professor Sarah Wiliarty, Wesleyan University",
		"eventLocation": "Usdan 300 (Daniel Family Commons & Lounge)",
		"eventTime": 1384815600,
		"eventLongitude": -72.6575,
		"eventName": "Center for the Humanities Monday Night Lecture Series"
	},
	"key": 7
}, {
	"value": {
		"eventLatitude": 41.5555,
		"eventCategory": "Student Groups",
		"eventLink": "N/A",
		"eventDescription": "11/18/2013 07:00 pm - 11:00 pm Overland Information Meeting, Monday, November 18, 2013 at 7:00pm in Usdan 110.  Informal interviews held following the info session!",
		"eventLocation": "Usdan 110 (Andersen Meeting Room)",
		"eventTime": 1384819200,
		"eventLongitude": -72.6575,
		"eventName": "Overland Information Session"
	},
	"key": 8
}, {
	"value": {
		"eventLatitude": 41.5555,
		"eventCategory": "Student Groups",
		"eventLink": "http://wesleying.org/2013/11/18/mattilda-bernstein-sycamore-reads-from-the-end-of-san-francisco/?utm_source=rss&utm_medium=rss&utm_campaign=mattilda-bernstein-sycamore-reads-from-the-end-of-san-francisco",
		"eventDescription": "Courtesy of Ben Guilmette '15:Described by The Stranger as \"a gender-fucking tower of pure pulsingpurple fabulous,\" Mattilda Bernstein Sycamore is a writer, activist,artist, and queer critic. She is the author of two novels, So ManyWays to Sleep Badly and Pulling Taffy, and the editor of fivenonfiction anthologies, including Why Are Faggots So Afraid ofFaggots, Nobody [...]",
		"eventLocation": "Russell House",
		"eventTime": 1384896600,
		"eventLongitude": -72.6575,
		"eventName": "Mattilda Bernstein Sycamore reads from The End of San Francisco"
	},
	"key": 9
}, {
	"value": {
		"eventLatitude": 41.5555,
		"eventCategory": "Student Groups",
		"eventLink": "http://wesleying.org/2013/11/17/ang-sarap-filipino-late-night-breakfast-edition/?utm_source=rss&utm_medium=rss&utm_campaign=ang-sarap-filipino-late-night-breakfast-edition",
		"eventDescription": "A message from Jaime de Venecia '15:Come on down to Woodhead Lounge in Exley on Sunday night to enjoy some delicious Filipino breakfast food!Be hungry ;)))Date: Sunday, November 17, 2013Time: 10:00 PM - 1:00 AMPlace: Woodhead Lounge, Exley Science CenterCost: $5 to $10, cash only",
		"eventLocation": "TBA",
		"eventTime": 1384743600,
		"eventLongitude": -72.6575,
		"eventName": "Ang Sarap: Filipino Late Night [BREAKFAST EDITION]"
	},
	"key": 10
}];