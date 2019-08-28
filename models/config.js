module.exports = {
    url: 'http://localhost:5000',
    mongoose: {
        uri: 'mongodb://truongduchuy910:Truongduc910.@ds141815.mlab.com:41815/heroku_g4vd37n3'
    },
    setting: {
        product: {
            attributes: [
                {
                    name: 'taste',
                    content: 'Mùi'
                },
                {
                    name: 'function',
                    content: 'Chức Năng'
                },
                {
                    name: 'brand',
                    content: 'Thương Hiệu'
                },
                {
                    name: 'category',
                    content: 'Danh Mục'
                }
            ]
        }
    }
}