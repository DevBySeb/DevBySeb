import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';

interface IResourceBaseObject {
  id?: number;
}

type ResourceType<T> = T & IResourceBaseObject;

@Injectable({
  providedIn: 'root',
})
export class ResourceService<T> {
  http = inject(HttpClient);
  resources = signal<ResourceType<T>[]>([]);

  protected setResources = (resources: ResourceType<T>[]) => {
    this.resources.set(resources);
  };

  protected upsertResource = (resource: ResourceType<T>) => {
    const index = this.resources().findIndex((todo) => todo.id === resource.id);
    if (index === -1) {
      this.resources.set([...this.resources(), resource]);
      return;
    }

    this.resources.mutate((resources) => (resources[index] = resource));
  };

  protected removeResource = (id: number) => {
    this.resources.set(
      this.resources().filter((resource) => resource.id !== id)
    );
  };
}
