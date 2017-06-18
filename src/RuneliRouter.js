import * as React from 'react';
import LocationActivatorPane from './LocationActivatorPane';
import LeafletMap from './LeafletMap';
import PostMessageView from './PostMessageView';

const DEFAULT_ROUTE = 'DEFAULT_ROUTE';
const INITIAL_ROUTE = '/index';

var RouterElement = null;

class RouteStack {

    constructor(initialRoute) {
        this._stack = [initialRoute];
    }

    push(value) {
        return this._stack.push(value);
    }

    pop() {
        return this._stack.pop();
    }

    length() {
        return this._stack.length;
    }

    peek() {
        return this._stack[this._stack.length - 1];
    }
}

class RuneliRouter extends React.Component {

    constructor() {
        super();
        this.state = {
            activeView: this._getRouteFromHashOrReturnFalseIfNoRoutePresent()
        };
        this.routes = {};
        this.initializeRoutes();
        this.routesStack = new RouteStack(INITIAL_ROUTE);
        RouterElement = this;
        this.routeChangeHandlers = [];
        this.elementCache = {};
        this._initializeWindowHashChangeListener()        
    }

    setRoute(route) {
        this.routesStack.push(route);   
        this.setState({activeView: route});
        this._setLocationHash(route);
        this._executeRouteChangeHandlersWhenRouteHasChanged();
    }

    back() {
        this.routesStack.pop();        
        if (this.routesStack.length() === 0) {
            this.routesStack.push(INITIAL_ROUTE);
        }
        this._setLocationHash(this.routesStack.peek());
        this.setState({activeView: this.routesStack.peek()});
        this._executeRouteChangeHandlersWhenRouteHasChanged();
    }

    initializeRoutes() {
        this.routes[DEFAULT_ROUTE] = <DefaultRoute key={DEFAULT_ROUTE}/>;
        this.routes[INITIAL_ROUTE] = <LocationActivatorPane key={INITIAL_ROUTE}/>;
        this.routes['/map'] = <LeafletMap key={"/map"}/>;
        this.routes['/postMessage'] = <PostMessageView key={"/postMessage"}/>;
    }

    addRouteChangeListener(handlerFunction) {
        this.routeChangeHandlers.push(handlerFunction);
        return this.routeChangeHandlers.length - 1;
    }

    removeRouteChangeListerner(indexOfHandler) {
        this.routeChangeHandlers.splice(indexOfHandler, 1);
    }

    _executeRouteChangeHandlersWhenRouteHasChanged() {
        this.routeChangeHandlers.forEach(handler => {
            handler(this.state.activeView);
        });
    }

    _getRouteFromHashOrReturnFalseIfNoRoutePresent() {
        const hash = window.location.hash;
        const trimmedHashContainingOnlyTheFirstRoute = hash.substr(1);
        const firstRoute = trimmedHashContainingOnlyTheFirstRoute.split("/").filter(route => route.length > 0)[0];
        if(!firstRoute) {
            return INITIAL_ROUTE;
        } else {
            return '/' + firstRoute;
        }
    }

    _initializeWindowHashChangeListener() {
        window.onhashchange = this._handleHashChangeEvent.bind(this);
    }

    _handleHashChangeEvent() {
        const maybeNewRoute = this._getRouteFromHashOrReturnFalseIfNoRoutePresent();
        if(maybeNewRoute && maybeNewRoute !== this.state.activeView) {
            this.setRoute(maybeNewRoute);
        }
    }

    _setLocationHash(newHash) {
        window.location.hash = newHash;
    }

    _getElementCached(key) {
        const maybeElement = this.elementCache[key];
        if(maybeElement) {
            console.log('loading from cache!');
            
            return maybeElement;
        }
        this.elementCache[key] = this.routes[key];
        return this.elementCache[key];
    }

    render() {
        return (
            this._getElementCached(this.state.activeView)
        );
    }

}

class DefaultRoute extends React.Component {
    render() {
        return (<span>No route found: {this.props.routeNotFound}</span>);
    }
}
var _SingletonRouter = null;
export default {
    singletonRouter: function() {
        if(!_SingletonRouter) {
            _SingletonRouter = <RuneliRouter />
        } 
        return _SingletonRouter;
    },
    setRoute: function(route) {
        if(RouterElement)
            RouterElement.setRoute(route)
    },
    back: function() {
        if(RouterElement) {
            RouterElement.back();
        }
    },
    hasRoutesToGoBackTo: function() {
        if(RouterElement && RouterElement.routesStack._stack) {
            return RouterElement.routesStack._stack.length > 1;
        } else {
            return false;
        }
    },
    onRouteChange: function (handlerFunction) {
        return RouterElement.addRouteChangeListener(handlerFunction);
    },
    offRouteChange: function (handlerFuctionIndex) {
        return RouterElement.removeRouteChangeListerner(handlerFuctionIndex);
    }
};