import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { AddDoctorPageRoutingModule } from './add-doctor-routing.module';
import { AddDoctorPage } from './add-doctor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    AddDoctorPageRoutingModule
  ],
  declarations: [AddDoctorPage]
})
export class AddDoctorPageModule {}
