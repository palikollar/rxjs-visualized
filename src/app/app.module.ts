import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CanvasLinearGraphModule } from "src/core/canvas-linear-graph/canvas-linear-graph.module";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, CanvasLinearGraphModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
