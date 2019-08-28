window.onload = function () {
    $('.custom-control-input').change(function () {
        var action = 'removeProductAttribute'
        if (this.checked == true) {
            action = 'saveProductAttribute'
        }
        var uri = `/ad/${action}/${this.getAttribute("productid")}/${this.getAttribute("name")}`
        console.log(uri)
        $.post(uri, {
            name: this.getAttribute('content')
        }, (err, docs) => {
            console.log(docs)
        })
    })
}