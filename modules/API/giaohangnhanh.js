const request = require('request');
//https://api.ghn.vn/home/docs
// Test url = https://apiv3-test.ghn.vn/api/v1/apiv3
// https://console.ghn.vn/api/v1/apiv3
const GHN_url = 'https://console.ghn.vn/api/v1/apiv3';

function GHN_fee(token, FromDistrictID, ToDistrictID, Weight, callback) {
    FindAvailableServices(token, FromDistrictID, ToDistrictID, Weight, docs => {

        if (docs.data.length) {
            var result = 200000;
            console.log(docs);
            docs.data.forEach(service => {
                if (result > service.ServiceFee) {
                    result = service.ServiceFee;
                }
            })
        }
        callback(result);

    })
}
module.exports.GHN_fee = GHN_fee;


function CalculateFee(token, FromDistrictID, ToDistrictID, ServiceID, Weight, callback) {
    request(GHN_url + '/CalculateFee', {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        json: {
            token: token,
            FromDistrictID: FromDistrictID,
            ToDistrictID: ToDistrictID,
            ServiceID: ServiceID,
            Weight: Weight,
        },
        method: 'post'

    },
        (err, docs) => {
            callback(docs.body)
        })
}
module.exports.CalculateFee = CalculateFee;

function GetHubs(token, callback) {
    request(GHN_url + '/GetHubs', {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        json: {
            token: token

        },
        method: 'post'

    },
        (err, docs) => {
            callback(docs.body)
        })
}
module.exports.GetHubs = GetHubs;

function GetDistricts(token, callback) {
    request(GHN_url + '/GetDistricts', {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        json: {
            token: token

        },
        method: 'post'

    },
        (err, docs) => {
            callback(docs.body)
        })
}
module.exports.GetDistricts = GetDistricts;

function FindAvailableServices(token, FromDistrictID, ToDistrictID, Weight, callback) {

    request(GHN_url + '/FindAvailableServices', {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        json: {
            token: token,
            FromDistrictID: FromDistrictID,
            ToDistrictID: ToDistrictID,
            Weight: Weight,
        },
        method: 'post'

    },
        (err, docs) => {
            callback(docs.body)
        })


}
module.exports.FindAvailableServices = FindAvailableServices;

function CreateOrder(
    token,
    FromDistrictID,
    ToDistrictID,
    ClientContactName,
    ClientContactPhone,
    ClientAddress,
    CustomerName,
    CustomerPhone,
    ShippingAddress,
    CoDAmount,
    ServiceID,
    Weight,
    Length,
    Width,
    Height,
    callback
) {
    request(GHN_url + '/CreateOrder', {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        json: {
            token: token,

            FromDistrictID: FromDistrictID,
            ToDistrictID: ToDistrictID,

            ClientContactName: ClientContactName,
            ClientContactPhone: ClientContactPhone,
            ClientAddress: ClientAddress,

            CustomerName: CustomerName,
            CustomerPhone: CustomerPhone,
            ShippingAddress: ShippingAddress,

            CoDAmount: CoDAmount,

            ServiceID: ServiceID,
            Weight: Weight,
            Length: Length,
            Width: Width,
            Height: Height,

            ReturnContactName: ClientContactName,
            ReturnContactPhone: ClientContactPhone,
            ReturnAddress: ClientAddress,
            ReturnDistrictID: FromDistrictID,
            ExternalReturnCode: ExternalReturnCode
        },
        method: 'post'

    },
        (err, docs) => {
            callback(docs.body)
        })
}
module.exports.CreateOrder = CreateOrder;

function OrderInfo() {

}
module.exports.OrderInfo = OrderInfo;

function CancelOrder() {

}
module.exports.CancelOrder = CancelOrder;

function SignIn(callback) {
    request(GHN_url + '/SignIn', {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        json: {
            token: token,
            FromDistrictID: FromDistrictID,
            ToDistrictID: ToDistrictID,
            Weight: Weight,
        },
        method: 'post'

    },
        (err, docs) => {
            callback(docs.body)
        })

}
module.exports.SignIn = SignIn;

function GetWards() {

}
module.exports.GetWards = GetWards;

function GetWards(token, DistrictID, callback) {
    request(GHN_url + '/GetWards', {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        json: {
            token: token,
            DistrictID: DistrictID,
        },
        method: 'post'

    },
        (err, docs) => {
            callback(docs.body)
        })
}
module.exports.GetWards = GetWards;