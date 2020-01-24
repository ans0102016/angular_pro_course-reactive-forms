import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms'

@Component({
    selector: 'stock-products',
    styles: ['stock-products.component.scss'],
    template: `
        <div class="stock-selector" [formGroup]="parent">
            
        </div>
    `
})

export class StockProductsComponent {
    @Input()
    parent: FormGroup;
}