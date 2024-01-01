/*
--------------------------------------------------------------------------

	Denizli Meslek Yüksek Okulu Bilgisayar Programcılığı
	2. Sınıf öğrencileri
	Umutcan Biler ve Muhammet Yasin Seden'nin
	Sistem Analizi ve Tasarımı dönem sonu projesi

--------------------------------------------------------------------------
*/
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Doktor } from 'src/classes/classes';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.page.html',
  styleUrls: ['./appointments.page.scss'],
})
export class AppointmentsPage {

  baseUrl: string = 'http://192.168.0.25:8080/randevu/randevular_doktor'

  doctors!: {doktor_isim: string, doktor_soyisim: string, randevular: {hasta_ismi: string, hasta_soyismi: string, tarih: number}}[]

  constructor(private nav: NavController, private httpService: HttpClient, private router: Router) {
    this.httpService.get<any>(this.baseUrl).subscribe({
      next: (res) => this.doctors=res, 
      error: (err) => console.log(err)
    })
    setTimeout(() => {
      console.log(this.doctors);
    }, 150);
  }

  routeBack() {
    this.nav.pop()
  }

  routePatient() {
    this.router.navigate(['/patient'])
  }

}
