import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DotEditLayoutGridComponent } from './layout/dot-edit-layout-grid/dot-edit-layout-grid.component';
import { DotEditLayoutComponent } from './layout/dot-edit-layout/dot-edit-layout.component';
import { NgGridModule } from 'angular2-grid';
import { IconButtonTooltipModule} from '../../view/components/_common/icon-button-tooltip/icon-button-tooltip.module';
import { ActionButtonModule } from '../../view/components/_common/action-button/action-button.module';

const dotPageRoutes: Routes = [
    {
        component: DotEditLayoutComponent,
        path: ''
    },
    {
        component: DotEditLayoutComponent,
        path: 'layout'
    }
];

@NgModule({
    imports: [
        CommonModule,
        NgGridModule,
        IconButtonTooltipModule,
        ActionButtonModule,
        RouterModule.forChild(dotPageRoutes)
    ],
    declarations: [
        DotEditLayoutGridComponent,
        DotEditLayoutComponent
    ]
})
export class DotEditPageModule {}
