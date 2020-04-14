import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class SpinnerService {

  // Active or inactive
  private _status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public status: Observable<boolean> = this._status.asObservable();
  // Loading message
  private _message: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public message: Observable<string> = this._message.asObservable();
  
  constructor() { }

  /**
   * Launch spinner
   */
  public start(): void {
    console.log('in');
    if (this._status.getValue() === false) {
      this._status.next(true);
    }
  }

  /**
   * Stop spinner
   */
  public stop(): void {
    this.init();
  }

  /**
   * Launch spinner
   */
  public show(): void {
    this.start();
  }

  /**
   * Stop spinner
   */
  public hide(): void {
    this.stop();
  }

  /**
   * Update message
   */
  public updateMessage(s: string) {
    this._message.next(s);
  }

  /**
   * Update message
   */
  public showText(s: string) {
    this.updateMessage(s);
  }

  private init() {
    if (this._status.getValue() === true) {
      this._status.next(false);
    }
    this._message.next('');
  }
}
