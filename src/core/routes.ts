class RoutePair{
    url: string;
    name: string;
    key: string;

    constructor(key: string, name: string, url: string){
        this.name = name;
        this.url = url;
        this.key = key;
    }
}

// create the paths
let paths = [
    new RoutePair("landing", "Landing", "/"),
    new RoutePair("auth", "Authentication", "/auth"),
    new RoutePair("home", "Find Challenges", "/browse"),
    new RoutePair("profile", "Profile", "/profile"),
    new RoutePair("issueChallenge", "Issue Challenge", "/issue-challenge"),
    new RoutePair("acceptChallenge", "AccepthChallenge", "/accept-challenge"),
    new RoutePair("legal", "Legal", "/legal"),
    new RoutePair("notFound", "Page not Found", "*"),
    new RoutePair("delete", "Delete Challenge", "/delete"),
    new RoutePair("deleteChallenge", "Delete Challenge Id", "/delete/:challenge_id"),
    new RoutePair("accept", "Accept Challenge", "/accept"),
    new RoutePair("acceptChallenge", "Accept Challenge Id", "/accept/:challenge_id"),
]

const APP_ROUTES: { [key: string]: RoutePair } = {}

// collect the paths
paths.forEach((p)=>{
    APP_ROUTES[p.key] = p
})


export {APP_ROUTES}