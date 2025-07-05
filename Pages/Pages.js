class PageLocators {
    constructor() {
        this.url = "https://rahulshettyacademy.com/client/";
        this.loginButton = "#login";
        this.usernameInput = "#userEmail";
        this.passwordInput = "#userPassword";
        this.LoginSuccesssLogo = "xpath=//p[contains(text(),'Automation Practice')]";
        this.productLocater = "xpath=//h5/b[contains(text(),'ZARA COAT 3')]"
        this.productAddToCartButton = "xpath=//h5/b[contains(text(),'ZARA COAT 3')]/ancestor::h5/following-sibling::button[2]";
        this.myCartButton = "xpath=//button[@class='btn btn-custom']";
        this.myCartLogo = '//h1[contains(text(), "My Cart")]';
        this.checkOutButton = "xpath=//button[contains(text(),'Checkout')]";
        this.cardNumberInput = "xpath=//div[contains(text(),'Credit Card Number ')]/following-sibling::input";
        this.cardCvvNumber = "xpath=//div[contains(text(),'CVV Code ')]/following-sibling::input";
        this.cardHolderName = "xpath=//div[contains(text(),'Name on Card ')]/following-sibling::input";
        this.deliveryLocation = ".user__address input";
        this.delievryIndiaLocation = "xpath=//span[contains(text(),' India')]";
        this.placeOrderButton = "xpath=//a[contains(text(),'Place Order ')]";
        this.postOrderValidation = "//h1[contains(text(),' Thankyou for the order. ')]";
        this.orderIdLocater = ".ng-star-inserted";
        this.orderHistoryPage = "[routerlink$='/myorders']";
        this.orderHistoryTable = "[scope$='row']";
    }


}

module.exports = PageLocators;
