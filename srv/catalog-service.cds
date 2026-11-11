using breezee from '../db/schema';

service CatalogService {

    entity Products as projection on breezee.Products;

}