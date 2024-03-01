export class Ticket {
    constructor(
        public state: string,
        public senderId: string,
        public issue: string,
        public issue_description: string,
        public date: Date
    ) {}
}