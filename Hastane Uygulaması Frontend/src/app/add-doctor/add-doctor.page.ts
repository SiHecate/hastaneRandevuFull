import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.page.html',
  styleUrls: ['./add-doctor.page.scss'],
})
export class AddDoctorPage {
  baseUrl: string = 'http://localhost:8080/doktor/ekle';
  doctorFirstname: string = '';
  doctorLastname: string = '';
  doctorHospital: string = '';
  doctorSpecialty: string = '';

  constructor(
    private nav: NavController,
    private http: HttpClient,
    private toastController: ToastController
  ) {}

  routeBack() {
    this.nav.pop();
  }

  async submitForm() {
    const requestData = {
      doktor_isim: this.doctorFirstname,
      doktor_soyisim: this.doctorLastname,
      doktor_hastane: this.doctorHospital,
      doktor_uzmanlık: this.doctorSpecialty,
    };

    try {
      const response = await this.http.post(this.baseUrl, requestData).toPromise();
      console.log('API Response:', response);

      this.presentToast('Başarıyla eklendi.');

    } catch (error) {
      console.error('API Error:', error);

      this.presentToast('Doktor ekleme başarısız oldu.');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: message.includes('başarısız') ? 'danger' : 'success',
    });
    toast.present();
  }
}
