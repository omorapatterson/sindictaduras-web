import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//

import { ConfigResolveService } from '../../../../common/config/services/config-resolve.service';
import { NewPresidenteComponent } from './components/new-presidente/new-presidente.component';
import { PresidentesTableComponent } from './components/presidentes-table/presidentes-table.component';
import {EditPresidenteComponent} from './components/edit-presidente/edit-presidente.component';
import {IdResolveService} from '../../../routing/services/id-resolve.service';

const routes: Routes = [
    {
        path: '',
        component: PresidentesTableComponent,
        resolve: {
            config: ConfigResolveService,
        }
    },
    {
        path: 'create',
        component: NewPresidenteComponent,
        resolve: {
            config: ConfigResolveService,
        },
        data: { closeRouteCommand: ['../'] }
    },
    {
        path: 'edit/:id',
        component: EditPresidenteComponent,
        // canActivate: [AuthGuardService],
        resolve: {
            config: ConfigResolveService,
            presidenteId: IdResolveService,
        },
        data: { closeRouteCommand: ['../../'] }
    },
    /*{
        path: 'delete/:id',
        component: DeleteTaskComponent,
        //canActivate: [AuthGuardService],
        resolve: {
            config: ConfigResolveService,
            TaskId: IdResolveService,
        },
        data: { closeRouteCommand: ['../../'] }
    }*/
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MsPresidentesRoutingModule { }
