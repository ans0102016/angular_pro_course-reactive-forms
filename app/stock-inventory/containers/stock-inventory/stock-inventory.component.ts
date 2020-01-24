import { Component } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';

import { Product } from '../../models/product.interface';

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
                    [products]="products">
                </stock-selector>

                <stock-products
                    [parent] = "form">
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

export class StockInventoryComponent {
    products: Product[] = [
        { "id": 1, "price": 2800, "name": "Macbook Pro" },
        { "id": 1, "price": 50, "name": "USB-C Adaptor" },
        { "id": 1, "price": 400, "name": "iPod" },
        { "id": 1, "price": 900, "name": "iPhone" },
        { "id": 1, "price": 600, "name": "Apple Watch" },
    ];

    form = new FormGroup({
        store: new FormGroup({
            branch: new FormControl('B182'),
            code: new FormControl('1234')
        }),
        selector: this.createStock({}),
        stock: new FormArray([
            this.createStock({product_id: 1, quantity: 10}),
            this.createStock({product_id: 3, quantity: 50})
        ])
    });

    createStock(stock) {
        return new FormGroup({
            product_id: new FormControl(parseInt(stock.product_id, 10) || 3),
            quantity: new FormControl(stock.quantity || 10)
        })
    }

    onSubmit() {
        console.log('Submit', this.form.value)
    }
}