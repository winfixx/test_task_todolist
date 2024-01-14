import { UserStore } from './UserStore'

export class RootStore {
    constructor(
        public userStore: UserStore = new UserStore()
    ) { }
}