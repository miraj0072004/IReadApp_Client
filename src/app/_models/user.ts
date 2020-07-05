export interface User {
    id: number;
    username: string; 
    password: string;   
    
    gender: string;
    genres: Array<Genre>;
    created: Date;
    lastActive: any;
    photoUrl: string;    
    country: string;    
}

export type Genre = 'Horror'|'Thriller'|'Romance';
