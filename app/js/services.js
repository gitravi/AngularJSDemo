'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
    .service('customerService', function () {
        // private variable
        this._customers = [{ name: 'AAA', city: 'XXX'}];

        this.getCustomers = function () {
            return this._customers;
        }

        this.addCustomers = function (customer) {
            console.log("Pushed");
            console.log(customer);
            return this._customers.push(customer);
        }
    }).service('customerAddressService', function () {
        //private 
        var customerAddress = [];
        this.getGustomerAddress = function (customerName) {
            return jQuery.grep(customerAddress, function (cust) {
                return cust.name === customerName;
            });
        }
        this.setCustomerAddress= function(customerAddress) {
            customerAddress.push(customerAddress);
        }

});
