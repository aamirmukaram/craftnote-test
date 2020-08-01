import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
  ViewChild
} from '@angular/core';
import * as d3 from 'd3';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';

export interface BarchartData {
  name: string;
  value: number;
}

const WINDOW_RESIZE_DEBOUNCE = 500;

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarchartComponent implements AfterViewInit, OnDestroy {
  @ViewChild('svgRef')
  svgRef: ElementRef<SVGElement>;

  private destroyed$: Subject<boolean> = new Subject<boolean>();

  private barchartData: BarchartData[];

  get data(): BarchartData[] {
    return this.barchartData;
  }

  @Input() set data(value: BarchartData[]) {
    this.barchartData = value;
    if (this.viewInit) {
      this.initDomains();
      this.drawBarChart();
    }
  }

  @Input()
  yAxisText;

  width = 1;

  get height(): number {
    return this.width / 2.5;
  }

  private resizeEventSubject$ = new Subject<void>();
  private resizeEvent$ = this.resizeEventSubject$.asObservable().pipe(debounceTime(WINDOW_RESIZE_DEBOUNCE));
  private margin = {top: 20, right: 20, bottom: 30, left: 40};
  private x = d3.scaleBand().padding(0.1);
  private y = d3.scaleLinear();
  private svg: any;
  private svgMainGroup: any;
  private viewInit = false;

  constructor(private renderer: Renderer2, private eleRef: ElementRef, private cdr: ChangeDetectorRef) {
  }


  ngAfterViewInit(): void {
    this.width = (this.eleRef.nativeElement as Element).clientWidth;
    this.svg = d3.select(this.svgRef.nativeElement);

    this.initBarChart();
    this.initDomains();
    this.drawBarChart();

    this.listenResize()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        this.drawBarChart();
      });
    this.viewInit = true;
  }

  private listenResize(): Observable<void> {
    this.renderer.listen('window', 'resize', () => {
      this.resizeEventSubject$.next();
    });
    return this.resizeEvent$;
  }

  private initDomains(): void {
    const x = this.x;
    const y = this.y;

    x.domain(this.data.map(d => d.name));
    y.domain([0, d3.max(this.data, d => +d.value)]);
  }

  private initBarChart(): void {
    const svg = this.svg;
    const margin = this.margin;

    const g = this.svgMainGroup = svg.append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    g.append('g')
      .attr('class', 'axis axis--x');

    g.append('g')
      .attr('class', 'axis axis--y');

    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -margin.left)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text(this.yAxisText);
  }

  private drawBarChart(): void {
    this.width = (this.eleRef.nativeElement as Element).clientWidth;
    const margin = this.margin;
    const width = this.width - margin.left - margin.right;
    const height = this.height - margin.top - margin.bottom;
    const x = this.x;
    const y = this.y;
    const g = this.svgMainGroup;

    x.rangeRound([0, width]);
    y.rangeRound([height, 0]);

    g.select('.axis--x')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));

    g.select('.axis--y')
      .call(d3.axisLeft(y).ticks(10));

    const bars = g.selectAll('.bar')
      .data(this.data);

    bars
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.name))
      .attr('y', (d) => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', (d) => (height - y(d.value)));

    bars.attr('x', (d) => x(d.name))
      .attr('y', (d) => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - y(d.value));

    bars.exit()
      .remove();

    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }

}
