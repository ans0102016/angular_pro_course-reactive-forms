import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { Observable } from 'rxjs-compat';
import 'rxjs-compat/add/observable/forkJoin';

import { StockInventoryService } from '../../services/stock-inventory.service';
import { Product, Item } from '../../models/product.interface';

@Component({
    selector: 'stock-inventory',
    styles: ['stock-inventory.component.ts'],
    template: `
        <div class="stock-inventory">
            <form [formGroup]="form" (ngSubmit)="onSubmit()">
                <stock-branch
                    [parent] = "form">
                </stock-branch>

                <stock-selector
                    [parent] = "form"
                    [products]="products"
                    (added) = "addStock($event)">
                </stock-selector>

                <stock-products
                    [parent] = "form"
                    [map] = "productMap"
                    (removed)="removeStock($event)">
                </stock-products>
            </form>
            <div class="stock-inventory__buttons">
                <button 
                    type="submit"
                    [disabled]="form.invalid">
                    Order stock
                </button>
            </div>
            <pre>{{ form.value | json }}</pre>
        </div>
    `
})

export class StockInventoryComponent implements OnInit {
    products: Product[] = [];

    productMap: Map<number, Product>;

    constructor(
        private fb: FormBuilder,
        private stockService: StockInventoryService
    ) {}

    ngOnInit() {
        const cart = this.stockService.getCartItems();
        const products = this.stockService.getProducts();

        Observable
            .forkJoin(cart, products)
            .subscribe(([cart, products]: [Item[], Product[]]) => {
                const myMap = products
                    .map<[number, Product]>(product => [product.id, product]);
                this.productMap = new Map<number, Product>(myMap);
                this.products = products;
                cart.forEach(item => this.addStock(item));
            });
    }

    form = this.fb.group({
        store: this.fb.group({
            branch: '',
            code: ''
        }),
        selector: this.createStock({}),
        stock: this.fb.array ([])
    });

    createStock(stock) {
        return this.fb.group({
            product_id: parseInt(stock.product_id, 10) || '',
            quantity: stock.quantity || 10
        })
    }

    addStock(stock) {
        const control = this.form.get('stock') as FormArray;
        control.push(this.createStock(stock));
    }

    removeStock({ group, index }: {group: FormGroup, index: number}) {
        const control = this.form.get('stock') as FormArray;
        control.removeAt(index);

    }

    onSubmit() {
        console.log('Submit', this.form.value)
    }
}