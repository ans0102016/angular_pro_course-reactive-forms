import { Component, Input, Output, EventEmitter } from '@angular/core'
import { FormGroup } from '@angular/forms';

import { Product } from '../../models/product.interface';


@Component({
    selector: 'stock-selector',
    styles: [`
        .stock-selector {
            padding: 0 0 20px;
            margin: 0 0 20px;
            border-bottom: 1px solid #ccc;
            position: relative;
        
            &__error {
            position: absolute;
            background: #B52D30;
            color: #fff;
            font-weight: 500;
            font-size: 12px;
            text-transform: uppercase;
            border-radius: 3px;
            left: 0;
            bottom: -10px;
            line-height: 1;
            padding: 6px 10px;
        
            &:before {
                width: 0;
                height: 0;
                border-style: solid;
                border-width: 0 5px 5px 5px;
                border-color: transparent transparent #B52D30 transparent;
                content: ' ';
                display: block;
                position: absolute;
                top: -5px;
                left: 10px;
            }
            }
        
            & > div {
            display: flex;
            align-items: center;
            justify-content: space-between;
        
            select {
                flex: 1 0;
            }
            button {
                flex: 0 0 100px;
                margin-left: 30px;
            }
            stock-counter {
                flex: 0 0 50px;
                margin-left: 30px;
            }
            }
        }
    `],
    template: `
        <div class="stock-selector" [formGroup]="parent">
            <div formGroupName="selector">
                <select formControlName="product_id">
                    <option value="">Select stock</option>
                    <option
                        *ngFor="let product of products"
                        [value]="product.id">
                        {{ product.name }}
                    </option>
                </select>
                <input  
                    type="number"
                    step="10"
                    min="10"
                    max="1000"
                    formControlName="quantity">
                <stock-counter
                    [step] = "10"
                    [min] = "10"
                    [max] = "1000">
                </stock-counter>
                <button 
                    type="button"
                    (click)="onAdd()">
                    Add Stock
                </button>
            </div>
        </div>
    `
})

export class StockSelectorComponent {
    @Input()
    parent: FormGroup;

    @Input()
    products: Product[];

    @Output() 
    added = new EventEmitter<any>();

    onAdd() {
        this.added.emit(this.parent.get('selector').value);
        this.parent.get('selector').reset({
            product_id: '',
            quantity: 10
        })
    }
}