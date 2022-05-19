import { Component, OnInit, Output, forwardRef, Input } from "@angular/core";
import { EventEmitter } from '@angular/core';
import { Subject, Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";
import {
    NG_VALUE_ACCESSOR,
    ControlValueAccessor,
    FormControl,
} from "@angular/forms";

const noop = () => { };
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent),
    multi: true,
};
@Component({
    selector: "app-input",
    templateUrl: "./index.html",
    styleUrls: ['./index.scss'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
})
export class InputComponent implements ControlValueAccessor, OnInit {
    @Input() mask: String = " ";
    @Input() minLength: number = 0;
    @Input() maxLength: number = 255;
    @Input() type: String = "text";
    @Input() disabled: boolean = false;
    @Input() required: boolean = false;
    @Input() placeholder: String = "...";
    @Input() label: string;
    @Output() onblur = new EventEmitter();
    showDrop = false;
    modelChanged: Subject<string> = new Subject<string>();
    formSelect = new FormControl();
    formCtrlSub: Subscription;
    subject: Subject<any> = new Subject();
    //The internal data model
    private innerValue: String = " ";
    //Placeholders for the callbacks which are later provided
    //by the Control Value Accessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;
    constructor(private peopleRepository: PeopleRepository) { }
    ngOnInit(): void {
    }
    ngOnDestroy() {
    }
    blur() {
        this.onblur.emit(null);
    }
    clear() {
        this.innerValue = " ";
        this.onChangeCallback(this.innerValue);
    }
    async evento(e) {
        //console.log(e);
        if (e == "blur") {
        } else if (e == "focus") {
            this.showDrop = true;
        } else if (e == "keyup") {
            //console.log(this.value)
            this.modelChanged.next(this.value);
        } else if (e == "keydown") {
        }
    }
    //get accessor
    get value(): any {
        return this.innerValue;
    }
    //set accessor including call the onchange callback
    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }
    writeValue(value: any) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }