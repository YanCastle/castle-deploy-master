export interface GogsWebhook {
    ref: string;
    before: string;
    after: string;
    compare_url: string;
    commits: Commit[];
    repository: Repository;
    pusher: Owner;
    sender: Owner;
}
export interface Repository {
    id: number;
    owner: Owner;
    name: string;
    full_name: string;
    description: string;
    private: boolean;
    fork: boolean;
    html_url: string;
    ssh_url: string;
    clone_url: string;
    website: string;
    stars_count: number;
    forks_count: number;
    watchers_count: number;
    open_issues_count: number;
    default_branch: string;
    created_at: string;
    updated_at: string;
}
export interface Owner {
    id: number;
    login: string;
    full_name: string;
    email: string;
    avatar_url: string;
    username: string;
}
export interface Commit {
    id: string;
    message: string;
    url: string;
    author: Author;
    committer: Author;
    timestamp: string;
}
export interface Author {
    name: string;
    email: string;
    username: string;
}
