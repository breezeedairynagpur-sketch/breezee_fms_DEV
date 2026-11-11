namespace breezee;

entity Products {
    key ID       : Integer;
        name     : String(100);
        category : String(100);
        price    : Decimal(10,2);
        stock    : Integer;
        status   : String(30);
}