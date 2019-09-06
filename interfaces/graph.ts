import { Stream } from "stream";

export declare namespace Graph {

    export interface Friend {
        user_id: number,
        friend_id: number
    }
    
    export interface User {
        id: number,
        first_name: string,
        last_name: string,
        gender: string,
        username: string,
        password: string,
        picture: string,
        created_at: string,
        updated_at: string,
        friends: any
    }

    export interface File {
        filename: string,
        mimetype: string,
        encoding: string,
        createReadStream: any
    }
}