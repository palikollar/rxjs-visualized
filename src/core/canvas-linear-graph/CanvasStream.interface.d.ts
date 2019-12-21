import { Observable } from "rxjs";

export interface ICanvasStream {
  name: string;
  color: string;
  stream$: Observable<any>;
}
