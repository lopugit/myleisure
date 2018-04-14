var mongoose = require('mongoose')
dbconf = require('secrets')
dbconf = dbconf.mongodb
let uri = "mongodb://" + (dbconf.auth ? dbconf.username + ":" + dbconf.password + "@" : '') + dbconf.server + ":" + dbconf.port + "/" + dbconf.db + (dbconf.auth ? "?authSource="+dbconf.authDb+"" : '')
let options = { useMongoClient: true }
let db = mongoose.createConnection(uri, options)
    moment = require('moment'),
    highlight = require('./blogHighlight')
var something = Date.now;

var blogSchema = new Schema({
    author: {
        firstName: { type: String, default: "author" },
        middleName: { type: String, default: "author" },
        lastName: { type: String, default: "author" },
        username: { type: String, default: "author" },
        alias: { type: String, default: "the author" },
        fullName: { type: String, default: "author author" },
        bio: { type: String, default: "A bio about the lovely author" },
        contact: {
            phone: { type: String, default: null },
            instagram: { type: String, default: null },
            facebook: { type: String, default: null },
            pinterest: { type: String, default: null },
            linkedIn: { type: String, default: null },
            email: { type: String, default: null },
            address: { type: String, default: null }
        },
        image: {
            url: { type: String, default: '/img/CMS/blogs/defaultAuthor.jpg' },
            text: { type: String, default: 'author' }
        }
    },
    dateCreated: {
        mongo: { type: Date, default: Date.now },
        formatted: { type: String, default: moment().format('MMMM D, YYYY') }
    },
    dateLastModified: {
        mongo: { type: Date, default: Date.now },
        formatted: { type: String, default: moment().format('MMMM D, YYYY') }
    },
    dateEdited: {
        mongo: { type: Date, default: Date.now },
        formatted: { type: String, default: moment().format('MMMM D, YYYY') }
    },
    datesEdited: {
        type: [{}],
        default: [{
            mongo: { type: Date, default: Date.now },
            formatted: { type: String, default: moment().format('MMMM D, YYYY') }
        }]
    },
    datePublished: {
        mongo: { type: Date, default: Date.now },
        formatted: { type: String, default: moment().format('MMMM D, YYYY') }
    },
    title: {
        text: { type: String, default: "Your blogs title" },
        url: { type: String, default: "/blogs/your-blog-post" }
    },
    subtitle: {
        text: { type: String, default: "Your blogs subtitle" },
        url: { type: String, default: "your-blog-post" }
    },
    slug: {
        text: { type: String, default: "your blog post" },
        url: { type: String, default: "your-blog-post" }
    },
    content: {
        intro: {
            paragraphs: { type: [String], default: ["Your blog intro paragraph"] }
        },
        highlights: { type: [{}], default: [new highlight()] }
    },
    images: { type: [{}], default: null },
    image: {
        url: { type: String, default: "/img/CMS/blogs/defaultBanner.jpg" },
        alt: { type: String, default: null },
        text: { type: String, default: null }
    },
    relatedBlogs: { type: [{}], default: [] },
    models: {
        type: {},
        default: {
            highlightModel: highlight
        }
    },
    editors: { type: [String], default: ["lopu"] }
})

var blog = db.model('blog', blogSchema)

var marietta = {
    firstName: "Marietta",
    lastName: "Frey",
    alias: "Marietta Frey",
    bio: "Marietta Frey is a mother of 2 who has travelled the world seeking new adventures and insights at every turn, a woman with a mind as open as the ocean, she always finds ways to help all of those around her through love and compassion, and has an eye for style and design like not many people do.",
    image: {
        url: "/img/assets/myleisureceo.jpg",
        text: "My Leisure owner, Marietta Frey"
    }
}

var firstBlog = new blog({
    author: marietta,
    title: {
        text: "Are you as protected in the sun by your shade sail as you think?"
    },
    content: {
        intro: {
            paragraphs: [
                "We may love our sunburnt country, but there's nothing to love about sweltering through a long hot summer, unprotected from the sun. Shade sails, also known as shade cloths, are a popular and stylish way to get some respite from the heat and UV rays, while still enjoying the outdoors. However, all claims are not what they seem when it comes to sun protection ratings on shade sails.",
                "Although many shade cloth companies offer reassuring claims of maximum ultraviolet radiation (UVR) protection, the UVR rating of the shade cloth by itself is only half the story."
            ]
        },
        highlights: [
            new highlight({
                title: {
                    text: "What to look for"
                },
                content: {
                    paragraphs: [
                        "Shade sails are tested for how much ultraviolet radiation the materials transmit and for tear and tensile strengths. If the shade cloth is stretched due to incorrect installation, its UVR protection against sunburn could be reduced, and there's no standard test for this.",
                        "The School of Optometry and Vision Science at the University of NSW has performed tests on shade cloth to the Australian Standard. Professor Stephen Dain, director of its Optics and Radiometry Laboratory, says that generally woven shade cloths are the preferred option."
                    ]
                }
            }),
            new highlight({
                title: {
                    text: "Sun protection levels impossible to classify?"
                },
                content: {
                    paragraphs: [
                        'The Australian Standard for sun-protective clothing includes a classification system that is similar to that used for sunscreen. Depending on how much UVR it blocks, the cloth may be described as offering \"Good protection\", \"Very good protection\", or \"Excellent protection\".',
                        "The Cancer Council of NSW wants a similar system for shade cloth to improve consumers' ability to identify products with a low or high UVR protection level. But Standards Australia says there are too many variables affecting the UVR protection of shade cloth to classify it, including:"
                    ]
                }
            })


        ]
    },
    editors: ["lopu"]
})

var testBlog1 = new blog({
    author: {
        firstName: "Marietta",
        lastName: "Frey",
        username: "lopu",
        alias: "Marietta Frey"
    },
    title: {
        text: "The first Blog"
    },
    content: {
        intro: {
            paragraphs: [
                "Are you a hotel or resort chain looking to spice up the atmosphere of your customer experience? Our Lettinis offer a HUGE 900+ combination assortment so you can tailor make a range of Lettinis to suit your own brand and style. We even offer you the choice to custom print your own brand logo in any colour you want on any size, finish, or colour Lettini too. The choice is yours",
                "Are you a hotel or resort chain looking to spice up the atmosphere of your customer experience? Our Lettinis offer a HUGE 900+ combination assortment so you can tailor make a range of Lettinis to suit your own brand and style. We even offer you the choice to custom print your own brand logo in any colour you want on any size, finish, or colour Lettini too. The choice is yours"
            ]
        }
    }
    // 'title.text'      : 'Just another blog down the road'

})
var testBlog2 = new blog({
    author: {
        firstName: "Nikolaj",
        lastName: "Frey",
        username: "lopu",
        alias: "lopu"
    },
    title: {
        text: "Welcome to our CMS"
    },
    content: {
        intro: {
            paragraphs: [
                "Are you a hotel or resort chain looking to spice up the atmosphere of your customer experience? Our Lettinis offer a HUGE 900+ combination assortment so you can tailor make a range of Lettinis to suit your own brand and style. We even offer you the choice to custom print your own brand logo in any colour you want on any size, finish, or colour Lettini too. The choice is yours",
                "Are you a hotel or resort chain looking to spice up the atmosphere of your customer experience? Our Lettinis offer a HUGE 900+ combination assortment so you can tailor make a range of Lettinis to suit your own brand and style. We even offer you the choice to custom print your own brand logo in any colour you want on any size, finish, or colour Lettini too. The choice is yours"
            ]
        }
    }
    // 'title.text'      : 'Just another blog down the road'

})
var testBlog3 = new blog({
    author: {
        firstName: "Malena",
        lastName: "Frey",
        username: "lopu",
        alias: "Malena Frey"
    },
    title: {
        text: "YO YO YO YO WASSUP"
    },
    content: {
        intro: {
            paragraphs: [
                "Are you a hotel or resort chain looking to spice up the atmosphere of your customer experience? Our Lettinis offer a HUGE 900+ combination assortment so you can tailor make a range of Lettinis to suit your own brand and style. We even offer you the choice to custom print your own brand logo in any colour you want on any size, finish, or colour Lettini too. The choice is yours",
                "Are you a hotel or resort chain looking to spice up the atmosphere of your customer experience? Our Lettinis offer a HUGE 900+ combination assortment so you can tailor make a range of Lettinis to suit your own brand and style. We even offer you the choice to custom print your own brand logo in any colour you want on any size, finish, or colour Lettini too. The choice is yours"
            ]
        },
        highlights: [new highlight(), new highlight({
            order: "02",
            title: {
                text: "A different highlight"
            }
        })]
    },
    relatedBlogs: [
            testBlog1,
            testBlog2
        ]
        // 'title.text'      : 'Just another blog down the road'

})
blog.find({ 'author.username': 'lopu' }, (err, blogs) => {
    if(blogs){
        if (blogs.length > 0) {
            blog.remove(function(err, removed) {})
                // firstBlog.save({})
            testBlog1.save({})
            testBlog2.save({})
            testBlog3.save({})
        } else {
            // firstBlog.save({})
            testBlog1.save({})
            testBlog2.save({})
            testBlog3.save({})
    
        }
    }
})

module.exports = blog