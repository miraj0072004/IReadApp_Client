import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';

export const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {
        path: '',
        
        children: [
           
        ]
    },
    {path: '**', redirectTo: '', pathMatch: 'full'}
];