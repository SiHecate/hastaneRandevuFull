import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.page.html',
  styleUrls: ['./patient.page.scss'],
})
export class PatientPage {
  baseUrl: string = 'http://127.0.0.1:8080/randevu/ekle';
  doctorListUrl: string = 'http://localhost:8080/doktor/liste';
  patientName: string = '';
  patientLastName: string = '';
  doctorFirstname: string = '';
  doctorLastname: string = '';
  selectedDate: string = new Date().toISOString();
  symptoms: string = '';
  doctorList: any[] = [];

  constructor(private nav: NavController, public http: HttpClient, private toastController: ToastController) {
  }

  async submitForm() {
    // Convert the selected date to a formatted string (MM/DD/YYYY)
    const selectedDateObject = new Date(this.selectedDate);
    const formattedDate = this.formatDate(selectedDateObject);

    // Prepare the data along with the formatted date
    const requestData = {
      hasta_isim: this.patientName,
      hasta_soyisim: this.patientLastName,
      doktor_isim: this.doctorFirstname,
      doktor_soyisim: this.doctorLastname,
      hasta_rahatsizlik: this.symptoms,
      tarih: formattedDate, // Send the formatted date
    };

    try {
      // Send the data to the API
      const response = await this.http.post(this.baseUrl, requestData).toPromise();
      console.log('API Response:', response);

      this.showToast('Başarıyla eklendi.', 'success');
    } catch (error) {
      console.error('API Error:', error);

      this.showToast('Doktor ekleme başarısız oldu.', 'danger');
    }
  }

  formatDate(date: Date): string {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: color,
    });
    toast.present();
  }

  routeBack() {
    this.nav.pop();
  }

  confirm() {
    console.log('Confirm function called.');
  }
}
