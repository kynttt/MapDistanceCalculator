declare module 'react-leaflet' {
    import { ComponentType, ReactNode } from 'react';
    import { Map as LeafletMap, TileLayer as LeafletTileLayer } from 'leaflet';
  
    interface MapContainerProps {
      center: [number, number];
      zoom: number;
      children?: ReactNode;
      className?: string;
      style?: React.CSSProperties;
    }
  
    export const MapContainer: ComponentType<MapContainerProps & React.RefAttributes<LeafletMap>>;
  
    interface TileLayerProps {
      url: string;
      attribution?: string;
    }
  
    export const TileLayer: ComponentType<TileLayerProps & React.RefAttributes<LeafletTileLayer>>;
  
    interface MarkerProps {
      position: [number, number];
      children?: ReactNode;
    }
  
    export const Marker: ComponentType<MarkerProps>;
  
    interface PopupProps {
      children?: ReactNode;
    }
  
    export const Popup: ComponentType<PopupProps>;
  }
  