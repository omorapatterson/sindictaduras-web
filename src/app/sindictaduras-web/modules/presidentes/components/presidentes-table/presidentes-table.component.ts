import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
//
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import {ConfirmDialogComponent} from '../../../../../../ui/modules/confirm-dialog/components/confirm-dialog/confirm-dialog.component';
import {ErrorHandlingService} from '../../../../../../common/error-handling/services/error-handling.service';
import {ToastrService} from '../../../../../../common/error-handling/services/toastr.service';
import {PresidentesService} from '../../services/presidentes.service';
import {Presidente} from '../../models/presidente';
import {CountryService} from '../../../../../../common/services/country.service';
//

const titleKey = 'Delete';

const deleteBtnKey = 'Delete';

const messageKey = 'Are you sure you want to delete this Task?';

const errorKey = 'Error';

const deletedMessageKey = 'Deleted';

@Component({
    selector: 'app-presidentes-table',
    templateUrl: './presidentes-table.component.html',
    styleUrls: ['./presidentes-table.component.scss']
})
export class PresidentesTableComponent implements OnInit, OnDestroy {

    displayedColumns: string[] = [
        'description',
        'responsable',
        'priority',
        'actions'
    ];

    filter: UntypedFormGroup;

    filterValueChanges: Subscription;

    @ViewChild('paginator', { static: true }) paginator: MatPaginator;

    @ViewChild(MatSort) sort: MatSort;

    totalLength: number = 0;

    tasksList: Subscription;

    tasks: Array<any> = [];

    presidentes: Presidente[] = [];

    constructor(
        public activatedRoute: ActivatedRoute,
        public dialog: MatDialog,
        public errorHandlingService: ErrorHandlingService,
        public presidentesService: PresidentesService,
        private toastr: ToastrService,
        private countryService: CountryService,
    ) {
    }

    ngOnInit() {
        this.filter = this.createFilterFormGroup();
        this.filterValueChanges = this.filter.valueChanges.pipe(debounceTime(500)).subscribe(change => this.onFilter());
        this.paginator.pageIndex = 0;
        this.loadPage();
        // Begin observing style list changes.
        /*this.tasksList = this.tasksService.tasksList.subscribe((TasksList: any) => {
            this.totalLength = TasksList.dataCount;
            this.tasks = TasksList.data;
            if (this.tasks.length === 0 && this.totalLength > 0 && this.tasksService.previousPageSize > 0) {
                this.tasksService.previousPageIndex =
                    Math.ceil(this.totalLength / this.tasksService.previousPageSize) - 1;
                this.tasksService.reloadTasks().subscribe(response => {
                    this.tasksService.tasksList.next(response);
                },
                    (error: HandledError) => this.errorHandlingService.handleUiError(errorKey, error));
            }
        });*/
    }

    editPresident(presidenteId: string){

    }

   ngOnDestroy() {
        // this.tasksList.unsubscribe();
        // this.filterValueChanges.unsubscribe();
    }

    createFilterFormGroup() {
        let group: any = {};
        group['description'] = new UntypedFormControl('');
        return new UntypedFormGroup(group);
    }

    loadPage() {
      this.presidentesService.getPresidentes().subscribe(response => {
          this.presidentes = response.data;
      })
    }

    onFilter() {
        this.paginator.pageIndex = 0;
        this.loadPage();
    }

    onSort() {
        this.paginator.pageIndex = 0;
        this.loadPage();
    }

    onPage() {
        this.loadPage();
    }

    getTaskToDelete(data: any) {
       /* this.tasksService.getTask(data.id).subscribe(response => {
            data = response.data;
            this.confirmDeleteTask(data);
        },
            (error: HandledError) => this.errorHandlingService.handleUiError(errorKey, error)
        )*/
    }

    confirmDeleteTask(data: any) {
        /*this.modalRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
                titleKey: titleKey,
                okBtnKey: deleteBtnKey,
                messageKey: messageKey,
                messageParam: { param: data }
            }
        });

        this.modalRef.afterClosed().subscribe(result => {
            if (result) {
                this.deleteTask(data);
            }
        });*/
    }

    deleteTask(data: any): void {
        /*this.tasksService.deleteTask(data.id).subscribe(response => {
            this.tasksService.reloadTasks().subscribe(response => {
                this.tasksService.tasksList.next(response);
                this.toastr.success(deletedMessageKey);
                this.loadPage();
            },
                (error: HandledError) => this.errorHandlingService.handleUiError(errorKey, error));
        },
            (error: HandledError) => {
                this.errorHandlingService.handleUiError(errorKey, error);
            }
        )*/
    }

}

