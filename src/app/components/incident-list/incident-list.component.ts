import { Component, OnInit } from '@angular/core';
import { map, mergeMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { IncidentListService } from '../incident-list.service';

@Component({
  selector: 'app-incident-list',
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.scss'],
})
export class IncidentListComponent implements OnInit {
  locations: any[] = [];
  incidentList: any[] = [];

  constructor(private incidentListService: IncidentListService) {}

  ngOnInit(): void {
    this.incidentListService
      .getLocations()
      .pipe(
        mergeMap((locationsResponse: any[]) => {
          console.log(locationsResponse);
          this.locations = locationsResponse;
          const getIncidentsRequests = locationsResponse.map((location) => {
            return this.incidentListService.getIncidentsByLocationId(
              location.id
            );
          });

          return forkJoin(getIncidentsRequests);
        }),
        map((incidentArrayResponse) => {
          let incidents = [];
          const sortFn = (a, b) => {
            if (a.priority < b.priority) {
              return -1;
            }

            if (a.priority > b.priority) {
              return 1;
            }

            if (
              new Date(a.datetime).getTime() > new Date(b.datetime).getTime()
            ) {
              return 1;
            }

            if (
              new Date(a.datetime).getTime() < new Date(b.datetime).getTime()
            ) {
              return -1;
            }

            return 0;
          };

          incidentArrayResponse.forEach((incidentArray) => {
            const removedDuplicateResult = this.getFilterList(
              incidentArray,
              incidents
            );

            incidents = incidents.concat(...removedDuplicateResult);
          });

          return incidents.sort(sortFn);
        })
      )
      .subscribe((incidentList: any[]) => {
        console.log(incidentList);
        this.incidentList = incidentList;
      });
  }

  getFilterList(incidentArray: any[], incidents: any[]) {
    const result: any[] = [];

    incidentArray.forEach((incident: any) => {
      const isNotDuplicate =
        incidents.findIndex((element: any) => element.id === incident.id) < 0;

      if (isNotDuplicate) {
        const locationName = this.getLocationName(incident.locationId);

        const mappedIncident = {
          ...incident,
          locationName,
        };

        result.push(mappedIncident);
      }
    });

    return result;
  }

  getLocationName(incidentLocationId: string): string {
    return this.locations[
      this.locations.findIndex((location) => location.id === incidentLocationId)
    ].name;
  }
}
