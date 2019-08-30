//Components Area don't use Global Variable
// DailyPost Component 
//----------------------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------------------
var Xhttp = new XMLHttpRequest();

Xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var docs = JSON.parse(this.response);
        if (docs && docs.event) {
            switch (docs.event) {
                case 'daily_post':
                    docs.data.forEach(e => {
                        daily_post.innerHTML = daily_post.innerHTML + `
                            <div class="row">
                                <div class="col-sm-12 col-md-6 col-lg-5 d-flex justify-content-center align-items-center"
                                    style="padding: 0;">
                                    <img class="shadow-lg" data-aos="fade-down" data-aos-delay="300" src="${e.image}"
                                        style="width: 100%;">
                                </div>
                                <div class="col-sm-12 col-md-6 col-lg-7 d-xl-flex justify-content-xl-center align-items-xl-center"
                                    data-aos="fade-up" data-aos-delay="400" style="padding: 20px;">
                                    <div class="text-justify">
                                        ${e.Content}
                                        <hr>
                                    </div>
                                </div>
                            </div>
                            `
                    })
                    break;
                case 'flash_sale':
                    docs.data.forEach(e => {



                    })
                    break;
            };
        }
    };
}


var daily_post = document.getElementById('daily_post');
if (daily_post) {
    Xhttp.open("POST", "public/daily_post/post/type/daily", false);
    Xhttp.send();
}

var flash_sale = document.getElementById('flash_sale');

Xhttp.open("POST", "public/flash_sale/event/type/flashsale", false);
Xhttp.send();
Xhttp.open("POST", "public/event/event/type/event", false);
Xhttp.send();



var DailyPostComponent = document.getElementById('');
if (DailyPostComponent) {
    var Xhttp = new XMLHttpRequest();
    Xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var docs = JSON.parse(this.response);
            if (docs && docs.length) {
                docs.forEach(post => {
                    DailyPostComponent.innerHTML = DailyPostComponent.innerHTML + `
                    <div class="row">
                        <div class="col-sm-12 col-md-6 col-lg-5 d-flex justify-content-center align-items-center"
                            style="padding: 0;">
                            <img class="shadow-lg" data-aos="fade-down" data-aos-delay="300" src="${post.image}"
                                style="width: 100%;">
                        </div>
                        <div class="col-sm-12 col-md-6 col-lg-7 d-xl-flex justify-content-xl-center align-items-xl-center"
                            data-aos="fade-down" data-aos-delay="400" style="padding: 20px;">
                            <div class="text-justify">
                                ${post.Content}
                                <hr>
                            </div>
                        </div>
                    </div>
                    `
                })
            }
        };
    }
    Xhttp.open("POST", "public/post/type/daily", true);
    Xhttp.send();
}

var global_Event;
var global_FlashSale;

var EventXhttp = new XMLHttpRequest();
EventXhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var docs = JSON.parse(this.response);
        global_Event = docs;
        var FlashSaleXhttp = new XMLHttpRequest();
        FlashSaleXhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var docs = JSON.parse(this.response);
                global_FlashSale = docs;

                var FlashSaleProductComponent = document.getElementById('FlashSaleProduct');
                if (FlashSaleProductComponent) {
                    var Xhttp = new XMLHttpRequest();
                    Xhttp.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
                            var docs = JSON.parse(this.response);
                            if (docs && docs.length) {
                                docs.forEach(product => {
                                    FlashSaleProductComponent.innerHTML = FlashSaleProductComponent.innerHTML + productComponent(product);
                                })
                            }
                        };
                    }
                    Xhttp.open("POST", "public/product/event/flashsale", false);
                    Xhttp.send();
                }
                var FlashSaleComponent = document.getElementById('FlashSale');
                if (FlashSaleComponent) {
                    FlashSaleComponent.innerHTML = `
                <section data-aos="" class="countdown-section" style="margin-top: 60px;">
                    <div class="container">
                        <div id="data_countdown" class="row big-countdown" data-countdown="02/27/2020 02:51:00">
                            <div class="col-12 countdown-header">
                                <h1 id="flash_sale_title">Flash Sale&nbsp;<i class="fa fa-flash"></i></h1>
                                <p id="flash_sale_content"></p>
                            </div>
                            <div class="col-6 col-sm-3">
                                <span id="number-days">00</span><span class="txt-countdown">hours
                                </span>
                            </div>
                            <div class="col-6 col-sm-3">
                                <span id="number-hours">00</span><span class="txt-countdown">hours
                                </span>
                            </div>
                            <div class="col-6 col-sm-3">
                                <span id="number-minutes">00</span><span class="txt-countdown">minutes
                                </span>
                            </div>
                            <div class="col-6 col-sm-3">
                                <span id="number-seconds">00</span>
                                <span class="txt-countdown">seconds
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
                <div class="container d-flex justify-content-center justify-content-sm-center" data-aos="fade-up"
                    style="margin-top: -40px;">
                    <div id="FlashSaleProduct" class="row d-flex justify-content-center" style="width: 100%;">
                    </div>
                </div>
                `;
                    var d = new Date(global_FlashSale[0].end);
                    var now = new Date();
                    let count = (d - now)
                    d.setTime(count);
                    function countdown() {
                        d.setTime(d - 1000);
                        let seconds = Math.floor(d.getTime() / 1000) % 60;
                        let minutes = Math.floor(Math.floor(d.getTime() / 1000) / 60) % 60;
                        let hours = Math.floor(Math.floor(Math.floor(d.getTime() / 1000) / 60) / 60) % 24;
                        let days = Math.floor(Math.floor(Math.floor(Math.floor(d.getTime() / 1000) / 60) / 60) / 24);
                        document.getElementById('number-days').innerText = days;
                        document.getElementById('number-hours').innerText = hours;
                        document.getElementById('number-minutes').innerText = minutes;
                        document.getElementById('number-seconds').innerText = seconds;
                    }
                    if (count > 0) {
                        setInterval(countdown, 1000);
                    }
                }


            };
        }
        FlashSaleXhttp.open("POST", "public/event/type/flashsale", false);
        FlashSaleXhttp.send();



    };
}
EventXhttp.open("POST", "public/event/type/event", false);
EventXhttp.send();








// FlashSale Component 
//----------------------------------------------------------------------------------------------------------------------------------------------------------------



//Product Component ----------------------------------------------------------------------------------------------------------------------------------------------------------------
function productComponent(p) {
    let html;
    if (p.htmlFullName) html = p.htmlFullName; html = "";

    let image;
    if (p.images) image = p.images[0]; htimageml = "";

    let name;
    if (p.fullName) name = p.fullName; name = "";

    let basePrice;
    if (p.basePrice) basePrice = p.basePrice; basePrice = "";

    let salePrice;
    if (p.salePrice) html = p.salePrice; salePrice = "";

    let onHand;
    if (p.onHand) onHand = p.onHand; onHand = "";

    let htmlPrice;


    return `
    <div class="col-sm-12 col-md-6 col-lg-3 d-flex justify-content-center justify-content-sm-center align-items-sm-start justify-content-md-center align-items-md-start justify-content-lg-center align-items-lg-start"
        style="padding: 15px;">
        <a href="/san-pham/${html}">
            <div style="max-width: 200.5px;">
                <div class="d-sm-flex d-md-flex d-xl-flex justify-content-sm-center justify-content-md-center align-items-md-center justify-content-xl-center align-items-xl-center"
                    style="max-height: 230px;">
                    <img src="${image}"
                        style="width: auto;max-width: 200.5px;">
                </div>
                <div class="text-center border rounded-0">
                    <h5>${name}</h5>
                    <br>
                    <h3 style="font-size: 16px;text-decoration: line-through">${basePrice} ₫</h3>
                    <h3 style="font-size: 20px;">${salePrice} ₫</h3>
                    <hr>
                    <h6 class="text-center d-lg-flex align-items-lg-center justify-content-xl-center"
                        style="margin: 5px;background: linear-gradient(330deg, #e05252 0%, #99e052 25%, #52e0e0 50%, #9952e0 75%, #e05252 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;font-weight: 800;font-size: 16px;">
                        Còn ${onHand} Sản Phẩm
                    </h6>
                </div>
            </div>
        </a>
    </div>
    `
}