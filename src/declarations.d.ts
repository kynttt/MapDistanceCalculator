declare module 'leaflet' {
    import * as L from 'leaflet';
    export default L;
  }
  
  declare module '*.png' {
    const value: string;
    export default value;
  }
  