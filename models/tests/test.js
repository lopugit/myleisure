
var nav1= {
  home: {
    name: "home",
    type: "url",
    url: "/home",
    dropdowns: null
  },

  aboutus: {
    name: "about us",
    type: "url",
    url: "/aboutus"
  },

  lettinis: {
    name: "lettinis",
    type: "dropdown",
    dropdowns: null
  },

  shop: {
    name: "shop",
    type: "dropdown",
    url: null,
    dropdowns: {
      lettinis: {
        name: "lettinis",
        type: "url",
        url: "/shop",
        dropdowns: null
      },
      accessories: {
        name: "accessories",
        type: "url"

      }
    }
  }
};

var home = {
  name: "home",
  type: "url",
  url: "/Home",
},
aboutUs = {
  name: "about us",
  type: "url",
  url: "/AboutUs",
},
news = {
  name: "news",
  type: "url",
  url: "/Blog",
},
contactUs = {
  name: "contact us",
  type: "button",
  url: "/ContactUs"
},
shopNow = {
  name: "shop now",
  type: "url",
  url: "/Lettinis"
},
customizeYourOwn = {
  name: "customize your own",
  type: "url",
  url: "/Customize"
},
coloursAndFrames = {
  name: "colours and frames",
  type: "url",
  url: "/Design"
},
accessories = {
  name: "accessories",
  type: "url",
  url: "/Accessories"
},
cushions = {
  name: "cushions",
  type: "url",
  url: "/Accessories#Cushions"
},
cupHolders = {
  name: "cup holders",
  type: "url",
  url: "/Accessories#CupHolders"
},
storage = {
  name: "storage",
  type: "url",
  url: "/Accessories#Storage"
},
customizeALettini = {
  name: "customize a lettini",
  type: "url",
  url: "/Customize"
},
colours = {
  name: "colours",
  type: "url",
  url: "/Lettinis#Colours"
},
frames = {
  name: "frames",
  type: "url",
  url: "/Lettinis#Frames"
},

// Dropdown Objects

lettiniDropdownItems = [
  shopNow,
  customizeYourOwn,
  coloursAndFrames
],

accessoriesDropwdownItems = [
  accessories,
  cushions,
  cupHolders,
  lettiniDropdownItems
],

customizeDropdownItems = [
  customizeALettini,
  colours,
  frames
],

// Dropdown Items
lettinis = {
  name: "lettinis",
  type: "dropdown",
  dropdowns: lettiniDropdownItems
},
accessories = {
  name: "accessories",
  type: "dropdown",
  dropdowns: accessoriesDropwdownItems
},
customize = {
  name: "customize",
  type: "dropdown",
  dropdowns: customizeDropdownItems
}

nav = [
  home,
  aboutUs,
  lettinis,
  accessories,
  news,
  customize,
  contactUs
]

// module.exports.nav = nav;

// var nav = navRequire.nav;

// console.log("\n");
//
// for (items in nav) {
//
//
//   if (nav[items].dropdowns) {
//
//     dropdownItems = nav[items].dropdowns;
//
//     console.log(nav[items].name);
//     console.log("\n");
//
//     for (items in dropdownItems) {
//
//       console.log(dropdownItems[items]);
//       console.log("\n");
//
//       if (dropdownItems[items].dropdowns) {
//
//         // console.log(nav[items].name);
//         // console.log("\n");
//
//         console.log("yes");
//         console.log("\n");
//
//       };
//
//     };
//
//   } else if (true) {
//
//     console.log(nav[items]);
//     console.log("\n");
//
//   };
//   // console.log(nav[items]);
// };
