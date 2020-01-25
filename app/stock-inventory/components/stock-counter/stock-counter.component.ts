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
      &.focused {
        box-shadow: 0 1px 1px rgba(0,0,0,.3);
      }
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
    <div class="stock-counter"
    [class.focused]="focus">
      <div>
        <div
        tabindex="0"
          (keydown)="onKeyDown($event)"
          (blur)="onBlur($event)"
          (focus)="onFocus($event)">
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

  focus: boolean;

  onKeyDown(event: KeyboardEvent) {
    const handlers = {
      ArrowDown: () => this.decrement()
      ArrowUp: () => this.increment()
    };

    if (handlers[event.code]) {
      handlers[event.code]();
      event.preventDefault();
      event.stopPropagation();
    }
    this.onTouch();
  }

  onBlur(event: FocusEvent){
    this.focus = false;
    event.preventDefault();
    event.stopPropagation();
    this.onTouch();
  }

  onFocus(event: FocusEvent) {
    this.focus = true;
    event.preventDefault();
    event.stopPropagation();
    this.onTouch();
  }

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