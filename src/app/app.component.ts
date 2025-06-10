import { Component, inject, NgZone, OnDestroy, OnInit } from '@angular/core';
import { EncryptService } from './services/encrypt.service';
import { VoiceService } from './services/voice.service';
import { map, of, Subject, switchMap, takeUntil, tap, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  nombre: string = '';
  textEncode!: string
  private unsubscribeAll: Subject<boolean> = new Subject<boolean>();
  private readonly encryptService = inject(EncryptService)
  public readonly voiceService = inject(VoiceService)

  ngOnInit(): void {
    this.voiceService.speechData$.pipe(
      takeUntil(this.unsubscribeAll),
      tap((speech) => {
        if (speech.interimText.trim() !== '') {
          this.nombre = this.filtrarAlfanumerico(speech.interimText).slice(0, 15);
        }
        if (speech.interimText.length >= 15) {
          this.voiceService.stop();
        }
      }),
      switchMap((speech) => {
        return speech.interimText.trim() === ''
          ? timer(5000).pipe(
            tap(() => {
              if (this.voiceService.isListening) {
                this.voiceService.stop();
              }
            }),
            // Para evitar interrumpir el stream
            map(() => null)
          )
          : of(null);
      })
    ).subscribe()
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(true);
    this.unsubscribeAll.complete();
  }

  codificarNombre() {
    if (this.nombre.trim() === '') {
      return
    }
    this.textEncode = this.encryptService.encodeString(this.nombre);
  }

  filtrarAlfanumerico(text: string): string {
    return text.replace(/[^a-zA-Z0-9 ]/g, '');
  }
}
