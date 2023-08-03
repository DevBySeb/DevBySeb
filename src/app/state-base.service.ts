import {
  HttpClient,
  HttpContext,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, catchError, take, tap, throwError } from 'rxjs';

export interface ApiOptions {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  observe: 'events';
  context?: HttpContext;
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

export class StateBase<T> {
  resources: T[] = [];
  selectedResource: T | undefined = undefined;
  isLoading = false;
  errorsOnLoading = false;
  isLoadingUpdate = false;
  errorsOnUpdating = false;
  isLoadingDelete = false;
  errorsOnDeleting = false;
  isLoadingCreate = false;
  errorsOnCreate = false;
}

export enum BaseActions {
  Get = 'Get',
  Update = 'Update',
  Delete = 'Delete',
  Create = 'Create',
}

export type Actions<TCustomActions> = TCustomActions | BaseActions;

@Injectable({
  providedIn: 'root',
})
export class StateBaseService<T, StateClass extends StateBase<T>> {
  protected readonly http = inject(HttpClient);
  baseUrl = 'http://localhost:3000';
  key: keyof T = 'id' as keyof T;
  initialData: StateClass = new StateBase() as StateClass;
  state = signal<StateClass>(this.initialData);

  protected get(url: string, apiOptions?: ApiOptions): Observable<T[]> {
    this.updateState({ isLoading: true, errorsOnLoading: false });

    return this.http.get<T[]>(`${this.baseUrl}/${url}` /*, apiOptions*/).pipe(
      take(1),
      catchError((err) =>
        this._catchError(err, { errorsOnLoading: true, isLoading: false })
      ),
      tap((resources: T[]) =>
        this.updateState({
          resources,
          isLoading: false,
          errorsOnLoading: false,
        })
      )
    );
  }

  protected update(
    item: T,
    url: string,
    apiOptions?: ApiOptions
  ): Observable<T> {
    this.updateState({ isLoadingUpdate: true, errorsOnUpdating: false });

    return this.http
      .put<T>(`${this.baseUrl}/${url}`, item /*, apiOptions*/)
      .pipe(
        take(1),
        catchError((err) =>
          this._catchError(err, {
            errorsOnUpdating: true,
            isLoadingUpdate: false,
          })
        ),
        tap((item: T) => {
          const resources = this.upsertResource(item, this.state().resources);
          this.updateState({
            resources,
            isLoadingUpdate: false,
            errorsOnUpdating: false,
          });
        })
      );
  }

  protected create(
    item: T,
    url: string,
    apiOptions?: ApiOptions
  ): Observable<T> {
    this.updateState({ isLoadingCreate: true, errorsOnCreate: false });

    return this.http
      .post<T>(`${this.baseUrl}/${url}`, item /*, apiOptions*/)
      .pipe(
        take(1),
        catchError((err) =>
          this._catchError(err, {
            errorsOnCreate: true,
            isLoadingCreate: false,
          })
        ),
        tap((item: T) => {
          const resources = this.upsertResource(item, this.state().resources);
          this.updateState({
            resources,
            isLoadingCreate: false,
            errorsOnCreate: false,
          });
        })
      );
  }

  protected delete(
    item: T,
    url: string,
    apiOptions?: ApiOptions
  ): Observable<void> {
    this.updateState({ isLoadingDelete: true, errorsOnDeleting: false });

    return this.http
      .delete<void>(`${this.baseUrl}/${url}` /*, apiOptions*/)
      .pipe(
        take(1),
        catchError((err) =>
          this._catchError(err, {
            errorsOnDeleting: true,
            isLoadingDelete: false,
          })
        ),
        tap(() => {
          const resources = this.state().resources.filter(
            (r) => r[this.key] !== item[this.key]
          );
          this.updateState({
            resources,
            isLoadingDelete: false,
            errorsOnDeleting: false,
          });
        })
      );
  }

  protected upsertResource(item: T, resources: T[]): T[] {
    const index = resources.findIndex((i) => i[this.key] === item[this.key]);
    index > -1 ? (resources[index] = item) : resources.push(item);
    return resources;
  }

  protected updateState(newState: Partial<StateBase<T>> | Partial<StateClass>) {
    this.state.set({
      ...this.state(),
      ...newState,
    });
  }

  protected _catchError(
    err: any,
    newState: Partial<StateBase<T>> | Partial<StateClass>
  ) {
    this.updateState(newState);
    return throwError(() => new Error(err.message));
  }
}
