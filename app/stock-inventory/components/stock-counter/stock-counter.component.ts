import { Component, Input } from '@angular/core';

@Component({
    selector: 'stock-counter',
    styles: [`
        .stock-counter {
            background: rgba(0, 0, 0, 0.05);
            border-radius: 3px;
            overflow: hidden;
            & > div > div {
            display: inline-flex;
            align-items: center;
        
            & > div {
                display: inline-flex;
                flex-direction: column;
            }
            }
        
            p {
            font-size: 16px;
            font-weight: 400;
            text-align: center;
            width: 50px;
            }
        
            button {
            padding: 3px;
            border-radius: 0;
            line-height: 1;
            padding: 3px 7px;
            background: #9E61C8;
            color: #fff;
            font-weight: 500;
            &:disabled {
                background: rgba(0, 0, 0, 0.1);
                color: rgba(0, 0, 0, 0.4);
            }
            }
        }
    `],
    template: `
        <div class="stock-counter">
            <div>
                <div>
                    <div>
                        <p>{{ value }}</p>
                        <button 
                            type="button" 
                            (click)="increment()"
                            [disabled]="value === max">
                            +
                        </button>
                        <button 
                            type="button" 
                            (click)="decrement()"
                            [disabled]="value === min">
                            -
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `
})

export class StockCounterComponent {
    @Input() step: number = 10;
    @Input() min: number = 10;
    @Input() max: number = 1000;

    value: number = 0;

    increment() {
        if (this.value < this.max){
            this.value = this.value + this.step;
        }
    }

    decrement() {
        if (this.value > this.min){
            this.value = this.value - this.step;
        }
    }
}