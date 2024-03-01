export class User {
    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _tokenExpirationData: Date
    ) {}

    get token() {
        if(!this._tokenExpirationData || new Date() > this._tokenExpirationData){ // ვამოწმებთ გაუვიდა თუ არა tokens ვადა
            return null;
        }
        return this._token
    }
}