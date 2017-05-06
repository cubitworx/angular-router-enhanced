"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var RouterEnhanced = (function () {
    function RouterEnhanced(_activatedRoute, _router) {
        this._activatedRoute = _activatedRoute;
        this._router = _router;
        this._routerEnhancedConfig = { key: 'RouteRecorder.route' };
    }
    RouterEnhanced.prototype.back = function () {
        var previousUrl = this._retrievePreviousUrl();
        if (0)
            console.log('RouterEnhanced.back', { previousUrl: previousUrl });
        if (previousUrl)
            this._router.navigate([previousUrl]);
    };
    RouterEnhanced.prototype.routeData = function (outlet) {
        var _this = this;
        if (outlet === void 0) { outlet = router_1.PRIMARY_OUTLET; }
        return this._router.events
            .filter(function (event) { return event instanceof router_1.NavigationEnd; })
            .map(function () { return _this._router.routerState; })
            .map(function (routerState) { return routerState.firstChild(_this._activatedRoute); })
            .filter(function (activatedRoute) { return activatedRoute.outlet === outlet; })
            .flatMap(function (activatedRoute) { return activatedRoute.data; });
    };
    RouterEnhanced.prototype.startRecording = function () {
        var _this = this;
        if (this._routeSubscription)
            return;
        this._routeSubscription = this._router.events
            .filter(function (event) { return event instanceof router_1.NavigationEnd; })
            .subscribe(function (event) {
            if (0)
                console.log('RouterEnhanced.startRecording', {
                    event: event,
                    'event.url': event.url,
                    'this._router.url': _this._router.url
                });
            _this._storeCurrentUrl(_this._router.url);
        });
    };
    RouterEnhanced.prototype.stopRecording = function () {
        if (this._routeSubscription)
            this._routeSubscription.unsubscribe();
        this._routeSubscription = null;
    };
    RouterEnhanced.prototype._retrievePreviousUrl = function () {
        var currentUrl = this._router.url, urlHistory = JSON.parse(localStorage.getItem(this._routerEnhancedConfig.key) || '[]');
        for (var _i = 0, urlHistory_1 = urlHistory; _i < urlHistory_1.length; _i++) {
            var url = urlHistory_1[_i];
            if (url !== currentUrl)
                return url;
        }
        return null;
    };
    RouterEnhanced.prototype._storeCurrentUrl = function (currentUrl) {
        if (0)
            localStorage.removeItem(this._routerEnhancedConfig.key);
        var urlHistory = JSON.parse(localStorage.getItem(this._routerEnhancedConfig.key) || '[]');
        if (0)
            console.log('RouterEnhanced._storeCurrentUrl', urlHistory, currentUrl !== urlHistory[0] ? [currentUrl, urlHistory[0]] : 'NOT REPLACED');
        if (currentUrl !== urlHistory[0])
            localStorage.setItem(this._routerEnhancedConfig.key, JSON.stringify([currentUrl, urlHistory[0]]));
    };
    return RouterEnhanced;
}());
RouterEnhanced = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router])
], RouterEnhanced);
exports.RouterEnhanced = RouterEnhanced;
//# sourceMappingURL=index.js.map