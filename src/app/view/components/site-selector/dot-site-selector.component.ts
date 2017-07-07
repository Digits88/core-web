import { Component, ViewEncapsulation, ViewChild, forwardRef, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { DotcmsConfig } from '../../../api/services/system/dotcms-config';
import { Site } from '../../../api/services/site-service';
import { SiteService } from '../../../api/services/site-service';
import { MessageService } from '../../../api/services/messages-service';
import { BaseComponent } from '../_common/_base/base-component';
import { AutoComplete } from 'primeng/primeng';
import { IframeOverlayService } from '../../../api/services/iframe-overlay-service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SearchableDropdownComponent } from '../_common/searchable-dropdown/component';
import { PaginatorService } from '../../../api/services/paginator';

/**
 * It is dropdown of sites, it handle pagination and global search
 * @export
 * @class SiteSelectorComponent
 * @implements {ControlValueAccessor}
 */
@Component({
    encapsulation: ViewEncapsulation.None,
    providers: [
        PaginatorService,
        SearchableDropdownComponent,
        {
            multi: true,
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SiteSelectorComponent)
        }
    ],
    selector: 'dot-site-selector-component',
    styles: [require('./dot-site-selector.component.scss')],
    templateUrl: 'dot-site-selector.component.html',
})
export class SiteSelectorComponent implements ControlValueAccessor {

    private static readonly MIN_CHARECTERS_TO_SERACH = 3;

    @ViewChild('searchableDropdown') searchableDropdown: SearchableDropdownComponent;
    @Output() change: EventEmitter<Site> = new EventEmitter();

    public value: string;
    private currentSite: Site;
    private sitesCurrentPage: Site[];
    private filteredSitesResults: Array<any>;
    private paginationPage = 1;
    private paginationPerPage: number;
    private paginatorLinks: number;
    private paginationQuery = '';
    private totalRecords: number;

    propagateChange = (_: any) => {};

    constructor(private siteService: SiteService, private config: DotcmsConfig, private iframeOverlayService: IframeOverlayService,
        private paginationService: PaginatorService) {

    }

    ngOnInit(): void {
        this.paginationService.url = 'v1/site';
        this.paginateSites();

        this.currentSite = this.siteService.currentSite;
        this.siteService.switchSite$.subscribe(site => this.currentSite = site);
    }

    /**
     * Call when the global serach changed
     * @param {any} filter
     * @memberof SiteSelectorComponent
     */
    handleFilterChange(filter): void {
        this.paginateSites(filter);
    }

    /**
     * Call when the current page changed
     * @param {any} event
     * @memberof SiteSelectorComponent
     */
    handlePageChange(event): void {
        this.paginateSites(event.filter, event.first);
    }

    /**
     * Call to load a new page.
     * @param {string} [filter='']
     * @param {number} [page=1]
     * @memberof SiteSelectorComponent
     */
    paginateSites(filter = '',  offset = 0): void {
        this.paginationService.filter = filter;
        this.paginationService.getWithOffset(offset).subscribe( items => {
            this.sitesCurrentPage = items;
            this.totalRecords = this.totalRecords | this.paginationService.totalRecords;
        });
    }

    /**
     * Call when the selected site changed and the change event is emmited
     * @param {Site} site
     * @memberof SiteSelectorComponent
     */
    siteChange(site: Site): void {
        let value =  site.identifier;
        this.change.emit(site);
        this.propagateChange(value);
    }

    /**
     * Write a new value to the element
     * @param {*} value
     * @memberof SearchableDropdownComponent
     */
    writeValue(value: string): void {
        this.value = value;
        this.selectCurrentSite(value);
    }

    /**
     * Set the function to be called when the control receives a change event.
     * @param {any} fn
     * @memberof SearchableDropdownComponent
     */
    registerOnChange(fn): void {
        this.propagateChange = fn;
    }

    registerOnTouched(): void {}

    private selectCurrentSite(value: string): void {
        if (this.sitesCurrentPage) {
            let selected = this.sitesCurrentPage.filter( site => site.identifier === this.value);
            this.currentSite = selected.length > 0 ? selected[0] : this.currentSite;
        }
    }
}