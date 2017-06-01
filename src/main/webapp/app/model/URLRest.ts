import { Injectable } from '@angular/core';

@Injectable()
export class URLRest {
    private url: string;

    constructor() {
        this.url = 'http://localhost:8080/';
    }

    getUrl(): string {
        return this.url;
    }
}