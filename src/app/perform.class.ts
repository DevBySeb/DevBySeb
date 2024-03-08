import { SettableSignal, signal } from '@angular/core';
import { Observable, catchError, finalize, tap, throwError } from 'rxjs';

export class Perform<TData> {
  #isLoading = signal(false);
  #hasError = signal(false);
  #data = signal<undefined | TData>(undefined);
  #action$: Observable<TData>;

  get action$(): Observable<TData> {
    return this.#action$;
  }

  get data(): SettableSignal<TData | undefined> {
    return this.#data;
  }

  get isLoading(): SettableSignal<boolean> {
    return this.#isLoading;
  }

  get hasError(): SettableSignal<boolean> {
    return this.#hasError;
  }

  constructor(action$: Observable<TData>) {
    this.#isLoading.set(true);
    this.#action$ = action$.pipe(
      tap((data: TData) => {
        this.#data.set(data);
        this.#hasError.set(false);
      }),
      catchError((err: any) => {
        this.#hasError.set(true);
        // Error handelning => ...
        return throwError(() => new Error(err.message));
      }),
      finalize(() => {
        this.#isLoading.set(false);
      })
    );
  }
}
