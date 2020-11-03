import { HttpClient } from '@angular/common/http';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContainerModel } from './models/container.model';
import { ImageModel } from './models/image.model';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    constructor(private httpClient: HttpClient) { }
    getAllContainers(): Observable<ContainerModel[]> {
        return this.httpClient.get<ContainerModel[]>('http://104.41.5.36:2375/containers/json');
    }
    createContainer(container: ContainerModel): Observable<any> {
        return this.httpClient.post<any>('http://104.41.5.36:2375/containers/create?name=' + container.Hostname, container);
    }
    startContainer(container: ContainerModel): Observable<any> {
        return this.httpClient.post<any>('http://104.41.5.36:2375/containers/' + container.Hostname + '/start', null);
    }
    getAllImages(): Observable<ImageModel[]> {
        return this.httpClient.get<ImageModel[]>('http://104.41.5.36:2375/images/json');
    }
    pullImage(name: string, versao: string): Observable<any> {
        if (!versao.trim())
            versao = "latest"
        return this.httpClient.post<any>('http://104.41.5.36:2375/images/create?fromImage=' + name + ":" + versao, null);
    }
    deleteImage(id: string) {
        return this.httpClient.delete<any>('http://104.41.5.36:2375/images/' + id + "?force=true");
    }
    deleteContainer(id: string) {
        return this.httpClient.delete<any>('http://104.41.5.36:2375/containers/' + id + "?force=true");
    }

    deleteContainersParados() {
        return this.httpClient.post<any>('http://104.41.5.36:2375/containers/prune', null);
    }
    deleteImagesUnused() {
        return this.httpClient.post<any>('http://104.41.5.36:2375/images/prune', null);
    }
}