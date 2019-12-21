import {
  Component,
  ViewChild,
  AfterViewInit,
  ElementRef,
  Input,
  OnDestroy
} from "@angular/core";
import { ICanvasStream } from "./CanvasStream.interface";
import { map } from "rxjs/operators";
import { Subscription } from "rxjs";

@Component({
  selector: "app-canvas-linear-graph",
  templateUrl: "./canvas-linear-graph.component.html",
  styleUrls: ["./canvas-linear-graph.component.scss"]
})
export class CanvasLinearGraphComponent implements AfterViewInit, OnDestroy {
  private context: CanvasRenderingContext2D;
  @ViewChild("container", { static: true })
  container: ElementRef;
  @ViewChild("canvasId", { static: true })
  canvasElement: ElementRef;

  @Input("streams") streams: ICanvasStream[];

  private height: number;
  private width: number;
  private values: number[][] = [];

  constructor() {}

  ngAfterViewInit() {
    this.width = (this.container.nativeElement as HTMLDivElement).clientWidth;
    this.height = (this.container.nativeElement as HTMLDivElement).clientHeight;

    this.context = (this.canvasElement
      .nativeElement as HTMLCanvasElement).getContext("2d");

    this.context.canvas.width = this.width;
    this.context.canvas.height = this.height;

    this._makeCalculations();

    this._subscribeToStreams();

    window.requestAnimationFrame(() => this.draw(this.context));
  }

  ngOnDestroy() {
    this._subscriptions.forEach(s => s.unsubscribe());
  }

  draw(ctx: CanvasRenderingContext2D) {
    this._calc.currentFrame++;
    ctx.clearRect(0, 0, this.width, this.height); // clear canvas
    // do stuff
    ctx.beginPath();

    this._drawStreamLines(ctx);
    this._drawStreamCircles(ctx);

    ctx.closePath();

    window.requestAnimationFrame(() => this.draw(ctx));
  }

  private _drawStreamLines(ctx: CanvasRenderingContext2D) {
    this.streams.forEach((s, i) => {
      const posY = this.calcPosY(i);
      ctx.beginPath();
      ctx.strokeStyle = "#000";
      ctx.moveTo(0, posY);
      ctx.lineTo(this.width, posY);
      ctx.stroke();
      ctx.closePath();
    });
  }

  private _drawStreamCircles(ctx: CanvasRenderingContext2D) {
    this.values.forEach((s, i) => {
      s.forEach(n => {
        if (this._calc.currentFrame + this._calc.circleRadius < n) {
          const posY = this.calcPosY(i);
          ctx.beginPath();
          ctx.strokeStyle = this.streams[i].color;
          ctx.arc(
            n - this._calc.currentFrame,
            posY,
            this._calc.circleRadius,
            0,
            Math.PI * 2,
            false
          );
          ctx.fillStyle = this.streams[i].color;
          ctx.fill();
          ctx.stroke();
          ctx.closePath();
        }
      });
    });
  }

  private _subscribeToStreams() {
    this.streams.forEach((canvasStream: ICanvasStream, index: number) => {
      this.values.push([]); // canvas will draw these dots from this array
      this._subscriptions.push(
        canvasStream.stream$
          .pipe(
            map(e =>
              this.values[index].push(this._calc.currentFrame + this.width)
            )
          )
          .subscribe()
      );
    });
  }

  private calcPosY(streamIndex: number) {
    return this._calc.spacing * (streamIndex + 1);
  }

  private _calc: {
    spacing: number;
    currentFrame: number;
    circleRadius: number;
  } = { spacing: 0, currentFrame: 0, circleRadius: 10 };
  private _subscriptions: Subscription[] = [];

  private _makeCalculations() {
    this._calc.spacing = (this.height / this.streams.length + 1) * 0.9;
    this._calc.circleRadius = this.height * 0.05;
  }
}
