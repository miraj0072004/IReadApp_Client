import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HaveReadComponent } from './have-read/have-read.component';
import { ToReadComponent } from './to-read/to-read.component';
import { BrowseComponent } from './browse/browse.component';

export const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {
        path: '',
        children: [
            {path: 'browse', component: BrowseComponent},
            {path: 'haveread', component: HaveReadComponent},
            {path: 'toread', component: ToReadComponent}
        ]
    },
    {path: '**', redirectTo: '', pathMatch: 'full'}
];