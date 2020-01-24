import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs-compat';

import 'rxjs-compat/add/operator/map';
import 'rxjs-compat/add/operator/catch';
import 'rxjs-compat/add/observable/throw';

import { Item, Product } from '../models/product.interface';

@Injectable()
export class StockInventoryService {
    constructor(
        private http: Http
    ){}

    getCartItems() :Observable<Item []> {
        return this.http
            .get('/api/cart')
            .map((response: Response) => response.json())
            .catch((error: any)=> Observable.throw(error.json()));
    }

    getProducts() :Observable<Product[]> {
        return this.http
            .get('/api/products')
            .map((response: Response) => response.json())
            .catch((error: any)=> Observable.throw(error.json()));
    }
}