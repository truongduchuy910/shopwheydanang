module.exports = {
    url: 'http://localhost:5000',
    storeUri: process.env.storeUri,
    mongoose: {
        uri: 'mongodb://truongduchuy910:Truongduc910.@ds141815.mlab.com:41815/heroku_g4vd37n3'
    },
    setting: {
        storeUri: process.env.storeUri,
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
            ],
            informations: [
                {
                    name: 'description',
                    content: 'Mô Tả Sản Phẩm'
                },
                {
                    name: 'detail',
                    content: 'Chi Tiết Sản Phẩm'
                },
                {
                    name: 'guide',
                    content: 'Hướng Dẫn Sử Dụng'
                }
            ]
        },
        banner: [
            {
                name: 'homeSliderBanner',
                content: 'Banner Trượt Ở Trên',
                type: 'slider'
            },
            {
                name: 'homeBanner',
                content: 'Banner Cố Định Ở Dưới',
                type: 'simple'
            }
        ],
        //Default Post
        post: [
            {
                name: 'policy',
                title: 'Chính Sách',
                informations: [
                    {
                        name: 'detail',
                        content: 'Nội Dung'
                    }]
            },
            {
                name: 'intro',
                title: 'Giới Thiệu',
                informations: [
                    {
                        name: 'detail',
                        content: 'Nội Dung'
                    }]
            }
        ]

    }
}