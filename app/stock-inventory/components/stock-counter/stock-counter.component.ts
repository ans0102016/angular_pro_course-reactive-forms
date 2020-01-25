import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const COUNTER_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => StockCounterComponent),
  multi: true
};

@Component({
  selector: 'stock-counter',
  providers: [COUNTER_CONTROL_ACCESSOR],
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
          <p>{{ value }}</p>
          <div>
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
export class StockCounterComponent implements ControlValueAccessor {

  private onTouch: Function;
  private onModelChange: Function;

  registerOnTouched(fn) {
    this.onTouch = fn;
  }
  
  registerOnChange(fn) {
    this.onModelChange = fn;
  }
  
  writeValue(value) {
    this.value = value || 0;
  }

  @Input() step: number = 10;
  @Input() min: number = 10;
  @Input() max: number = 1000;

  value: number = 10;

  increment() {
    if (this.value < this.max) {
      this.value = this.value + this.step;
      this.onModelChange(this.value);
    }
    this.onTouch();
  }
  decrement() {
    if (this.value > this.min) {
      this.value = this.value - this.step;
      this.onModelChange(this.value);
    }
    this.onTouch();
  }
}