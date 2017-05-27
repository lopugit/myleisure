var MongoClient = require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.createConnection("mongodb://localhost:27017/myleisure")
var write = true;

var Schema = mongoose.Schema;

var navItemSchema = new Schema({
  name: String,
  type: {type: String, default: "url"},
  url: {type: String, default: null},
  dropdowns: {type: [], default: null},
  icon: {type: String, default: null}

});

var navSchema = new Schema({
  id: {type: String, default: null},
  name: ({type: String, default: null}),
  indexes: {type: [], default: null},
  socials: {type: [], default: null},
  quickLinks: {type: [], default: null}
});

var navSocialSchema = new Schema({
  name: {type: String, default: "social media"},
  twitter: {
    name: {type: String, default: null},
    url: {type: String, default: null},
    connection: {type: String, default: null},
    icon: {type: String, default: null}

  },
  facebook: {
    name: {type: String, default: null},
    url: {type: String, default: null},
    connection: {type: String, default: null},
    icon: {type: String, default: null}

  },
  instagram: {
    name: {type: String, default: null},
    url: {type: String, default: null},
    connection: {type: String, default: null},
    icon: {type: String, default: null}

  },
  youtube: {
    name: {type: String, default: null},
    url: {type: String, default: null},
    connection: {type: String, default: null},
    icon: {type: String, default: null}

  },
  pintrest: {
    name: {type: String, default: null},
    url: {type: String, default: null},
    connection: {type: String, default: null},
    icon: {type: String, default: null}

  },
  linkedin: {
    name: {type: String, default: null},
    url: {type: String, default: null},
    connection: {type: String, default: null},
    icon: {type: String, default: null}
  },
  phone: {
    name: {type: String, default: null},
    connection: {type: String, default: null},
    icon: {type: String, default: null},
  },
  email: {
    name: {type: String, default: null},
    connection: {type: String, default: null},
    icon: {type: String, default: null}
  }
});


var nav = db.model("nav", navSchema);
var navItem = db.model("navItem", navItemSchema);
var socials = db.model("socials", navSocialSchema);


var Socials = new socials({
  instagram: {
    name: "instagram",
    connect: "myleisurelettinis",
    url: "instagram.com/",
    icon: "fa-instagram"
  },
  facebook: {
    name: "facebook",
    connect: "myleisure",
    url: "facebook.com/",
    icon: "fa-facebook-official"
  },
  linkedin: {
    name: "linkedin",
    connect: "",
    url: "",
    icon: "fa-social-linkedin"
  },
  youtube: {
    name: "youtube",
    connect: "myleisure",
    url: "youtube.com/",
    icon: "fa-youtube"
  },
  pintrest: {
    name: "pintrest",
    connect: "",
    url: "pintrest.com/",
    icon: "fa-pinterest-box"
  },
  phone: {
    name: "phone",
    connect: "0406 421 708",
    url: "0406 421 708"
  },
  email: {
    name: "email",
    connect: "marietta@myleisure.com.au",
    url: "marietta@myleisure.com.au"
  }
});


var home = new navItem({
  name: "home",
  url: "/Home"
});

var aboutus = new navItem({
  name: "about us",
  url: "/AboutUs"
});

// Lettinis
var shop = new navItem({
  name: "shop",
  url: "/shop"
});
var lettini = new navItem({
  name: "lettinis",
  url: "/shop/lettinis"
});
var customizeYourOwn = new navItem({
  name: "customize your own",
  url: "/Customize"
});
var coloursAndFrames = new navItem({
  name: "colours and frames",
  url: "/Design"
});
var allAccessories = new navItem({
  name: "all accessories",
  url: "/Accessories"
});
var cushions = new navItem({
  name: "cushions",
  url: "/Accessories#Cushions"
});
var cupHolders = new navItem({
  name: "cup holders",
  url: "/Accessories#CupHolders"
});
var accessoriesDropdownItems = [
  allAccessories,
  cushions,
  cupHolders
];
var accessories = new navItem({
  name: "accessories",
  url: "/Accessories",
  type: "dropdown",
  dropdowns: accessoriesDropdownItems
});
var blog = new navItem({
  name: "blog",
  url: "/blogs"
});
var design = new navItem({
  name: "design",
  url: "/Design"
});
var contactUs = new navItem({
  name: "contact",
  // type: "button",
  url: "/ContactUs"
});
var showcase = new navItem({
  name: "showcase",
  url: "/Showcase"
});
var lettiniDropdownItems = [
  lettinis,
  showcase,
  coloursAndFrames,
  cushions,
  cupHolders
];
var lettinis = new navItem({
  name: "lettinis",
  url: "/Lettinis",
  type: "dropdown",
  dropdowns: lettiniDropdownItems
});

///// TOOLS
var hotelsAndResorts = new navItem({
  name: "hotels & resorts",
  url: "/Hotels"
});
var commercialLink = new navItem({
  name: "commercial",
  url: "/stockists"
});
var customBrandPrinting = new navItem({
  name: "custom brand printing",
  url: "/Printing"
});
var stockists = new navItem({
  name: "stockists",
  url: "/Stockists"
});
var commercialChoice = new navItem({
  name: "Commercial Choices",
  url: "/Possibilities"
});
var login = new navItem({
  name: "login",
  url: "/Login"
});
var apply = new navItem({
  name: "apply here",
  url: "/stockists#applyhere"
});

var stockistsDropdown = new navItem({
  name: "stockists",
  type: "dropdown",
  dropdowns: [
    stockists,
    hotelsAndResorts,
    customBrandPrinting,
    commercialChoice,
    apply
  ]
});

var quickLinks = [
  // commercialLink,
  // customBrandPrinting,
  // stockists,
  // hotelsAndResorts
  cushions,
  cupHolders,
  shop,
  showcase
];

var builder = new navItem({
  name: "builder",
  url: "/build"
});

var commercialDropdowns = [
  stockists,
  hotelsAndResorts,
  // customBrandPrinting,
  showcase,
  commercialChoice,
  apply
];

var commercial = new navItem({
  name: "commercial",
  url: "/stockists",
  type: "dropdown",
  dropdowns: commercialDropdowns
});

var cart = new navItem({
  name: "cart",
  type: "cart",
  icon: "fa-shopping-basket",
  url: "/cart"
});

var NavItems = [
  // home,
  contactUs,
  // aboutus,
  lettini,
  // lettinis,
  blog,
  commercial,
  cart
  // accessories,
  // blog,
  // commercialDropdown,
  // commercial,
];


var mainNav = new nav({
  id: "main nav",
  name: "main nav",
  indexes: NavItems,
  socials: Socials,
  quickLinks: quickLinks
});




if(write)
  console.log("writing navs");
  nav.remove({id: "main nav"}, function(err){

    if(err)
      console.log(err)

    else
      mainNav.save();

  });

module.exports = nav;

// if(db)
//   db.close();
