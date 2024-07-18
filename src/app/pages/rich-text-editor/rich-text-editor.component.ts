import { Component, forwardRef, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RichTextEditorComponent),
      multi: true
    }
  ]
})
export class RichTextEditorComponent implements ControlValueAccessor {
  @ViewChild('editorContent') editorContentRef!: ElementRef;

  content: string = '';
  safeContent: SafeHtml = '';

  constructor(private sanitizer: DomSanitizer) {}

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  ngAfterViewInit() {
    // Lógica que depende de la inicialización de la vista
    if (this.content) {
      this.safeContent = this.sanitizer.bypassSecurityTrustHtml(this.content);
      this.editorContentRef.nativeElement.innerHTML = this.content;
    }
  }


  execCommand(command: string) {
    document.execCommand(command);
    this.updateContent();
  }

  execCommandWithValue(command: string, value: string) {
    document.execCommand(command, false, value);
    this.updateContent();
  }

  updateContent() {
    const editorContent = this.editorContentRef.nativeElement.innerHTML;
    this.content = editorContent;
    this.safeContent = this.sanitizer.bypassSecurityTrustHtml(this.content);
    this.onChange(this.content); // Notifica el cambio a ngModel
    this.onTouched(); // Marca como tocado para validaciones
  }

  // Métodos del ControlValueAccessor
  writeValue(value: any): void {
    if (value !== undefined) {
      this.content = value;
      this.safeContent = this.sanitizer.bypassSecurityTrustHtml(this.content);
      if(this.content){
        this.editorContentRef.nativeElement.innerHTML = this.content; // Actualiza el contenido del editor

      }
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (this.editorContentRef) {
      const editor = this.editorContentRef.nativeElement;
      editor.setAttribute('contenteditable', (!isDisabled).toString());
    }
  }

  getContent(): string {
    return this.content;
  }

  clearContent(): void {
    this.content = '';
    if (this.editorContentRef) {
      this.editorContentRef.nativeElement.innerHTML = '';
    }
    this.onChange(this.content);
    this.onTouched();
  }
}
