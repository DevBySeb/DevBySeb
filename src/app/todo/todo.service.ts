import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ResourceService } from './resource.service';

export interface IPost {
  id?: number;
  title: string;
}
@Injectable({
  providedIn: 'root',
})
export class TodoService extends ResourceService<IPost> {
  getPosts(): Observable<IPost[]> {
    return this.http
      .get<IPost[]>('http://localhost:3000/posts')
      .pipe(tap(this.setResources));
  }

  createPost(post: IPost): Observable<IPost> {
    delete post.id;
    return this.http
      .post<IPost>('http://localhost:3000/posts', post)
      .pipe(tap(this.upsertResource));
  }

  updatePost(post: IPost): Observable<IPost> {
    return this.http
      .put<IPost>(`http://localhost:3000/posts/${post.id}`, post)
      .pipe(tap(this.upsertResource));
  }

  deletePost(id: number): Observable<IPost> {
    return this.http
      .delete<IPost>(`http://localhost:3000/posts/${id}`)
      .pipe(tap(() => this.removeResource(id)));
  }
}
