import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'stock-branch',
    styles: ['stock-branch.component.scss'],
    template: `
        <div class="stock-inventory" [formGroup]="parent">
            <div formGroupName="store">
                Branch ID
                <input 
                type="text" 
                placeholder="Branch ID"
                formControlName="branch">
                Manager
                <input 
                type="text" 
                placeholder="Manager Code"
                formControlName="code">
            </div>
        </div>
    `
})

export class StockBranchComponent {
    @Input()
    parent: FormGroup;
}