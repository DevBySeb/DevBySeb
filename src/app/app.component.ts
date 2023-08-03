import { Component, OnInit, inject } from '@angular/core';
import { Article, ArticleService } from './article.service';
import { StateFacadeService } from './state-facade.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular';
  stateFacade = inject(StateFacadeService);
  fb = new FormBuilder();
  form = this.fb.group({
    id: this.fb.control<number>(-1, { nonNullable: true }),
    title: this.fb.control<string>('', { nonNullable: true }),
    content: this.fb.control<string>('', { nonNullable: true }),
  });

  ngOnInit() {
    this.stateFacade.article.myCustomHttpCall().subscribe();
  }

  toggleEdit(article: Article): void {
    this.form.patchValue(article);
  }

  createOrUpdate(): void {
    const article = this.form.value as Article;
    const isCreate = article.id === -1;
    if (isCreate) delete article.id;
    isCreate
      ? this.stateFacade.article.create(article).subscribe()
      : this.stateFacade.article.update(article).subscribe();

    this.form.reset();
  }

  deleteArticle(article: Article): void {
    this.stateFacade.article.delete(article).subscribe();
  }
}
