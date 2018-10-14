import { Injectable } from '@angular/core';
import {
  Headers,
  RequestOptions
} from '@angular/http';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { environment } from '../environments/environment';

/**
 * SpotifyService works querying the Spotify Web API
 * https://developer.spotify.com/web-api/
 */

@Injectable()
export class SpotifyService {
  static BASE_URL = 'https://api.spotify.com/v1';

  constructor(private http: HttpClient) {}

  query(
    URL: string,
    params?: Array<string>
  ): Observable<Object> {
    let queryURL = `${SpotifyService.BASE_URL}${URL}`;
    if (params) {
      queryURL = `${queryURL}?${params.join('&')}`;
    }
    const apiKey = environment.spotifyApiKey;
    //const headers = new Headers({
    //  Authorization: `Bearer ${apiKey}`
    //});
    //const options = new RequestOptions({
      //headers: headers
    //});

    const options = {
      headers : new HttpHeaders({
        Authorization: 'Bearer ' + apiKey
      })
    };
    return this.http.get(queryURL, options);
	/*
    console.log('requesting '+ apiKey);
    this.http.get (queryURL,options).subscribe ((res:any)=> {
      console.log('get object', res);
    });
    return new Observable<any[]> ();
    */

  }

  search(query: string, type: string): Observable<Object> {
    return this.query(`/search`, [
      `q=${query}`,
      `type=${type}`
    ]);
  }

  searchTrack(query: string): Observable<Object> {
    return this.search(query, 'track');
  }

  getTrack(id: string): Observable<Object> {
    return this.query(`/tracks/${id}`);
  }

  getArtist(id: string): Observable<Object> {
    return this.query(`/artists/${id}`);
  }

  getAlbum(id: string): Observable<Object> {
    return this.query(`/albums/${id}`);
  }
}

export const SPOTIFY_PROVIDERS: Array<any> = [
  { provide: SpotifyService, useClass: SpotifyService }
];
