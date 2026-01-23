import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appHighlight]',
    standalone: true
})
export class HighlightDirective implements OnChanges {
    @Input('appHighlight') status: string = '';

    constructor(private el: ElementRef, private renderer: Renderer2) { }

    ngOnChanges() {
        this.updateColor();
    }

    private updateColor() {
        let color = '#95a5a6'; // Default gray
        let bgColor = '#ecf0f1';

        switch (this.status.toLowerCase()) {
            case 'available':
                color = '#27ae60';
                bgColor = '#e8f8f5';
                break;
            case 'busy':
                color = '#e74c3c';
                bgColor = '#fdedec';
                break;
            case 'on leave':
                color = '#f39c12';
                bgColor = '#fef9e7';
                break;
        }

        this.renderer.setStyle(this.el.nativeElement, 'color', color);
        this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', bgColor);
        this.renderer.setStyle(this.el.nativeElement, 'fontWeight', 'bold');
        this.renderer.setStyle(this.el.nativeElement, 'padding', '4px 8px');
        this.renderer.setStyle(this.el.nativeElement, 'borderRadius', '4px');
    }
}
