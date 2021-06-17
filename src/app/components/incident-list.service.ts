import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { from } from 'rxjs/internal/observable/from';
import module from 'src/app/shared/fake-api';

@Injectable({
  providedIn: 'root',
})
export class IncidentListService {
  constructor() {}

  getLocations(): Observable<any> {
    return from(module.getLocations());
  }

  getIncidentsByLocationId(locationId: string): Observable<any> {
    return from(module.getIncidentsByLocationId(locationId));
  }
}
