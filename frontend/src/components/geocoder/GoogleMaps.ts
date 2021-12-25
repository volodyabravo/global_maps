/**
 * Google maps service for the entire website
 */
let loaded = false;

export function loadScript(src: any, position: any, id: any) {
    if (!position) {
        return;
    }

    const script = document.createElement('script');
    script.setAttribute('async', '');
    script.setAttribute('id', id);
    script.src = src;
    position.appendChild(script);
}

// Singletons
export const AutocompleteService: {
    current: google.maps.places.AutocompleteService | null
} = { current: null };
export const GeocoderService: { current: google.maps.Geocoder | null } = { current: null };

/**
 * Loads maps only the first time, does nothing else
 */
export function loadMaps(){
    if (typeof window !== 'undefined' && !loaded) {
        if (!document.querySelector('#google-maps')) {
            loadScript(
                'https://maps.googleapis.com/maps/api/js?key=AIzaSyCpsYToOCtgR7DiMYZtN1sgRArxW_JdK6k&libraries=places&language=ru',
                document.querySelector('head'),
                'google-maps',
            );
        }

        loaded = true;
    }
}


export function mapsLoaded() {
    if (!AutocompleteService.current && window.google) {
        AutocompleteService.current = new window.google.maps.places.AutocompleteService();
        GeocoderService.current = new window.google.maps.Geocoder()
    } 
    if (AutocompleteService.current == null ) return false;
    return true;
}
