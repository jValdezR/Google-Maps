

// export class Marcador {
//     constructor(public lat: number,
//                 public lng: number){}
// }


export class Marcador {
    public lat: number;
    public lng: number;

    public titutlo = 'Sin titulo';
    public desc = 'Sin desc';

    constructor(lat: number, lng: number){
        this.lat = lat;
        this.lng = lng;
    }
}