import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { PageViewService } from './../../api/services/page-view/page-view.service';
import { Injectable } from '@angular/core';
import { DotRouterService } from './../../api/services/dot-router-service';

@Injectable()
export class PageViewResolver implements Resolve<any> {
    constructor(
        private dotRouterService: DotRouterService,
        private pageViewService: PageViewService
    ) {}

    /**
     * Route resolver for layout/:url
     * @param {ActivatedRouteSnapshot} route
     * @returns {Observable<any>}
     * @memberof PageViewResolver
     */
    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this.getPageView(route.queryParams.url);
    }

    private getPageView(url: string): Observable<any> {
        return this.pageViewService.get(url);
    }
}
