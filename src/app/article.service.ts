import { Injectable } from '@angular/core';
import {
  Actions,
  BaseActions,
  StateBase,
  StateBaseService,
} from './state-base.service';
import { Observable, catchError, tap } from 'rxjs';

export interface Article {
  id?: number;
  title: string;
  content: string;
}

class ArticleState extends StateBase<Article> {
  isLoadingCustomData = false;
  errorsLoadingCustomData = false;
}

export enum ArticleActions {}

@Injectable({
  providedIn: 'root',
})
export class ArticleService extends StateBaseService<Article, ArticleState> {
  override initialData = new ArticleState();

  myCustomHttpCall(): Observable<Article[]> {
    this.updateState({
      isLoadingCustomData: true,
      errorsLoadingCustomData: false,
    });
    return this.http.get<Article[]>(`${this.baseUrl}/articles`).pipe(
      catchError((err) =>
        this._catchError(err, {
          isLoadingCustomData: false,
          errorsLoadingCustomData: true,
        })
      ),
      tap((resources) => {
        this.updateState({
          resources,
          isLoadingCustomData: false,
          errorsLoadingCustomData: false,
        });
      })
    );
  }

  override get(): Observable<Article[]> {
    return super.get('articles');
  }

  override update(payload: Article, url = 'articles'): Observable<Article> {
    return super.update(payload, `${url}/${payload.id}`);
  }

  override create(payload: Article, url = 'articles'): Observable<Article> {
    return super.create(payload, url);
  }

  override delete(payload: Article, url = 'articles'): Observable<void> {
    return super.delete(payload, `${url}/${payload.id}`);
  }
}
