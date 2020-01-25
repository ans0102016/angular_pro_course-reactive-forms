import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'stock-branch',
    styles: [`
        :host {
            border-bottom: 1px solid #ccc;
            margin: 0 0 20px;
            padding: 0 0 20px;
            display: block;
        }
        .error {
            background: #B52D30;
            color: #fff;
            font-weight: 500;
            font-size: 12px;
            text-transform: uppercase;
            border-radius: 0 0 3px 3px;
            line-height: 1;
            padding: 6px 10px;
            margin-top: -1px;
        }
    `],
    template: `
        <div class="stock-inventory" [formGroup]="parent">
            <div formGroupName="store">
                <input 
                type="text" 
                placeholder="Branch ID"
                formControlName="branch">
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