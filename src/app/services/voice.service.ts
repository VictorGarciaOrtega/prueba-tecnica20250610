import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, NgZone, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export interface SpeechResult {
  finalText: string;
  interimText: string;
}

@Injectable({
  providedIn: 'root',
})
export class VoiceService {
  private recognition: any;
  private speechSubject = new BehaviorSubject<SpeechResult>({
    finalText: '',
    interimText: '',
  });
  private finalTranscript = '';
  private interimTranscript = '';
  public isListening = false;

  get speechData$() {
    return this.speechSubject.asObservable();
  }

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone
  ) {
    // Si es navegador ejecutar
    if (isPlatformBrowser(this.platformId)) {
      const speechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      //Verificar si el navegador es compatible
      if (speechRecognition) {
        this.recognition = new speechRecognition();
        this.setupRecognition();
      } else {
        alert('El navegador no soporta el reconocimiento de voz');
      }
    }
  }

  private setupRecognition() {
    this.recognition.continuous = false;
    this.recognition.interimResults = true;
    this.recognition.lang = 'es-ES';

    this.recognition.onresult = (event: any) => {
      this.interimTranscript = '';

      // Procesar cada evento
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          this.finalTranscript += transcript + ' ';
        } else {
          // STT en tiempo real
          this.interimTranscript += transcript;
        }
      }

      // Emitir el estado actual
      this.ngZone.run(() => {
        this.speechSubject.next({
          finalText: this.finalTranscript,
          interimText: this.interimTranscript,
        });
      });
    };

    this.recognition.onerror = (event: any) => {
      console.error('Error de reconocimiento:', event.error);
      if (event.error === 'no-speech') {
        alert('No se detectó habla');
      }
    };
  }

  start() {
    if (this.recognition && !this.isListening) {
      this.clear();
      this.isListening = true;
      this.recognition.start();
    }
  }

  stop() {
    if (this.isListening) {
      this.isListening = false;
      this.recognition.stop();
    }
  }

  clear() {
    this.finalTranscript = '';
    this.interimTranscript = '';
    this.speechSubject.next({
      finalText: '',
      interimText: '',
    });
  }
}
