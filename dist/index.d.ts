import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
export interface RouterEnhancedConfig {
    key?: string;
    maxHistory?: number;
}
export declare class RouterEnhanced {
    private _activatedRoute;
    private _router;
    private _routerEnhancedConfig;
    private _routeSubscription;
    constructor(_activatedRoute: ActivatedRoute, _router: Router);
    back(): void;
    routeData(outlet?: string): Observable<any>;
    startRecording(): void;
    stopRecording(): void;
    private _retrievePreviousUrl();
    private _storeCurrentUrl(currentUrl);
}
