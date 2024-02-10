import {Injectable} from '@angular/core';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor(private storageService: StorageService) {
  }

  setJsonValue(key: string, value: any) {
    const storage = this.storageService.secureStorage.setItem(key, value);
  }

  getJsonValue(key: string) {
    return this.storageService.secureStorage.getItem(key);
  }

  clearToken() {
    return this.storageService.secureStorage.clear();
  }

  clearKey(key: string) {
    return this.storageService.secureStorage.removeItem(key);
  }

  getKey() : string[] {
    let keyValue : any = []
    for ( let [key] of Object.entries(localStorage)) {
      keyValue.push(key)
    }
    return keyValue
  }

}
