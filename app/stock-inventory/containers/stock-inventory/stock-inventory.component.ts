import { Component } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';

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
                    [parent] = "form">
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
    form = new FormGroup({
        store: new FormGroup({
            branch: new FormControl('B182'),
            code: new FormControl('1234')
        }),
        selector: new FormGroup({
            product_id: new FormControl(''),
            quantity: new FormControl(10)
        }),
        stock: new FormArray([])
    })

    onSubmit() {
        console.log('Submit', this.form.value)
    }
}