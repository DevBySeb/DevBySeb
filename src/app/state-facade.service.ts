import { Injectable, inject } from '@angular/core';
import { ArticleService } from './article.service';

@Injectable({
  providedIn: 'root',
})
export class StateFacadeService {
  readonly article = inject(ArticleService);
}
