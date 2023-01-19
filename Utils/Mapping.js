const nodegeocoder=require("node-geocoder");

const opitions={
    provider:"mapquest",
    httpAdapter:"https",
    apiKey:"msLfC6MUStnwoYuJefxfBOQYLnPck0PW",
    formatter:null
}

const geocoder=nodegeocoder(opitions)

module.exports=geocoder;
