import { Injectable } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, PRIMARY_OUTLET, Router, RouterState } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

export interface RouterEnhancedConfig {
	key?: string;
	maxHistory?: number;
}

@Injectable()
export class RouterEnhanced {

	private _routerEnhancedConfig: RouterEnhancedConfig = { key: 'RouteRecorder.route' };
	private _routeSubscription: Subscription;

	public constructor(
		private _activatedRoute: ActivatedRoute,
		private _router: Router
	) { }

	public back(): void {
		let previousUrl: string = this._retrievePreviousUrl();
		if(0) console.log('RouterEnhanced.back',{ previousUrl });
		if( previousUrl )
			this._router.navigate([ previousUrl ]);
	}

	public routeData(outlet: string = PRIMARY_OUTLET): Observable<any> {
		return this._router.events
			.filter((event: Event) => event instanceof NavigationEnd)
			.map(() => this._router.routerState)
			.map((routerState: RouterState) => (<any>routerState).firstChild(this._activatedRoute))
			.filter((activatedRoute: ActivatedRoute) => activatedRoute.outlet === outlet)
			.flatMap((activatedRoute: ActivatedRoute) => activatedRoute.data);
	}

  public startRecording(): void {
		if( this._routeSubscription )
			return;

		this._routeSubscription = this._router.events
			.filter((event: Event) => event instanceof NavigationEnd)
			.subscribe((event: Event) => {
				if(0) console.log('RouterEnhanced.startRecording',{
					event: event,
					'event.url': event.url,
					'this._router.url': this._router.url
				});
				this._storeCurrentUrl( this._router.url );
			});
  }

	public stopRecording(): void {
		if( this._routeSubscription )
			this._routeSubscription.unsubscribe();
		this._routeSubscription = null;
	}

	private _retrievePreviousUrl(): string {
		let
			currentUrl: string = this._router.url,
			urlHistory: string[] = JSON.parse( localStorage.getItem( this._routerEnhancedConfig.key ) || '[]' );

		for( let url of urlHistory ) {
			if( url !== currentUrl )
				return url;
		}

		return null;
	}

	private _storeCurrentUrl(currentUrl: string): void {
		if(0) localStorage.removeItem( this._routerEnhancedConfig.key );
		let urlHistory: string[] = JSON.parse( localStorage.getItem( this._routerEnhancedConfig.key ) || '[]' );
		if(0) console.log('RouterEnhanced._storeCurrentUrl',
			urlHistory,
			currentUrl !== urlHistory[0] ? [ currentUrl, urlHistory[0] ] : 'NOT REPLACED'
		);
		if( currentUrl !== urlHistory[0] )
			localStorage.setItem( this._routerEnhancedConfig.key, JSON.stringify([ currentUrl, urlHistory[0] ]));
	}

}
