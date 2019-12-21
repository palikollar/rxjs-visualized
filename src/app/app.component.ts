import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import { fromEvent, Observable } from "rxjs";
import { ICanvasStream } from "src/core/canvas-linear-graph/CanvasStream.interface";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  @ViewChild("clickMeButton", { static: true }) _clickMeButton: ElementRef<
    HTMLButtonElement
  >;

  ngOnInit() {
    const clickMeStream$ = fromEvent(
      this._clickMeButton.nativeElement,
      "click"
    );

    this.canvasStream.push({
      name: "click me button",
      stream$: clickMeStream$,
      color: "#0f0f0f"
    });
  }

  streams = [
    { title: "stream 1", color: "#000", stream: [1000, 2000, 3000, 4000] },
    {
      title: "stream 1",
      color: "#f0f0f0",
      stream: [1000, 2000, 3000, 5000, 10000]
    }
  ];

  canvasStream: ICanvasStream[] = [];
}
